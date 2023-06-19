import { createContext } from "react";
import { User as FirebaseUser } from "firebase/auth";

export interface IFireBaseContext {
    user: FirebaseUser | null;
    setUser: (user: FirebaseUser | null) => void;
}

export const FirebaseContext = createContext<IFireBaseContext>({
    user: null,
    setUser: () => { },
});