import React from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
import {Route, Switch} from "react-router-dom";
import CalculatorPage from "./pages/CalculatorPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import CookieBanner from "react-cookie-banner";
import {useHistory, useLocation} from "react-router-dom";

function App() {
    const history = useHistory();
    const location = useLocation();

    const cookieLink = (
        <div style={{
            verticalAlign: 'middle',
            fontWeight: 400,
            width: '100%',
            lineHeight: '65px'
        }}>
            This website uses cookies to store your entered data. By using I Want To Pass, you agree to our <a
            style={{textDecoration: 'underline'}} onClick={() => history.push('/cookie')}>use of cookies</a>
        </div>
    );

    return (
        <div className="App">
            <Switch>
                <Route path='/cookie'>
                    <CookiePolicyPage/>
                </Route>
                <Route path='/course'>
                    <CalculatorPage/>
                </Route>
                <Route path='/mobile/course'>
                    <CalculatorPage/>
                </Route>
                <Route path='/mobile'>
                    <MainPage/>
                </Route>
                <Route path='/'>
                    <MainPage/>
                </Route>
            </Switch>

            {!(location.pathname.includes('/mobile'))
            && <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%'}}>
                <CookieBanner
                    disableStyle={true}
                    link={cookieLink}
                    dismissOnScroll={false}/>
            </div>}
        </div>
    );
}

export default App;
