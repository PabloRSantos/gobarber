import React from 'react';
import { AuthProvider } from './hooks/AuthContext';
import { SignIn } from './pages/SignIn';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <GlobalStyle />
            <SignIn />
        </AuthProvider>
    );
};

export default App;
