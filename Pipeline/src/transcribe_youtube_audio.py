import os

import whisper


class VideoTranscriber:
    def __init__(self, input_folder, output_folder, english_model, alternate_model, base_model) -> None:
        self.input_folder = input_folder
        self.output_folder = output_folder
        self.english_model = english_model
        self.alternate_model = alternate_model
        self.base_model = base_model
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

    def transcribe_video(self, input_audio):
        model = whisper.load_model(self._load_model(input_audio))
        path = self._build_file_path(input_audio)
        try:
            result = model.transcribe(path)
            return result["text"].replace("&", "and")
        except Exception as e:
            print(e)
