import youtube_dlc

video_url = "https://www.youtube.com/watch?v=k7wnNt65lcE"
ydl_opts = {
    "format": "bestaudio/best",  # Specify the format of the audio to download, in this case "bestaudio/best" which selects the best audio quality available.
    "verbose": "True",  # Enable verbose mode to display detailed output during the download process.
    "o": "temp\raw",  # Specify the output directory where the downloaded audio file will be saved, in this case "temp\raw".
    "postprocessors": [  # A list of post-processors to be applied to the downloaded audio file after it is downloaded.
        {
            "key": "FFmpegExtractAudio",  # Specify the post-processor to be used, in this case "FFmpegExtractAudio" which extracts audio from video files.
            "preferredcodec": "mp3",  # Specify the preferred audio codec to be used for the extracted audio, in this case "mp3".
            "preferredquality": "192",  # Specify the preferred audio quality for the extracted audio, in this case "192" kbps.
        }
    ],
}

with youtube_dlc.YoutubeDL(ydl_opts) as ydl:
    ydl.download([video_url])


def main():
    with youtube_dlc.YoutubeDL(ydl_opts) as ydl:
        ydl.download([video_url])


if __name__ == "__main__":
    main()
