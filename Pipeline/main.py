import json
import argparse

from src.download_youtube_audio import VideoDownloader
from src.summarize_video import videoSummary
from src.transcribe_youtube_audio import VideoTranscriber

# video_url = "https://www.youtube.com/watch?v=okSidIyw6GM"  # short en test
# video_url = "https://www.youtube.com/watch?v=0vuzqunync8"  # longer en test
# video_url = "https://www.youtube.com/watch?v=i596h4UuH6E"
# video_url = "https://www.youtube.com/watch?v=cPzSJiGR6aA"  # jp test


def pipeline(video_url):
    with open("Pipeline\config.json") as config_file:
        config = json.load(config_file)

        video_downloader = VideoDownloader(
            config["downloader"]["video_output_folder"])

        video_transcriber = VideoTranscriber(
            config["downloader"]["video_output_folder"],
            config["downloader"]["transcribtion_output_folder"],
            config["whisper"]["english_model"],
            config["whisper"]["alternate_model"],
            config["whisper"]["base_model"])

        video_summarizer = videoSummary(
            config["openai"]["organization"],
            config["openai"]["api_key"],
            config["openai"]["model"],
            config["openai"]["split_length"])

        title = video_downloader.download_youtube_video(video_url)
        text = video_transcriber.transcribe_video(title)
        #   print(text + "\n")
        summary = video_summarizer.chat_completion(text)
        print(summary)
        return summary


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process a Video.')
    parser.add_argument('url', type=str, help='Video Url') # will be accesible under args.POS

    args = parser.parse_args()
    print(args.url)

    pipeline(args.url)
    # print(title)
    # languages = video_transcriber.get_language(title + ".mp3")
    # print(languages)
    # title = "Worst things to accidentally send your therapist"
    # path = video_transcriber._build_file_path(title)
    # shark = video_transcriber.transcribe_video(title)

    # shark = video_transcriber.get_language(title)
    # shark = video_transcriber._load_model(title)
    # print(video_transcriber._build_file_path(title))
    # print(video_summarizer.chat_completion(shark))
