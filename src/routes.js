import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Products from './pages/products';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Main} exact />
                <Route path="/products/:id" component={Products} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;