import { InvalidYtUrlError } from '../errors/invalid-youtube-url.error';

function extractYtVideoId(ytVideoUrl: string) {
  validateYtVideoUrl(ytVideoUrl);

  const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
  const match = ytVideoUrl.match(regExp);
  const videoId = match && match[2].length == 11 ? match[2] : null;

  if (videoId == null) throw new InvalidYtUrlError();

  return videoId;
}

function validateYtVideoUrl(ytVideoUrl: string) {
  validateUrl(ytVideoUrl);
  validateYtUrl(ytVideoUrl);
}

function validateUrl(ytVideoUrl: string) {
  try {
    new URL(ytVideoUrl);
  } catch (_) {
    throw new InvalidYtUrlError();
  }
}

function validateYtUrl(ytVideoUrl: string) {
  const url = new URL(ytVideoUrl);

  if (['www.youtube.com', 'youtu.be'].includes(url.hostname)) return;
  throw new InvalidYtUrlError();
}

export { extractYtVideoId };
