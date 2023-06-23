export const parseSecondsToTime = (seconds: number, divider: string = ' '): string => {
  let leftSeconds: number = seconds;
  const hours: number = Math.round(leftSeconds / 3600);
  leftSeconds = seconds % 3600;
  const minutes: number = Math.round(leftSeconds / 60);
  leftSeconds = Math.round(leftSeconds % 60);

  return hours
    ? `${hours}h ${divider} ${minutes}min ${divider} ${leftSeconds}s`
    : minutes
    ? `${minutes}min ${divider} ${leftSeconds}s`
    : `${leftSeconds}s`;
};
