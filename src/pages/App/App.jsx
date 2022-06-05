import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../Home/Home";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import Dashboard from "../Dashboard/Dashboard";
import Clients from "../Clients/Clients";
import Invoices from "../Invoices/Invoices";
import InvoiceNew from '../InvoiceNew/InvoiceNew';
import InvoiceShow from '../InvoiceShow/InvoiceShow';
import ClientNew from '../ClientNew/ClientNew';
import StripeOnboard from "../StripeOnboard/StripeOnboard";
import userService from "../../utils/userService";

function App() {
  const [user, setUser] = useState(userService.getUser());

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
          element={<Home user={user} handleSignUpOrLogin={handleSignUpOrLogin} handleLogout={handleLogout} />}
        />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage user={user} handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/stripe-onboard"
          element={<StripeOnboard user={user} handleLogout={handleLogout}/>}
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
          path="/invoices/:id"
          element={<InvoiceShow user={user} handleLogout={handleLogout}/>}
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
