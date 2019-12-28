import React from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
import {Route, Switch, Redirect} from "react-router-dom";
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
            fontWeight: 400
        }}>
            This website uses cookies to store your entered data. By using I Want To Pass, you agree to our <a
            style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => history.push('/cookie')}>cookie
            policy</a>
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
                <Route path='/' exact={true}>
                    <MainPage/>
                </Route>
                <Redirect to='/'/>
            </Switch>

            {!(location.pathname.includes('/mobile')) && !(location.pathname.includes('/cookie'))
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
