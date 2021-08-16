import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

export const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={SignIn} />
                <Route path="/signUp" component={SignUp} />
            </Switch>
        </BrowserRouter>
    );
};
