import React, { useState, useEffect } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import Header from "../../components/Header/Header";
import ClientCard from '../../components/ClientCard/ClientCard';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loader/Loader';

import clientApi from '../../utils/clientApi';

export default function Dashboard({ user, handleLogout }) {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);

    async function getClients() {
        try {
            const data = await clientApi.getAll();
            console.log(data, '<-- this is getAll data from clientApi')
            setClients([...data.clients]);
            console.log(clients)
        } catch (err) {
            console.log(err.message, "<- this is the error");
            setError(err.message);
        }
    }

    useEffect(() => {
        getClients();
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
            <Card.Group>
                {clients.map((client) => {
                    return (
                        <ClientCard
                            client={client}
                            user={user}
                        />
                    )
                })}
            </Card.Group>
        </>
    )
    
}