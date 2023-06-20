import { useTranslation } from "react-i18next";
import { LANGUAGES } from '../constants';
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

import '../styles/Lang.css'

export const Lang = () => {
    const navigate = useNavigate();
    const {lang, setLang} = useContext(GlobalContext);
    const { t } = useTranslation();
    const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang_code = e.target.value;
        setLang(lang_code);
    };

    const navigateLogin = () => {
        navigate('/');
    }

    return (
        <div className="app-containter">
            <div className='lang-page'>
                <h1>{t("lang-title")}</h1>
                <select defaultValue={lang} onChange={onChangeLang}>
                    {LANGUAGES.map(({ code, label }) => (
                        <option key={code} value={code}>
                            {label}
                        </option>
                    ))}
                </select>
                <button onClick={navigateLogin}> go back</button>
            </div>
        </div >
    )
}