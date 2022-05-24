import React from 'react';
import { Grid, Form } from 'semantic-ui-react';


export default function LineItem({ item, user, business, handleChange }) {

    return(
        <Grid.Row columns='equal'>
            <Grid.Column width={10}>
                <Form.Input
                    style={{ height: 30 }}
                    type="text"
                    name="name"
                    placeholder="Item Name"
                    value={item.name}
                    onChange={handleChange}
                />
                <Form.Input
                    style={{ height: 30 }}
                    type="text"
                    name="description"
                    placeholder="Item Description"
                    value={item.description}
                    onChange={handleChange}
                />
            </Grid.Column>
            <Grid.Column width={2} textAlign='right'>
                <Form.Input
                    style={{ height: 30 }}
                    type="number"
                    name="rate"
                    value={item.rate}
                    onChange={handleChange}
                />
            </Grid.Column>
            <Grid.Column width={2} textAlign='right'>
                <Form.Input
                    style={{ height: 30 }}
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={handleChange}
                />  
            </Grid.Column>
            <Grid.Column width={2} textAlign='right'>
                <Form.Input
                    style={{ height: 30 }}
                    type="number"
                    name="subtotal"
                    value={item.subtotal}
                    onChange={handleChange}
                />
            </Grid.Column>
        </Grid.Row>
    )
}