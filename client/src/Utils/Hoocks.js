import { useState } from 'react';

export const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
        setValue(e.target.value);
    }
    return {
        value,
        setValue,
        onChange: handleChange
    }
}
export const getLocale = (item, language) => {
    if (item !== undefined) {
        switch (language) {
            case "ru": return item.ru || item.en;
            case "en": return item.en;
            default: return item.en;
        }
    }
    return "";
}