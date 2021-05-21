import React from 'react';
import './index.css';
import { useTranslation } from 'react-i18next';

function LangSelector(props, { component: Component, ...children}) {
    const [t, i18n] = useTranslation();
    
    const langSelectorChanged = (event) => {
        props.setCurrentLanguage(event.target.attributes.value.value)
    }
    
    return (
        <div className={props.separately ? "selectorBlock" : ""}>
            <ul className="selector">
                {
                    i18n.language == "ru" ?
                    (
                        <>
                            <li className="selectorElement" value="ru" isselected={props.currentLanguage === "ru" ? "true" : "false"} onClick={langSelectorChanged}>{t('LANG_RUS.1')}</li>
                            <li className="selectorElement" value="en" isselected={props.currentLanguage === "en" ? "true" : "false"} onClick={langSelectorChanged}>{t('LANG_ENG.1')}</li>
                        </>
                    ) : 
                    (
                        <>
                            <li className="selectorElement" value="en" isselected={props.currentLanguage === "en" ? "true" : "false"} onClick={langSelectorChanged}>{t('LANG_ENG.1')}</li>
                            <li className="selectorElement" value="ru" isselected={props.currentLanguage === "ru" ? "true" : "false"} onClick={langSelectorChanged}>{t('LANG_RUS.1')}</li>
                        </>
                    )
                }
            </ul>
        </div>
    );

}

export default LangSelector;
