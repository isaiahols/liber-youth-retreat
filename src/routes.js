import React from "react";
import { Switch, Route } from 'react-router-dom';

// public pages
import Home from './View/Public/Home/Home';
import About from './View/Public/About/About';
import Contact from "./View/Public/Contact/Contact";
import Legal from "./View/Public/Legal/Legal";

// private page
import UserDashboard from "./View/Private/Dashboard/Dashboard";
import Register from "./View/Private/Register/Register";
import ThankYou from './View/Private/ThankYou/Thankyou';
import Payment from './View/Private/Payment/Payment';

export default (
    <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
        <Route path='/legal' component={Legal} />

        {/* this is private area */}
        <Route path='/user/dashboard' component={UserDashboard} />
        <Route path='/user/Register/:page' component={Register} />
        <Route path='/user/payment' component={Payment} />
        <Route path='/user/finished' component={ThankYou} />


    </Switch>
)