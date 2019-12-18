import React from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
import {Route, Switch} from "react-router-dom";
import CalculatorPage from "./pages/CalculatorPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import {isMobile} from "react-device-detect";
import CookieBanner from "react-cookie-banner";

function App() {

    const cookieLink = (
        <div style={{
            verticalAlign: 'middle',
            fontWeight: 400,
            width: '100%',
            lineHeight: '100px',
            height:'100px'
        }}>
            This website uses cookies to store your entered data. By using IWantToPass, you agree to our <a
            style={{textDecoration: 'underline'}} onClick={()=>this.props.history.push('/cookie')}>use of cookies</a>
        </div>
    );

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
            {!isMobile && <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%'}}>
                <CookieBanner
                    link={cookieLink}
                    styles={{
                        banner: { backgroundColor: 'rgba(60, 60, 60, 0.8)', height:'100px'},
                    }}
                    dismissOnScroll={false}/>
            </div>}
        </div>
    );
}

export default App;
