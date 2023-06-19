import { useState, useEffect, useMemo } from "react";
import { IGlobalContext } from "./GlobalContext";
import { useTranslation } from "react-i18next";

export function useGlobalContext(): IGlobalContext {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState('en');

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);

    return useMemo(() => ({
        lang,
        setLang,
    }), [lang, setLang]);
}