import { InvalidYtUrlError } from '../errors/invalid-youtube-url.error';

function extractYtVideoId(ytVideoUrl: string) {
  const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
  const match = ytVideoUrl.match(regExp);
  const videoId = match && match[2].length == 11 ? match[2] : null;

  if (videoId == null) throw new InvalidYtUrlError();

  return videoId;
}

export { extractYtVideoId };
