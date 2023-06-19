import { useTranslation } from "react-i18next";
import { FirebaseContext } from '../contexts/FirebaseContext';
import React from "react";

export const Home = () => {
  const { user, setUser } = React.useContext(FirebaseContext);
  const { t } = useTranslation();

  return (
    <div>
      <main>
        <h1>{t("title")}</h1>
        <span>{t("label")} </span>
      </main>
      <button onClick={()=>setUser(null)}></button>
    </div>

  );
};
