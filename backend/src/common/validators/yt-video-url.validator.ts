import { InvalidYtUrlError } from '../errors/invalid-youtube-url.error';

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

export { validateYtVideoUrl };
