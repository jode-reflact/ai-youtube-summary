import json
import os

import whisper

input_folder = "Pipeline/temp/raw"
input_audio = "Worst things to accidentally send your therapist.mp3"
output_folder = "Pipeline/temp/transcribed"


def transcribe_video():
    model = whisper.load_model("medium")
    result = model.transcribe(os.path.join(input_folder, input_audio))
    r = json.dumps(result)
    with open(
        os.path.join(output_folder, input_audio + ".json"),
        "w",
    ) as f:
        json.dump(result, f)


if __name__ == "__main__":
    transcribe_video()
