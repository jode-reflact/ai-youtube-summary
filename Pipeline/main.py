from download_youtube_audio import VideoDownloader
import json

import os
FULL_PATH = os.path.dirname(os.path.abspath(__file__))
video_url = "https://www.youtube.com/watch?v=okSidIyw6GM"

if __name__ == "__main__":
    with open("Pipeline\config.json") as config_file:
        config = json.load(config_file)
        video_downloader = VideoDownloader(
            config["downloader"]["video_output_folder"])
        title = video_downloader.download_youtube_video(video_url)
        print(title)
