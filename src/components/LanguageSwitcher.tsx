import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = useMemo(() => {
    // Get all available languages from i18n resources
    return Object.keys(i18n.options.resources || {}).map(lang => ({
      code: lang,
      name: i18n.getResource(lang, 'translation', 'languageName')
    }));
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <select
      onChange={(e) => changeLanguage(e.target.value)}
      value={i18n.language}
      className="text-sm border rounded-md px-2 py-1 bg-gray-800 text-gray-200 border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
    >
      {languages.map(({ code, name }) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
