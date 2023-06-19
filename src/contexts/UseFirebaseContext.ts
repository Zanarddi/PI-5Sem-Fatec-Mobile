import { useEffect, useMemo, useState } from 'react';
import { IFireBaseContext } from './FirebaseContext';
import { FirebaseContext } from './FirebaseContext';
import { User as FirebaseUser } from "firebase/auth"

export function useFirebaseContext(): IFireBaseContext {
    const [user, setUser] = useState<FirebaseUser | null>(null);

    return useMemo(() => ({
        user,
        setUser,
    }), [user, setUser]);
}