export const DAYS = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7
};

export const DAYS_ARRAY = Object.values(DAYS);

export const getDayName = (dayNumber, locale = 'en') => {
  const date = new Date();
  date.setDate(date.getDate() - date.getDay() + dayNumber);
  return date.toLocaleDateString(locale, { weekday: 'short' });
}; 