import json
import os

import whisper

# input_folder = "Pipeline/temp/raw"
# input_audio = "Worst things to accidentally send your therapist.mp3"
# output_folder = "Pipeline/temp/transcribed"


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

    def transcribe_video(self, input_audio):
        model = whisper.load_model("medium")
        path = os.path.join(self.input_folder, input_audio)
        path = path + ".mp3"
        path = path.replace("\\", "/")
        result = model.transcribe(path)
        return result["text"].replace("&", "and")
        # print(result["text"])
        # print(self.get_language(path))
        # r = json.dumps(result)
        # print(result)
        # with open(
        #     os.path.join(self.output_folder, input_audio + ".json"),
        #     "w",
        # ) as f:
        #     json.dump(result, f)
