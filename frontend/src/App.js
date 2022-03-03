import React, { useState, useEffect } from "react";
import Login from "./authentication/Login/Login";
import {BrowserRouter as Router} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Flip } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import Signup from "./authentication/Signup/Signup";
import ConfirmEmail from "./authentication/confirmEmail/ConfirmEmail";
import Updateprofile from "./Dashboard/Updateprofile";
import { useAuth } from "../src/customHooks/authHook";
import { UserContext } from "../src/customHooks/reducer/UserContext";

const App = () => {
  const auth = useAuth();
  //  console.log(auth)
  const authContextVal = {
    login: auth.login,
    userDetails: auth.userDetails,
    token: auth.token,
    logout: auth.logout,
  };
  const [routes, setroutes] = useState(null);
  useEffect(() => {
    let route = null;
    if (auth.token) {
      route = (
        <Switch>
          <Route exact path="/update">
            <Updateprofile />
          </Route>
          <Redirect to="/update" />
        </Switch>
      );
    } else {
      route = (
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/confirm/:id">
            <ConfirmEmail />
          </Route>
          <Redirect to="/" />
        </Switch>
      );
    }
    setroutes(route);
  }, [auth.token]);

  return (
    <>
      <ToastContainer
        theme="theme"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        transition={Flip}
        toastStyle={{
          backgroundColor: "#1a1a1d",
          color: "white",
          border: "2px solid #c3073f",
        }}
      />
      <UserContext.Provider value={authContextVal}>
        <Router>{routes}</Router>
      </UserContext.Provider>
    </>
  );
};

export default App;
