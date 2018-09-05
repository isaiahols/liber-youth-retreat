import React from "react";
import { Switch, Route } from 'react-router-dom';

// public pages
import Home from './View/Public/Home/Home';
import About from './View/Public/About/About';
import Contact from "./View/Public/Contact/Contact";
import Legal from "./View/Public/Legal/Legal";

// private page
import UserDashboard from "./View/Private/Dashboard/Dashboard";
// import Register from "./View/Private/Register/Register";
import ThankYou from './View/Private/ThankYou/ThankYou';
import Payment from './View/Private/Payment/Payment';

// This is register
import Part1 from "./View/Private/Register/Part1/Part1";
import Part2 from "./View/Private/Register/Part2/Part2";
import Part3 from "./View/Private/Register/Part3/Part3";
import Part4 from "./View/Private/Register/Part4/Part4";
import Part5 from "./View/Private/Register/Part5/Part5";
import Part6 from "./View/Private/Register/Part6/Part6";

// Error Pages
import Page404 from './View/ErrorPages/404/404'

export default (
    <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
        <Route path='/legal' component={Legal} />

        {/* this is private area */}
        <Route path='/user/dashboard' component={UserDashboard} />
        {/* <Route path='/user/register/:page' component={Register} /> */}
        <Route path='/user/payment' component={Payment} />
        <Route path='/user/finished' component={ThankYou} />

        {/* this is register */}
        <Route path={`/user/register/1`} component={Part1} />
        <Route path={`/user/register/2`} component={Part2} />
        <Route path={`/user/register/3`} component={Part3} />
        <Route path={`/user/register/4`} component={Part4} />
        <Route path={`/user/register/5`} component={Part5} />
        <Route path={`/user/register/6`} component={Part6} />

        {/* Errors */}
        <Route path='/' component={Page404} />


    </Switch>
)