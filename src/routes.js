import React from "react";
import { Switch, Route } from 'react-router-dom';

import Home from './View/Public/Home/Home';
import About from './View/Public/About/About';
import Contact from "./View/Public/Contact/Contact";
import Legal from "./View/Public/Legal/Legal";

export default (
    <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
        <Route path='/legal' component={Legal} />

    </Switch>
)