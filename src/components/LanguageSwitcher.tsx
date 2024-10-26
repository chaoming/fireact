import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-300">{t('language')}:</span>
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="text-sm border rounded-md px-2 py-1 bg-gray-800 text-gray-200 border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>
    </div>
  );
}