import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../Home/Home";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import Dashboard from "../Dashboard/Dashboard";
import Clients from "../Clients/Clients";
import Invoices from "../Invoices/Invoices";
import InvoiceNew from '../InvoiceNew/InvoiceNew';
import ClientNew from '../ClientNew/ClientNew';
import userService from "../../utils/userService";
import stripeService from "../../utils/stripeService";

function App() {
  const [user, setUser] = useState(userService.getUser());
  const [stripeAccountLinkUrl, setStripeAccountLinkUrl] = useState(stripeService.getUrlFromAccountLink());

  function handleSignUpOrLogin() {
    setUser(userService.getUser());
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
        <Route
          path="/stripe-onboard"
          element={() => {
            window.location.replace(stripeAccountLinkUrl);
            return null;
          }}
        />
        <Route
          path="/dashboard"
          element={<Dashboard user={user} handleLogout={handleLogout}/>}
        />
        <Route
          path="/clients"
          element={<Clients user={user} handleLogout={handleLogout}/>}
        />
        <Route
          path="/invoices"
          element={<Invoices user={user} handleLogout={handleLogout}/>}
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
