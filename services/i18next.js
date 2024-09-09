import i18next from 'i18next';
import { initReactI18next, Translation} from 'react-i18next';
import en from '../locale/en.json';
import ta from '../locale/ta.json';
export const languageResources={
    en:{translation:en},
    ta:{translation:ta},
}
i18next.use(initReactI18next).init({
    compatibilityJSON:'v3',
    lng:'en',
    fallbackLng:'en',
    resources:languageResources

});
export default i18next;