import React, { useState, useEffect } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LineItem from '../LineItem/LineItem';
import { Button, Form, Grid, Segment, Divider } from 'semantic-ui-react';

export default function CreateInvoiceForm(props){
    const [error, setError] = useState('')
    const [amountDue, setAmountDue] = useState('$0.00')
    const [lineItems, setLineItems] = useState([])
    const [state, setState] = useState({
        invoiceNum: '',
        issueDate: '',
        dueDate: '',
        reference: '',
        invoiceItems: [],
        notes: '',
        terms: '',
        attachments: [],
        businessId: '',
        userId: '',
        clientId: '',
        contactId: ''
    })

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData()
        for (let key in state){
            formData.append(key, state[key])
        }
        props.handleCreateInvoice(formData);
    }

    useEffect(() => {
        function getDate() {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            setState({ 
                ...state,
                issueDate: `${year}-${month < 10 ? '0' + (month + 1) : (month + 1)}-${day < 10 ? '0' + day : day}`, 
                dueDate: `${year}-${month < 10 ? '0' + (month + 1) : (month + 1)}-${day < 10 ? '0' + day : day}`
            })
        }
        getDate();
    }, [])

    return (
        <Grid style={{ height: "100vh"}} verticalAlign="middle" centered container>
            <Grid.Column style={{ maxWidth: 750 }}>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Grid stackable>
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
                                    name="contactId"
                                    placeholder="Client Contact"
                                    label="Billed To"
                                    value={state.clientId}
                                    onChange={handleChange}
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
                                    <h1 style={{ marginTop: 0 }}>{amountDue}</h1>
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
                                    <label>Line Total</label>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        {lineItems.map((item) => {
                            return (
                                <LineItem
                                    item={item}
                                    key={item._id}
                                />
                            )
                        })}
                    </Grid>
                    {error ? <ErrorMessage error={error} /> : null}
                </Form>
            </Grid.Column>
        </Grid>
    )

}