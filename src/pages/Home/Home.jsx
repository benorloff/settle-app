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
            <Container text>
                <Header
                    as='h1'
                    content='Imagine-a-Company'
                    inverted
                    style={{
                        fontSize: '2em',
                        fontWeight: 'normal',
                        marginBottom: 0,
                        marginTop: '1.5em',
                    }}
                />
                <Header
                    as='h2'
                    content='Do whatever you want when you want to.'
                    inverted
                    style={{
                        fontSize: '1.5em',
                        fontWeight: 'normal',
                        marginTop: '0.5em',
                    }}
                />
                <Button primary size='huge'>
                Get Started
                <Icon name='right arrow' />
                </Button>
            </Container>
        </>
    )
}