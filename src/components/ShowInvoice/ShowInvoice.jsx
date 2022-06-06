import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InactiveLineItem from '../InactiveLineItem/InactiveLineItem';
import { Button, Grid, Segment, Divider, Table } from 'semantic-ui-react';

export default function ShowInvoice({ user, invoice }){
    const [lineItems, setLineItems] = useState([])

    async function getLineItems() {
        invoice.invoice.lines.data.forEach((ii) => {
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
                                    <p>{invoice.invoice.number}</p>
                                </Grid.Column>
                                <Grid.Column>
                                    <h4>Issue Date</h4>
                                    <p>{invoice.invoice.created}</p>
                                </Grid.Column>
                                <Grid.Column>
                                    <h4>Due Date</h4>
                                    <p>{invoice.invoice.due_date}</p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <h4>Billed To</h4>
                                    <p>{invoice.invoice.customer_name}<br />
                                    {invoice.invoice.customer_address.line1}<br />
                                    {invoice.invoice.customer_address.line2 ? `${invoice.invoice.customer_address.line2} <br />` : ''}
                                    {invoice.invoice.customer_address.city}, {invoice.invoice.customer_address.state} {invoice.invoice.customer_address.postal_code}<br />
                                    {invoice.invoice.customer_address.country}</p>
                                </Grid.Column>
                                <Grid.Column>
                                    <h4>Reference</h4>
                                </Grid.Column>
                                <Grid.Column>
                                    <h4>Amount Due</h4>
                                    <p>${invoice.invoice.amount_due / 100}</p>
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
                            <Divider />
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <h4>Notes</h4>
                                    <h4>Terms</h4>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Table basic='very' textAlign='right'>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>Subtotal</Table.Cell>
                                                <Table.Cell>$</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>Tax</Table.Cell>
                                                <Table.Cell>0.00</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>Total</Table.Cell>
                                                <Table.Cell>0.00</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>Amount Paid</Table.Cell>
                                                <Table.Cell>0.00</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell><h3>Amount Due</h3></Table.Cell>
                                                <Table.Cell><h3>$</h3></Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    )
}