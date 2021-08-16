import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Dashboard } from '../pages/Dashboard';
import { Route } from './Route';

export const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={SignIn} />
                <Route path="/signUp" component={SignUp} />
                <Route path="/dashboard" component={Dashboard} isPrivate />
            </Switch>
        </BrowserRouter>
    );
};
