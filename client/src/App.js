import React from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
import {Route, Switch} from "react-router-dom";
import CalculatorPage from "./pages/CalculatorPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path='/course'>
                    <CalculatorPage/>
                </Route>
                <Route path='/cookie'>
                    <CookiePolicyPage/>
                </Route>
                <Route path='/'>
                    <MainPage/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
