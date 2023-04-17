import yt_dlp as youtube_dlp
import os

# video_url = "https://www.youtube.com/watch?v=k7wnNt65lcE"
video_url = "https://www.youtube.com/watch?v=okSidIyw6GM"

output_folder = "Pipeline/temp/raw"

# Create output folder if it doesn't exist
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Set options for youtube-dl
ydl_opts = {
    "format": "bestaudio/best",
    "outtmpl": os.path.join(output_folder, "%(title)s.%(ext)s"),
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

with youtube_dlp.YoutubeDL(ydl_opts) as ydl:
    ydl.download([video_url])


def main():
    with youtube_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([video_url])


if __name__ == "__main__":
    main()
