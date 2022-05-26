import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Grid, Container, Button, Icon, Divider, Table, Menu } from 'semantic-ui-react';
import Header from "../../components/Header/Header";
import ClientCard from '../../components/ClientCard/ClientCard';
import ClientRow from '../../components/ClientRow/ClientRow';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loader/Loader';

import clientApi from '../../utils/clientApi';

export default function Clients({ user, handleLogout }) {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);
    const [recentClients, setRecentClients] = useState([]);

    const navigate = useNavigate();

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
            console.log(recentClientsDesc)
            setRecentClients(recentClientsDesc)
        } catch (err) {
            console.log(err.message)
            setError(err.message)
        }
    }

    function handleNewClientBtnClick() {
        navigate('/client/new')
    }

    useEffect(() => {
        getClients();
        function getRecentClients() {
            try {
                const sortedClients = [...clients].sort((a,b) => b.updatedAt - a.updatedAt)
                const recentClients = [...sortedClients].slice(-4)
                const recentClientsDesc = recentClients.reverse()
                console.log(recentClientsDesc)
                setRecentClients(recentClientsDesc)
            } catch (err) {
                console.log(err.message)
                setError(err.message)
            }
        }
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
            <Container>
                <Grid verticalAlign="middle" centered>
                    <Grid.Row columns='equal' verticalAlign='middle'>
                        <Grid.Column width={8}>
                            <h1 style={{ marginTop: 20, marginBottom: 20 }}>Clients</h1>
                        </Grid.Column>
                        <Grid.Column width={8} textAlign='right'>
                            <Button 
                                type='button' 
                                color='blue' 
                                icon 
                                labelPosition='right'
                                onClick={handleNewClientBtnClick}
                            >
                                <Icon name='plus' />
                                New Client
                            </Button>  
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row>
                        <Grid.Column>
                            <h2>Recently Active</h2>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
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
                    <Divider />
                    <Grid.Row>
                        <Grid.Column>
                            <h2>All Clients</h2>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Table basic sortable>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>Company</Table.HeaderCell>
                                        <Table.HeaderCell collapsing>Actions</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {clients.map((client, i) => {
                                        return (
                                            <ClientRow
                                                key={i}
                                                client={client}
                                            />
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </>
    )
    
}