import React from 'react';
import { Grid, Form } from 'semantic-ui-react';


export default function LineItem({ key, name, description, rate, quantity, handleChange}) {

    return(
        <Grid.Row columns='equal'>
            <Grid.Column width={10}>
                <Form.Input
                    style={{ height: 30 }}
                    type="text"
                    name="name"
                    placeholder="Item Name"
                    value={name}
                    onChange={handleChange}
                />
                <Form.Input
                    style={{ height: 30 }}
                    type="text"
                    name="description"
                    placeholder="Item Description"
                    value={description}
                    onChange={handleChange}
                />
            </Grid.Column>
            <Grid.Column width={2} textAlign='right'>
                <Form.Input
                    style={{ height: 30 }}
                    type="number"
                    name="rate"
                    value={rate}
                    onChange={handleChange}
                />
            </Grid.Column>
            <Grid.Column width={2} textAlign='right'>
                <Form.Input
                    style={{ height: 30 }}
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={handleChange}
                />  
            </Grid.Column>
            <Grid.Column width={2} textAlign='right'>
                <Form.Input
                    style={{ height: 30 }}
                    type="number"
                    name="subtotal"
                    value={rate * quantity}
                    onChange={handleChange}
                />
            </Grid.Column>
        </Grid.Row>
    )
}