import os
import subprocess
import openai

import whisper


class VideoTranscriber:
    def __init__(self, input_folder, output_folder, english_model, alternate_model, base_model, use_whisper_api, api_key) -> None:
        self.input_folder = input_folder
        self.output_folder = output_folder

        self.english_model = english_model
        self.alternate_model = alternate_model
        self.base_model = base_model

        self.use_whisper_api = use_whisper_api
        self.api_key = api_key

        if not os.path.exists(self.output_folder):
            os.makedirs(self.output_folder)

    def _get_language(self, input_audio):
        path = self._build_file_path(input_audio)
        model = whisper.load_model(self.base_model)
        # load audio and pad/trim it to fit 30 seconds
        audio = whisper.load_audio(path)
        audio = whisper.pad_or_trim(audio)

        # make log-Mel spectrogram and move to the same device as the model
        mel = whisper.log_mel_spectrogram(audio).to(model.device)

        # detect the spoken language
        _, probs = model.detect_language(mel)
        # print(f"Detected language: {max(probs, key=probs.get)}")
        return max(probs, key=probs.get)

    def _build_file_path(self, input_audio):
        try:
            path = os.path.join(self.input_folder, input_audio)
            path = path + ".mp3"
            path = path.replace("\\", "/")
            return path
        except Exception as e:
            print(e)

    def _load_model(self, input_audio):
        try:
            lang = self._get_language(input_audio)
            if lang == "en":
                return self.english_model
            else:
                return self.alternate_model
        except Exception as e:
            print(e)


    def _convert_to_mp3(self, input_file, output_file):
        try:
            # Execute the ffmpeg command
            subprocess.run(['ffmpeg', '-y', '-i', input_file, '-codec:a', 'libmp3lame', output_file])
            # print(f"Conversion successful. MP3 file saved as {output_file}")
        except FileNotFoundError as e:
            # print("ffmpeg not found. Please ensure that ffmpeg is installed and added to the system's PATH.")
            print(e)

    def _delete_file(self, file_path):
        try:
            # Delete the file
            os.remove(file_path)
            print(f"File deleted: {file_path}" + "\n")
        except OSError as e:
            print(f"Error occurred while deleting the file: {e}")

    def _split_mp3_into_chunks_pydub(self, input_audio, output_folder):
        pass

    def _split_mp3_into_chunks(self, input_audio, output_folder):
        chunk_size = 25 * 1024 * 1024  # 25MB in bytes
        file_name = os.path.basename(input_audio)
        
        with open(input_audio, 'rb') as mp3_file:
            index = 1
            while True:
                chunk_data = mp3_file.read(chunk_size)
                
                if not chunk_data:
                    break

                file_name = file_name.replace(".mp3", "")
                output_file_path = os.path.join(output_folder, f'{file_name}_chunk{index}.mp3')
                with open(output_file_path, 'wb') as output_file:
                    output_file.write(chunk_data)
                
                # if index > 1:
                # output_dir = os.path.dirname(output_file_path)
                # os.makedirs(output_dir, exist_ok=True)
                self._convert_to_mp3(output_file_path, output_file_path.replace(".mp3", "_converted.mp3"))
                self._delete_file(output_file_path)
                index += 1

    def _transcribe_video_local(self, input_audio):
        model = whisper.load_model(self._load_model(input_audio))
        path = self._build_file_path(input_audio)
        try:
            result = model.transcribe(path)
            return result["text"].replace("&", "and")
        except Exception as e:
            print(e)

    def _transcribe_video_with_whisper_api(self, input_audio):
        result = ""
        self._split_mp3_into_chunks(self._build_file_path(input_audio), self.output_folder)
        for chunk in os.listdir(self.output_folder):
            try:                
                chunk_path = os.path.join(self.output_folder, chunk)
                chunk_path = chunk_path.replace("\\", "/")
                print("\n" + chunk_path)
                with open(chunk_path, "rb") as audio_file:
                    script = openai.Audio.transcribe("whisper-1", audio_file, api_key=self.api_key)
                    
                    # print(script["text"] + "\n")
                    result += script["text"]        
                self._delete_file(chunk_path)   
            except Exception as e:
                print(e)
        return result

    def transcribe_video(self, input_audio):
        if self.use_whisper_api:
            return self._transcribe_video_with_whisper_api(input_audio)
        else:
            return self._transcribe_video_local(input_audio)
        
