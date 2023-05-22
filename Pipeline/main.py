from src.download_youtube_audio import VideoDownloader
from src.transcribe_youtube_audio import VideoTranscriber
from src.summarize_video import videoSummary
import json
import os


# video_url = "https://www.youtube.com/watch?v=okSidIyw6GM"
video_url = "https://www.youtube.com/watch?v=0vuzqunync8"
if __name__ == "__main__":
    with open("Pipeline\config.json") as config_file:
        config = json.load(config_file)

        video_downloader = VideoDownloader(
            config["downloader"]["video_output_folder"])

        video_transcriber = VideoTranscriber(
            config["downloader"]["video_output_folder"],
            config["downloader"]["transcribtion_output_folder"])

        video_summarizer = videoSummary(
            config["openai"]["organization"],
            config["openai"]["api_key"],
            config["openai"]["model"])

        title = video_downloader.download_youtube_video(video_url)
        print(title)
        # languages = video_transcriber.get_language(title + ".mp3")
        # print(languages)
        # title = "Worst things to accidentally send your therapist"
        base = config["downloader"]["video_output_folder"]
        path = os.path.join(base, title)
        path = path + ".mp3"
        path = path.replace("\\", "/")
        shark = video_transcriber.transcribe_video(title)
        # print(shark)
        # print(video_summarizer.chat_completion(shark))
        # text = video_transcriber.transcribe_video(title)
        # print(text)
