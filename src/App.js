import React, { Component } from 'react';
import { HashRouter } from "react-router-dom";
import { Elements, StripeProvider } from 'react-stripe-elements';
import Part6 from './View/Private/Register/Part6/Part6';

import './App.css';

import routes from './routes';
import Nav from './Components/Nav/Nav'



class App extends Component {
  render() {
    return (
      <HashRouter>
        <StripeProvider apiKey="pk_test_I9wfsztgj5NXzvDMtyPWD6uX" >

          <div className="App">
            <Nav />
            {routes}
            {/* <Elements>
              <Part6 />
            </Elements> */}
          </div>
        </StripeProvider>
      </HashRouter>
    );
  }
}

export default App;
