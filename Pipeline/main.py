from download_youtube_audio import VideoDownloader
from transcribe_youtube_audio import VideoTranscriber
import json

import os
FULL_PATH = os.path.dirname(os.path.abspath(__file__))
video_url = "https://www.youtube.com/watch?v=okSidIyw6GM"

if __name__ == "__main__":
    with open("Pipeline\config.json") as config_file:
        config = json.load(config_file)

        video_downloader = VideoDownloader(
            config["downloader"]["video_output_folder"])

        video_transcriber = VideoTranscriber(
            config["downloader"]["video_output_folder"],
            config["downloader"]["transcribtion_output_folder"])

        # title = video_downloader.download_youtube_video(video_url)
        # print(title)
        # languages = video_transcriber.get_language(title + ".mp3")
        # print(languages)
        title = "Worst things to accidentally send your therapist"
        text = video_transcriber.transcribe_video(title)
        print(text)
