import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Divider, Container, Button, Icon, Table, Card } from 'semantic-ui-react';
import Header from "../../components/Header/Header";
import InvoiceCard from '../../components/InvoiceCard/InvoiceCard';
import InvoiceRow from '../../components/InvoiceRow/InvoiceRow';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loader/Loader';

import invoiceApi from '../../utils/invoiceApi';


export default function Invoices({ user, handleLogout }) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [recentInvoices, setRecentInvoices] = useState([]);

    const navigate = useNavigate();

    async function getInvoices() {
        try {
            const data = await invoiceApi.getAll();
            setInvoices([...data.invoices]);
        } catch (err) {
            console.log(err.message, '<- this is the error')
            setError(err.message);
        }
    }

    function getRecentInvoices() {
        try {
            const sortedInvoices = [...invoices].sort((a,b) => b.updatedAt - a.updatedAt)
            const recentInvoices = [...sortedInvoices].slice(-4)
            const recentInvoicesDesc = recentInvoices.reverse()
            console.log(recentInvoicesDesc)
            setRecentInvoices(recentInvoicesDesc)
        } catch (err) {
            console.log(err.message)
            setError(err.message)
        }
    }

    function handleNewInvoiceBtnClick() {
        navigate("/invoice/new")
    }

    useEffect(() => {
        getInvoices();
        getRecentInvoices();
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
                            <h1 style={{ marginTop: 20, marginBottom: 20 }}>Invoices</h1>
                        </Grid.Column>
                        <Grid.Column width={8} textAlign='right'>
                            <Button 
                                type='button' 
                                color='blue' 
                                icon 
                                labelPosition='right'
                                onClick={handleNewInvoiceBtnClick}
                            >
                                <Icon name='plus' />
                                New Invoice
                            </Button>  
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row>
                        <Grid.Column>
                            <h2>Recent Invoices</h2>
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
                        <Grid.Column>
                            <h2>All Invoices</h2>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Table 
                                basic 
                                sortable 
                                stackable 
                                singleLine
                                selectable
                            >
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell width={3}>Client / Invoice #</Table.HeaderCell>
                                        <Table.HeaderCell width={7}>Description</Table.HeaderCell>
                                        <Table.HeaderCell width={3}>Issued Date</Table.HeaderCell>
                                        <Table.HeaderCell width={3}>Amount</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {invoices.map((invoice, i) => {
                                        console.log(invoice.invoiceItems)
                                        return (
                                            <InvoiceRow
                                                key={i}
                                                invoice={invoice}
                                                items={invoice.invoiceItems}
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