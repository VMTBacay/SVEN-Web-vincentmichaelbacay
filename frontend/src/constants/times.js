export const TIMES = {
    MORNING: 1,
    AFTERNOON: 2,
    EVENING: 3,
};

export const TIMES_ARRAY = Object.values(TIMES);

export const getTimeName = (timeNumber, locale = 'en') => {
    const timeLabels = {
        en: {
            [TIMES.MORNING]: 'Morning',
            [TIMES.AFTERNOON]: 'Afternoon', 
            [TIMES.EVENING]: 'Evening'
        }
        // Add more locales as needed
    };

    return timeLabels[locale]?.[timeNumber] || timeLabels.en[timeNumber];
};