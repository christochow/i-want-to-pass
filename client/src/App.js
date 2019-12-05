import React from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
import {Route, Switch} from "react-router-dom";
import CalculatorPage from "./pages/CalculatorPage";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path='/course'>
                    <CalculatorPage/>
                </Route>
                <Route path='/'>
                    <MainPage/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
