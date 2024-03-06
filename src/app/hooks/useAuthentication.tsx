"use client";
import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

interface AuthState {
    user: User | undefined
};

const useAuthentication = (): AuthState => {
    const [ user, setUser ] = useState<User | undefined>(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user ? setUser(user) : setUser(undefined);
        });

        return () => unsubscribe();
    }, []);

    return { user };
}

export { useAuthentication };
