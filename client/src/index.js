import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import store from "./helper/store";
import * as serviceWorker from './serviceWorker';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {MuiThemeProvider} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";
import {BrowserRouter, HashRouter} from "react-router-dom";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: grey[50]
        },
        secondary: {
            main: grey[900]
        }
    },
    status: {
        danger: 'red',
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <BrowserRouter basename='i-want-to-pass'>
        <Provider store={store}>
        <App/>
        </Provider>
        </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
