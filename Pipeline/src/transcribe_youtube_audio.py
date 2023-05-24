import json
import os

import whisper

class VideoTranscriber:
    def __init__(self, input_folder, output_folder) -> None:
        self.input_folder = input_folder
        self.output_folder = output_folder

        if not os.path.exists(self.output_folder):
            os.makedirs(self.output_folder)

    def get_language(self, input_audio):
        model = whisper.load_model("base")
        # load audio and pad/trim it to fit 30 seconds
        audio = whisper.load_audio(input_audio)
        audio = whisper.pad_or_trim(audio)

        # make log-Mel spectrogram and move to the same device as the model
        mel = whisper.log_mel_spectrogram(audio).to(model.device)

        # detect the spoken language
        _, probs = model.detect_language(mel)
        print(f"Detected language: {max(probs, key=probs.get)}")

    def _build_file_path(self, input_audio):
        path = os.path.join(self.input_folder, input_audio)
        path = path + ".mp3"
        path = path.replace("\\", "/")

    def transcribe_video(self, input_audio):
        model = whisper.load_model("medium")
        path = self._build_file_path(input_audio)
        try:
            result = model.transcribe(path)
            return result["text"].replace("&", "and")
        except Exception as e:
            print(e)
