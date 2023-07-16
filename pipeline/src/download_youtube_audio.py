import os

import yt_dlp as youtube_dlp


class VideoDownloader:
    def __init__(self, output_folder) -> None:
        self.output_folder = output_folder

        if not os.path.exists(self.output_folder):
            os.makedirs(self.output_folder)

    def _set_ytdl_config(self):
        # Set options for youtube-dl
        ydl_opts = {
            "format": "bestaudio/best",
            "outtmpl": os.path.join(self.output_folder, "%(title)s.%(ext)s"),
            "postprocessors": [
                {
                    "key": "FFmpegExtractAudio",
                    "preferredcodec": "mp3",
                    "preferredquality": "192",
                }
            ],
            "postprocessor_args": ["-ar", "16000"],
            "prefer_ffmpeg": True,
            "keepvideo": False,
        }
        return ydl_opts

    def download_youtube_video(self, video_url):
        try:
            with youtube_dlp.YoutubeDL(self._set_ytdl_config()) as ydl:
                info_dict = ydl.extract_info(video_url, download=False)
                video_title = info_dict.get('title', None)
                ydl.download([video_url])
                return video_title
        except Exception as e:
            print(e)
