import { useTranslation } from "react-i18next";
import { LANGUAGES } from '../constants';
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import '../styles/Lang.css'

export const Lang = () => {
  const navigate = useNavigate();
  const { lang, setLang } = useContext(GlobalContext);
  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as string);
  };

  // const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     const lang_code = e.target.value;
  //     setLang(lang_code);
  // };

  const navigateLogin = () => {
    navigate('/');
  }

  return (
    <div className="app-containter">
      <div className='lang-page'>
        <h1>{t("lang-title")}</h1>
        <div id='lang-select-wrapper'>
          <FormControl fullWidth>
            <InputLabel id="lang-select-label">{t("language")}</InputLabel>
            <Select
              labelId="lang-select-label"
              id="lang-select"
              value={lang}
              label={t("language")}
              onChange={handleChange}
            >
              {LANGUAGES.map(({ code, label }) => (
                <MenuItem value={code}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button style={{
          borderColor: 'var(--color-4)',
          color: 'var(--color-4)',
        }} id="lang-button-return" variant="outlined" onClick={navigateLogin} startIcon={<ArrowBackIcon />}>
          {t("return")}
        </Button>
      </div>
    </div >
  )
}