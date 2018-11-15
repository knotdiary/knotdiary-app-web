import moment from 'moment';

export const getFormattedTime = (dateTime) => {
  return moment(dateTime).format('LL');
}

export const getFromTime = (dateTime) => {
  return moment(dateTime).fromNow();
}

export const getDateDiffByDays = (startDate, endDate) => {
  const localStart = moment(startDate).local();
  const localEnd = moment(endDate).local();
  const diff = localStart.diff(localEnd, 'days');

  return diff;
}

export const getSaleDisplayTime = (startDate, endDate) => {
  const localStart = moment(startDate).local();
  const localEnd = moment(endDate).local();
  const startDiff = moment().diff(localStart, 'minutes');
  const endDiff = moment().diff(localEnd, 'minutes');

  if (startDiff >= 0) {
    // sale is ongoing so we display remaining time left
    const endDiffAbs = Math.abs(endDiff);

    if (endDiffAbs < 60) {
      return `${Math.round(endDiffAbs)} minutes left`;
    }

    const computedHoursLeft = endDiffAbs / 60;
    if (computedHoursLeft < 24) {
      return `${Math.round(computedHoursLeft)} hours left`;
    }

    const computedDaysLeft = endDiffAbs / 1440;
    return `${Math.round(computedDaysLeft)} days left`;
  }

  const startDiffAbs = Math.abs(startDiff);

  if (startDiffAbs < 60) {
    return `${Math.round(startDiffAbs)} minutes before start`;
  }

  const computedHoursLeft = startDiffAbs / 60;
  if (computedHoursLeft < 24) {
    return `${Math.round(computedHoursLeft)} hours before start`;
  }

  const computedDaysLeft = startDiffAbs / 1440;
  return `${Math.round(computedDaysLeft)} days before start`;
}