import React, { useState, useEffect } from 'react';
import { Card, Grid, Container, Divider, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ClientCard from '../../components/ClientCard/ClientCard';
import InvoiceCard from '../../components/InvoiceCard/InvoiceCard'; 
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loader/Loader';

import invoiceApi from '../../utils/invoiceApi';
import clientApi from '../../utils/clientApi';

export default function Dashboard({ user, handleLogout }) {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [recentInvoices, setRecentInvoices] = useState([]);
    const [recentClients, setRecentClients] = useState([]);

    async function getRecentInvoices() {
        try {
            setLoading(true)
            const data = await invoiceApi.getRecent();
            setRecentInvoices([...data.invoiceData]);
            setLoading(false)
        } catch (err) {
            console.log(err.message)
            setError(err.message)
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
        getRecentInvoices();
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
                            <h1 style={{ marginTop: 20, marginBottom: 20 }}>Dashboard</h1>
                        </Grid.Column>
                        <Grid.Column width={8} textAlign='right'> 
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <h2>Recent Invoices</h2>
                        </Grid.Column>
                        <Grid.Column width={8} textAlign='right'> 
                            <Link to="/invoices"><Button color='green'>All Invoices<Icon name='arrow right'></Icon></Button></Link>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Card.Group itemsPerRow={4} centered doubling>
                                {recentInvoices.map((invoice, i) => {
                                    return (
                                        <InvoiceCard
                                            key={i}
                                            invoice={invoice}
                                            user={user}
                                        />
                                    )
                                })}
                            </Card.Group>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <h2>Recent Clients</h2>
                        </Grid.Column>
                        <Grid.Column width={8} textAlign='right'> 
                            <Link to="/clients"><Button color='green' >All Clients<Icon name='arrow right'></Icon></Button></Link>
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
                </Grid>
            </Container>
        </>
    )
    
}