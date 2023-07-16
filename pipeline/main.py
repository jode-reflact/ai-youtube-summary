import json
import argparse
import sys
import os

from src.download_youtube_audio import VideoDownloader
from src.summarize_video import VideoSummary
from src.transcribe_youtube_audio import VideoTranscriber


def pipeline(video_url):
    with open("./config.json") as config_file:
        config = json.load(config_file)

        video_downloader = VideoDownloader(
            config["downloader"]["video_output_folder"])

        video_transcriber = VideoTranscriber(
            config["downloader"]["video_output_folder"],
            config["downloader"]["transcribtion_output_folder"],
            config["whisper"]["english_model"],
            config["whisper"]["alternate_model"],
            config["whisper"]["base_model"],
            config["openai"]["use_whisper_api"],
            config["openai"]["api_key"])

        video_summarizer = VideoSummary(
            config["openai"]["organization"],
            config["openai"]["api_key"],
            config["openai"]["model"],
            config["openai"]["split_length"])

        title = video_downloader.download_youtube_video(video_url)
        text = video_transcriber.transcribe_video(title)
        summary = video_summarizer.chat_completion(text)
        return summary


if __name__ == "__main__":
    try:
        print("yt_url from os", os.environ.get('yt_url'))
    except Exception as e:
        print(e)
    parser = argparse.ArgumentParser(description='Process a Video.')
    # will be accesible under args.POS
    parser.add_argument('--url', type=str, help='Video Url',
                        default=os.environ.get('yt_url'))

    args = parser.parse_args()
    print(args.url)

    result = pipeline(args.url)
    sys.stdout.write("Summary:" + result + '\n')
