// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import các file JSON chứa nội dung
import translationEN from './locales/en/translation.json';
import translationVI from './locales/vi/translation.json';

// Cấu hình i18next
i18n
    .use(LanguageDetector) // Sử dụng để tự động phát hiện ngôn ngữ từ trình duyệt
    .use(initReactI18next) // Khởi tạo react-i18next
    .init({
        resources: {
            en: {
                translation: translationEN,
            },
            vi: {
                translation: translationVI,
            },
        },
        fallbackLng: 'en', // Ngôn ngữ dự phòng
        debug: true, // Bật debug để dễ theo dõi trong quá trình phát triển
        interpolation: {
            escapeValue: false, // React đã tự động xử lý việc escape
        },
    });

export default i18n;
