export const parseMilliseconds = (millis: number, divider: string): string => {
  let seconds: number = millis / 1000;
  const hours: number = Math.round(seconds / 3600);
  seconds = seconds % 3600;
  const minutes: number = Math.round(seconds / 60);
  seconds = Math.round(seconds % 60);

  return hours
    ? `${hours}h ${divider} ${minutes}min ${divider} ${seconds}s`
    : minutes
    ? `${minutes}min ${divider} ${seconds}s`
    : `${seconds}s`;
};
