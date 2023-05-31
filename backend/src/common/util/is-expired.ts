// eslint-disable-next-line
const ms = require('ms');

function isExpired(startDate: Date, timePeriod: string) {
  const timePeriodInMs = ms(timePeriod);
  const now = new Date();

  const startDatePlusTimePeriod = new Date(
    startDate.getTime() + timePeriodInMs,
  );
  return now > startDatePlusTimePeriod;
}

export { isExpired };
