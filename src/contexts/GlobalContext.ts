import { createContext } from "react";

export interface IGlobalContext {
    lang: string;
    setLang: (lang: string) => void;
}

export const GlobalContext = createContext<IGlobalContext>({
    lang: "en",
    setLang: () => { },
});