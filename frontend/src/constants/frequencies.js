export const FREQUENCIES = {
    RECURRING: 1,
    ONE_TIME: 2,
};

export const FREQUENCIES_ARRAY = Object.values(FREQUENCIES);

export const getFrequencyName = (frequencyNumber, locale = 'en') => {
    const frequencyLabels = {
        en: {
            [FREQUENCIES.RECURRING]: 'Recurring',
            [FREQUENCIES.ONE_TIME]: 'One Time'
        }
        // Add more locales as needed
    };

    return frequencyLabels[locale]?.[frequencyNumber] || frequencyLabels.en[frequencyNumber];
};