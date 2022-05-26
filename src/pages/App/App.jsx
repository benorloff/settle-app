import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../Home/Home";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import Dashboard from "../Dashboard/Dashboard";
import Clients from "../Clients/Clients";
import InvoiceNew from '../InvoiceNew/InvoiceNew';
import ClientNew from '../ClientNew/ClientNew';
import userService from "../../utils/userService";

function App() {
  const [user, setUser] = useState(userService.getUser()); // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like
  // this  const token = createJWT(user); // where user was the document we created from mongo
  const [business, setBusiness] = useState('')

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getting the user from localstorage decoding the jwt
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  if (user) {
    return (
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        {/* <Route
          path="/stripe-onboard"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        /> */}
        <Route
          path="/dashboard"
          element={<Dashboard user={user} handleLogout={handleLogout}/>}
        />
        <Route
          path="/clients"
          element={<Clients user={user} handleLogout={handleLogout}/>}
        />
        <Route
          path="/invoice/new"
          element={<InvoiceNew user={user} handleLogout={handleLogout}/>}
        />
        <Route
          path="/client/new"
          element={<ClientNew user={user} handleLogout={handleLogout}/>}
        />
        <Route path="/*" element={<Navigate to="/dashboard" />} />
      </Routes>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
}

export default App;
