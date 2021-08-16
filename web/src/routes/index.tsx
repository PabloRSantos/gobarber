import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Dashboard } from '../pages/Dashboard';
import { Route } from './Route';
import { ForgotPassword } from '../pages/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword';
import { Profile } from '../pages/Profile';

export const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={SignIn} />
                <Route path="/signUp" component={SignUp} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/reset-password" component={ResetPassword} />
                <Route path="/dashboard" component={Dashboard} isPrivate />
                <Route path="/profile" component={Profile} isPrivate />
            </Switch>
        </BrowserRouter>
    );
};
