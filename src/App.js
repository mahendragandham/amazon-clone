import React, { useEffect } from "react";
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import BottomPage from "./BottomPage";
import PageEnd from "./PageEnd";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51IBzz3CCd7GXDkwRVKgyq3dVpSWe00IDYSe9C4PewrtgiAovJmOrFEGDfzGF7fDDzzDASBfQmN5T7OvDPSu3ttPp004wDHUjb9"
  );
function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
        user: null 
        })
      }
    })
  }, [])
  return (
    <Router>
    <div className="app">
      <Switch>
      <Route path="/bottom">
          <BottomPage />
          <PageEnd />
        </Route>
        <Route path="/login">
          <Login />
          <h1>Login page</h1>
        </Route>
        <Route path="/checkout">
        <Header />
        <Checkout />
        </Route>
        <Route path="/payment">
          <Header />
          <Elements stripe={promise}>
          <Payment />
          </Elements>
          
        </Route>
        <Route path="/">
        <Header />
        <Home />
        <BottomPage />
          <PageEnd />
        </Route>
        
      </Switch>
    </div>
    </Router>
  );
}

export default App;
