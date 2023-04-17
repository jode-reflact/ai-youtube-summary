import whisper
import os
import json


def main():
    model = whisper.load_model("medium")
    output_folder = (
        "Pipeline/temp/raw/Worst things to accidentally send your therapist.mp3"
    )
    result = model.transcribe(os.path.join(output_folder))
    r = json.dumps(result)
    #  print(result["text"])
    print(r)


if __name__ == "__main__":
    main()
