import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import InactiveLineItem from '../InactiveLineItem/InactiveLineItem';
import ActiveLineItem from '../ActiveLineItem/ActiveLineItem';
import { Button, Form, Grid, Segment, Divider, Table } from 'semantic-ui-react';

export default function CreateInvoiceForm(props){
    const [error, setError] = useState('')
    const [numLineItems, setNumLineItems] = useState({value: 0})
    const [inactiveLineItems, setInactiveLineItems] = useState([])
    const [activeLineItem, setActiveLineItem] = useState({
        name: '',
        description:'',
        rate: '',
        quantity: ''
    })
    const [state, setState] = useState({
        invoiceNum: '',
        issueDate: '',
        dueDate: '',
        reference: '',
        invoiceItems: [],
        notes: '',
        terms: '',
        subtotal: 0,
        tax: 0,
        total: 0,
        amountPaid: 0,
        amountDue: 0,
        attachments: [],
        userId: props.user._id,
        stripeCustomerId: '',
    })
    const clientOptions = props.clients.map((client) => ({
        text: client.name,
        value: client.id,
        key: client.id
    }))

    console.log(clientOptions, '<-- client Options')

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        console.log(state)
    }

    function handleSelectChange(e, data) {
        setState({
            ...state,
            stripeCustomerId: data.value
        })
    }

    function handleActiveLineItemChange(e){
        setActiveLineItem({
            ...activeLineItem,
            [e.target.name]: e.target.value
        })
        console.log(activeLineItem,'<-active line item')
        console.log(state)
    }

    async function handleSubmit(e){
        e.preventDefault();
        props.handleCreateInvoice(state);
    }

    async function handleAddLineItem(){
        setNumLineItems(prevNumLineItems => {
            return {value: prevNumLineItems.value + 1}
        })
        setInactiveLineItems(inactiveLineItems => inactiveLineItems.concat(activeLineItem))
        const lastItemIndex = numLineItems.value;
        console.log(lastItemIndex, '<-last item index')
        setActiveLineItem({});
    }

    useEffect(() => {
        async function getDate() {
            const date = await new Date();
            const year = await date.getFullYear();
            const month = await date.getMonth();
            const day = await date.getDate();
            setState({ 
                ...state,
                issueDate: `${year}-${month < 10 ? '0' + (month + 1) : (month + 1)}-${day < 10 ? '0' + day : day}`, 
                dueDate: `${year}-${month < 10 ? '0' + (month + 1) : (month + 1)}-${day < 10 ? '0' + day : day}`
            })
        }
        getDate();
    }, [])

    useEffect(() => {
        setActiveLineItem({
            name: '',
            description: '',
            rate: '',
            quantity: '',
        });
        let subtotalCalc = 0
        inactiveLineItems.forEach((item) => {
                subtotalCalc += (item.rate * item.quantity)
        })
        setState({
            ...state,
            invoiceItems: inactiveLineItems,
            subtotal: subtotalCalc
        })
        console.log(activeLineItem)
    }, [numLineItems])

    return (
        <Grid style={{ height: "100vh"}} verticalAlign="middle" centered container>
            <Grid.Column style={{ maxWidth: 750 }}>
                <Grid>
                    <Grid.Row columns='equal' verticalAlign='middle'>
                        <Grid.Column width={12}>
                            <h1 style={{ marginTop: 20, marginBottom: 20 }}>New Invoice</h1>
                        </Grid.Column>
                        <Grid.Column width={2} floated='right' textAlign='right'>
                            <Link to="/dashboard"><Button>Cancel</Button></Link>
                        </Grid.Column>
                        <Grid.Column width={2} floated='right' textAlign='right'>
                            <Button form='new-invoice' type='submit' color='green'>Send</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Segment raised>
                <Form id='new-invoice' autoComplete="off" onSubmit={handleSubmit}>
                    <Grid stackable padded>
                        <Grid.Row columns={3}>
                            <Grid.Column>
                                <Form.Input
                                    type="number"
                                    name="invoiceNum"
                                    placeholder="Invoice Number"
                                    label="Invoice Number"
                                    value={state.invoiceNum}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Input
                                    type="date"
                                    name="issueDate"
                                    label="Date of Issue"
                                    value={state.issueDate}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Input
                                    type="date"
                                    name="dueDate"
                                    label="Due Date"
                                    value={state.dueDate}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={3}>
                            <Grid.Column>
                                <Form.Select
                                    fluid
                                    selection
                                    search
                                    name="stripeCustomerId"
                                    placeholder="Client"
                                    label="Billed To"
                                    options={clientOptions}
                                    onChange={handleSelectChange}
                                    required
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Input
                                    type="text"
                                    name="reference"
                                    placeholder="Enter value (e.g. PO #)"
                                    label="Reference"
                                    value={state.reference}
                                    onChange={handleChange}
                                />
                            </Grid.Column>
                            <Grid.Column textAlign='right'>
                                <div className='field'>
                                    <label>Amount Due</label>
                                    <h1 style={{ marginTop: 0 }}>${state.subtotal.toFixed(2)}</h1>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                        <Grid.Row columns='equal'>
                                <Table color='green' >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell width={10}>Description</Table.HeaderCell>
                                            <Table.HeaderCell textAlign='right' width={2}>Rate</Table.HeaderCell>
                                            <Table.HeaderCell textAlign='right' width={2}>Qty</Table.HeaderCell>
                                            <Table.HeaderCell textAlign='right' width={2}>Total</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {inactiveLineItems.map((item, i) => {
                                            return (
                                                <InactiveLineItem 
                                                    key={i}
                                                    name={item.name}
                                                    description={item.description}
                                                    rate={item.rate}
                                                    quantity={item.quantity}
                                                />
                                            )
                                        })}
                                    </Table.Body>
                                </Table>
                        </Grid.Row>
                        <Segment color='green'>
                            <ActiveLineItem
                                name={activeLineItem.name}
                                description={activeLineItem.description}
                                rate={activeLineItem.rate}
                                quantity={activeLineItem.quantity}
                                onChange={handleActiveLineItemChange}
                            />
                            <Divider hidden />
                            {numLineItems.value <= 25 &&
                                <Button type='button' color='green' fluid onClick={handleAddLineItem}>
                                    Add Line Item
                                </Button>
                            }
                            {numLineItems.value > 25 &&
                                <Button fluid disabled>
                                    You've reached the maximum number of line items.
                                </Button>
                            }
                        </Segment>
                    </Grid>
                    {error ? <ErrorMessage error={error} /> : null}
                <Divider hidden />
                <Divider />
                <Grid padded>
                    <Grid.Row>
                    <Grid.Column width={8}>
                        <Form.TextArea
                            name="notes"
                            placeholder="Enter any notes or payment details here."
                            label="Notes"
                            value={state.notes}
                            onChange={handleChange}
                        />
                        <Form.TextArea
                            name="terms"
                            placeholder="Enter your terms and conditions."
                            label="Terms"
                            value={state.terms}
                            onChange={handleChange}
                        />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Table basic='very' textAlign='right'>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Subtotal</Table.Cell>
                                    <Table.Cell>${state.subtotal.toFixed(2)}</Table.Cell>
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
                                    <Table.Cell><h3>${state.subtotal.toFixed(2)}</h3></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )

}