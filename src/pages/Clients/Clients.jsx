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
            setLoading(true)
            const data = await clientApi.getAll();
            console.log(data, '<-- data from getClients')
            setClients([...data.customers.data]);
            setLoading(false)
        } catch (err) {
            console.log(err.message, "<- this is the error");
            setError(err.message);
        }
    }

    async function getRecentClients() {
        try {
            setLoading(true)
            const data = await clientApi.getRecent();
            console.log(data, '<-- data from getRecent')
            setRecentClients([...data.customers.data])
            setLoading(false)
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
            <Container>
                <Grid verticalAlign="middle" centered>
                    <Grid.Row columns='equal' verticalAlign='middle'>
                        <Grid.Column width={8}>
                            <h1 style={{ marginTop: 20, marginBottom: 20 }}>Clients</h1>
                        </Grid.Column>
                        <Grid.Column width={8} textAlign='right'> 
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
                                        <Table.HeaderCell>Name/Company</Table.HeaderCell>
                                        <Table.HeaderCell>Notes</Table.HeaderCell>
                                        <Table.HeaderCell collapsing>Total Outstanding</Table.HeaderCell>
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