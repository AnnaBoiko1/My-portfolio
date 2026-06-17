"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, LanguageCode, TranslationKey } from '@/lib/translations';

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<LanguageCode>('EN');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // 1. Check URL first for ?lang=
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang')?.toUpperCase() as LanguageCode | null;
        
        if (urlLang && translations[urlLang]) {
            setLanguageState(urlLang);
            localStorage.setItem('language', urlLang);
        } else {
            // 2. Fallback to localStorage
            const savedLanguage = localStorage.getItem('language') as LanguageCode | null;
            if (savedLanguage && translations[savedLanguage]) {
                setLanguageState(savedLanguage);
            }
        }
    }, []);

    const setLanguage = (lang: LanguageCode) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        
        // Sync with URL
        const url = new URL(window.location.href);
        if (lang === 'EN') {
            url.searchParams.delete('lang'); // clean URL for default
        } else {
            url.searchParams.set('lang', lang.toLowerCase());
        }
        window.history.replaceState({}, '', url.toString());
    };

    const t = (key: TranslationKey): string => {
        return translations[language]?.[key] || translations['EN'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {/* We render children even if not mounted so SSR works, but hydrated content might shift if local !== EN */}
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        return {
            language: 'EN' as LanguageCode,
            setLanguage: () => { },
            t: (key: TranslationKey) => translations['EN']?.[key] || key
        };
    }
    return context;
};
