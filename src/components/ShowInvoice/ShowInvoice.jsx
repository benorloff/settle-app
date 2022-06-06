import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InactiveLineItem from '../InactiveLineItem/InactiveLineItem';
import { Button, Grid, Segment, Divider, Table } from 'semantic-ui-react';

export default function ShowInvoice({ user, invoice }){
    console.log(invoice, '<--invoice from ShowInvoice')
    const [lineItems, setLineItems] = useState([])

    async function getLineItems() {
        invoice.lines.data.forEach((ii) => {
            setLineItems([
                ...lineItems,
                ii
            ])
        })
    }

    useEffect(() => {
        getLineItems();
    }, [])

    return (
        <>
            <Grid style={{ height: "100vh" }} verticalAlign="middle" centered container>
                <Grid.Column style={{ maxWidth: 750 }}>
                    <Grid>
                        <Grid.Row columns='equal' verticalAlign='middle'>
                            <Grid.Column width={12}>
                                <h1 style={{ marginTop: 20, marginBottom: 20 }}>Invoice</h1>
                            </Grid.Column>
                            <Grid.Column width={2} floated='right' textAlign='right'>
                                <Link to="/invoices"><Button>Cancel</Button></Link>
                            </Grid.Column>
                            <Grid.Column width={2} floated='right' textAlign='right'>
                                <Link to={`#`}><Button color='green'>Edit</Button></Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Segment raised>
                        <Grid stackable padded>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <h4>Invoice Number</h4>
                                    <p>{invoice.number}</p>
                                </Grid.Column>
                                <Grid.Column>
                                    <h4>Issue Date</h4>
                                </Grid.Column>
                                <Grid.Column>
                                    <h4>Due Date</h4>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <h4>Billed To</h4>
                                </Grid.Column>
                                <Grid.Column>
                                    <h4>Reference</h4>
                                </Grid.Column>
                                <Grid.Column>
                                    <h4>Amount Due</h4>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider />
                            <Grid.Row columns='equal'>
                                <Table color='green'>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell width={10}>Description</Table.HeaderCell>
                                            <Table.HeaderCell textAlign='right' width={2}>Rate</Table.HeaderCell>
                                            <Table.HeaderCell textAlign='right' width={2}>Qty</Table.HeaderCell>
                                            <Table.HeaderCell textAlign='right' width={2}>Total</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {lineItems.map((item) => {
                                            return(
                                                <InactiveLineItem
                                                    key={item.id}
                                                    description = {item.description}
                                                    rate = {item.unit_amount}
                                                    quantity = {item.quantity}
                                                    total = {item.amount}
                                                />
                                            )
                                        })}
                                    </Table.Body>
                                </Table>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Grid.Column>
            </Grid>
            <Grid>

            </Grid>
        </>
    )
}