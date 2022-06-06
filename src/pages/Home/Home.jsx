import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Container, List, Button, Grid, Segment } from 'semantic-ui-react';
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
            <Grid style={{ height: "100vh", backgroundColor: 'green' }} verticalAlign="middle" centered>
                <Grid.Row>
                    <Grid.Column textAlign="center">
                        <h1>Send invoices. Get paid. Easy.</h1>
                        { user && 
                            <Link to="/dashboard"><Button>Dashboard</Button></Link>
                        }
                        { !user &&
                            <Link to="/signup"><Button>Get Started</Button></Link>
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Segment inverted vertical style={{ padding: '2em 5em' }}>
                <Container>
                    <Grid inverted centered>
                        <Grid.Row>
                            <Grid.Column>
                                Copyright Settle. All Rights Reserved.
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </>
    )
}