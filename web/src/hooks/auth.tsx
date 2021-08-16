import React, { createContext, useCallback, useContext, useState } from 'react';
import { api } from '../services/api';

export interface User {
    id: string;
    avatar_url: string;
    name: string;
}
interface AuthState {
    token: string;
    user: User;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if (token && user) {
            api.defaults.headers.common.Authorization = `Bearer ${token}`;

            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const signIn = useCallback(
        async ({ email, password }: SignInCredentials) => {
            const response = await api.post('sessions', { email, password });

            const { token, user } = response.data;

            localStorage.setItem('@GoBarber:token', token);
            localStorage.setItem('@GoBarber:user', JSON.stringify(user));

            api.defaults.headers.common.Authorization = `Bearer ${token}`;

            setData({
                user,
                token,
            });
        },
        [],
    );

    const signOut = useCallback(() => {
        localStorage.removeItem('@GoBarber:user');
        localStorage.removeItem('@GoBarber:token');

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ signIn, user: data.user, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context;
};
