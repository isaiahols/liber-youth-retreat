import React, { Component } from 'react';
import { HashRouter } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';

import routes from './routes';
import Nav from './Components/Nav/Nav';
import MyBurger from './Components/Nav/MyBurgerMenu';
import Burger from './Components/Nav/BurgerMenu';
import Footer from './Components/Footer/Footer';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faTimes)

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#479761',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: '#0066ff',
      main: '#A16E83',
      // dark: will be calculated from palette.secondary.main,
      // contrastText: '#ffcc00',
    },
  },
});



class App extends Component {
  render() {
    return (
      <HashRouter>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <CssBaseline />
            {/* <Nav /> */}
            <MyBurger />
            <div id="outer-container">
              {/* <Burger
                id='burger-place'
                pageWrapId={"page-wrap"}
                outerContainerId={"outer-container"}
              // noOverlay={false}
              /> */}
              {/* <main id="page-wrap">
              </main> */}
            </div>
            {routes}
            <Footer />
          </div>
        </MuiThemeProvider>
      </HashRouter>
    );
  }
}

export default App;
