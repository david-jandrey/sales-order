import React from 'react';
import {BrowserRouter, Route, Switch} from  'react-router-dom';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewOrder from './pages/NewOrder';
import NewProduct from './pages/NewProduct';

export default function Routes(){
    return(

        <div className="App">
        <BrowserRouter>
        <Switch>
            <Route  path="/" exact component={Logon} />
            <Route  path="/register" component={Register} />
           
            <Route  path="/profile" component={Profile} />
            <Route  path="/order/new" component={NewOrder} />
            <Route  path="/product/new" component={NewProduct} />
        </Switch>
        </BrowserRouter>
        </div>
    );
}