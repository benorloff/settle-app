import React, { useState, useEffect } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Header from "../../components/Header/Header";
import ClientCard from '../../components/ClientCard/ClientCard';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loader/Loader';

import clientApi from '../../utils/clientApi';

export default function Clients({ user, handleLogout }) {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);
    const [recentClients, setRecentClients] = useState([]);

    async function getClients() {
        try {
            const data = await clientApi.getAll();
            setClients([...data.clients]);
        } catch (err) {
            console.log(err.message, "<- this is the error");
            setError(err.message);
        }
    }

    function getRecentClients() {
        try {
            const sortedClients = [...clients].sort((a,b) => b.updatedAt - a.updatedAt)
            const recentClients = [...sortedClients].slice(-4)
            const recentClientsDesc = recentClients.reverse()
            setRecentClients(recentClientsDesc)
        } catch (err) {
            console.log(err.message)
            setError(err.message)
        }
    }

    useEffect(() => {
        getClients();
        getRecentClients();
    }, []);

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
            <Grid verticalAlign="middle" centered>
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: 1000 }}>
                        <Card.Group itemsPerRow={4} centered doubling>
                            {recentClients.map((client, i) => {
                                return (
                                    <ClientCard
                                        key={i}
                                        client={client}
                                        user={user}
                                    />
                                )
                            })}
                        </Card.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
    
}