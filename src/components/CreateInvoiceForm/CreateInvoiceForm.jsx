import React, { useState, useEffect } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import InactiveLineItem from '../InactiveLineItem/InactiveLineItem';
import ActiveLineItem from '../ActiveLineItem/ActiveLineItem';
import { Button, Form, Grid, Segment, Divider, Table } from 'semantic-ui-react';

export default function CreateInvoiceForm(props){
    const [error, setError] = useState('')
    const [numLineItems, setNumLineItems] = useState({value: 1})
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
        subtotal: '',
        tax: '',
        total: '',
        amountPaid: '',
        amountDue: '',
        attachments: [],
        userId: props.user._id,
        clientId: '',
    })

    const clientOptions = props.clients.map((client) => ({
        text: `${client.firstName} ${client.lastName}`,
        value: client._id,
        key: client._id
    }))
    
    // const [selectState, setSelectState] = useState({
    //     search: true,
    //     value: [],
    //     options: clientOptions
    // })

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
            clientId: data.value
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
        console.log(clientOptions, '<-clientOptions')
    }, [])

    useEffect(() => {
        setActiveLineItem({
            name: '',
            description: '',
            rate: '',
            quantity: '',
        });
        async function subtotal() {
            let subtotal = 0
            await inactiveLineItems.forEach((item) => {
                subtotal += (item.rate * item.quantity)
            })
            console.log(subtotal, '<-sum from subtotal function')
            return subtotal;
        }
        setState({
            ...state,
            invoiceItems: inactiveLineItems
        })
        console.log(activeLineItem)
    }, [numLineItems])

    return (
        <Grid style={{ height: "100vh"}} verticalAlign="middle" centered container>
            <Grid.Column style={{ maxWidth: 750 }}>
                <Grid>
                    <Grid.Row columns='equal' verticalAlign='middle'>
                        <Grid.Column width={10}>
                            <h1 style={{ marginTop: 20, marginBottom: 20 }}>New Invoice</h1>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Button>button</Button>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Button type='submit'>Send</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Segment raised>
                <Form autoComplete="off" onSubmit={handleSubmit}>
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
                                    name="clientId"
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
                                    <h1 style={{ marginTop: 0 }}>$0.00</h1>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                        <Grid.Row columns='equal'>
                            <Grid.Column width={10}>
                                <div className='field'>
                                    <label>Description</label>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={2} textAlign='right'>
                                <div className='field'>
                                    <label>Rate</label>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={2} textAlign='right'>
                                <div className='field'>
                                    <label>Qty</label>
                                </div>  
                            </Grid.Column>
                            <Grid.Column width={2} textAlign='right'>
                                <div className='field'>
                                    <label>Total</label>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider fitted />
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
                        <ActiveLineItem
                            name={activeLineItem.name}
                            description={activeLineItem.description}
                            rate={activeLineItem.rate}
                            quantity={activeLineItem.quantity}
                            onChange={handleActiveLineItemChange}
                        />
                    </Grid>
                    <Button type='submit'>Send</Button>
                    {error ? <ErrorMessage error={error} /> : null}
                </Form>
                <Divider hidden />
                {numLineItems.value <= 25 &&
                    <Button fluid onClick={handleAddLineItem}>
                        Add Line Item
                    </Button>
                }
                {numLineItems.value > 25 &&
                    <Button fluid disabled>
                        You've reached the maximum number of line items.
                    </Button>
                }
                <Divider />
                <Grid padded>
                    <Grid.Column floated='right' width={8}>
                        <Table basic='very' textAlign='right'>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Subtotal</Table.Cell>
                                    <Table.Cell>${state.subtotal ? state.subtotal : '0.00'}</Table.Cell>
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
                                    <Table.Cell><h3>$0.00</h3></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
                </Segment>
            </Grid.Column>
        </Grid>
    )

}