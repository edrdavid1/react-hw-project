import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageDropdown.module.css';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'by', label: 'Беларуская' },
];

interface LanguageDropdownProps {
  className?: string;
}

const LanguageDropdown = ({ className }: LanguageDropdownProps) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = LANGUAGES.find((lang) => lang.code === (i18n.language || 'en')) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, code?: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (code) {
        handleLanguageSelect(code);
      } else {
        setIsOpen(!isOpen);
      }
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div className={`${styles.languageContainer} ${className || ''}`} ref={dropdownRef}>
      <button
        className={styles.languageButton}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-label={t('language.selectLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{currentLanguage.label}</span>
        <div className={styles.chevron} />
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {LANGUAGES.map(({ code, label }) => (
            <li key={code}>
              <button
                className={`${styles.dropdownItem} ${code === currentLanguage.code ? styles.active : ''}`}
                onClick={() => handleLanguageSelect(code)}
                onKeyDown={(e) => handleKeyDown(e, code)}
                role="option"
                aria-selected={code === currentLanguage.code}
              >
                <span className={styles.itemLabel}>{label}</span>
                <span className={styles.checkmark} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageDropdown;
