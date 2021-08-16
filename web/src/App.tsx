import React from 'react';
import { AppProvider } from './hooks';
import { SignIn } from './pages/SignIn';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
    return (
        <AppProvider>
            <GlobalStyle />
            <SignIn />
        </AppProvider>
    );
};

export default App;
