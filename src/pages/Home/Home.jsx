import React, { useState } from "react";
import { Container, Icon, Button } from 'semantic-ui-react';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";

import userService from "../../utils/userService";

export default function Home({ user, handleSignUpOrLogin, handleLogout }) {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);


    if (error) {
        return (
            <>
                <Header user={user} handleLogout={handleLogout} />
                <ErrorMessage error={error} />
            </>
        ) 
    }

    if (loading) {
        return (
            <>
                <Header user={user} handleLogout={handleLogout} />
                <Loading />
            </>
        ) 
    }

    return (
        <>
            <Header user={user} handleLogout={handleLogout} />
            <div>
                <h1>Home Page</h1>
            </div>
        </>
    )
}