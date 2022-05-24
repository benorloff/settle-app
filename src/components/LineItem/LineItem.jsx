import React from 'react';
import { Grid, Form } from 'semantic-ui-react';


export default function LineItem({ user, business }) {

    return(
        <Grid.Row columns='equal'>
            <Grid.Column width={10}>
                <Form.Input
                    style={{ height: 30 }}
                    type="text"
                    name="name"
                    placeholder="Item Name"
                    value={state.name}
                    onChange={handleChange}
                />
                <Form.Input
                    style={{ height: 30 }}
                    type="text"
                    name="description"
                    placeholder="Item Description"
                    value={state.description}
                    onChange={handleChange}
                />
            </Grid.Column>
            <Grid.Column width={2} textAlign='right'>
                <Form.Input
                    style={{ height: 30 }}
                    type="number"
                    name="rate"
                    value={state.rate}
                    onChange={handleChange}
                />
            </Grid.Column>
            <Grid.Column width={2} textAlign='right'>
                <Form.Input
                    style={{ height: 30 }}
                    type="number"
                    name="quantity"
                    value={state.quantity}
                    onChange={handleChange}
                />  
            </Grid.Column>
            <Grid.Column width={2} textAlign='right'>
                <Form.Input
                    style={{ height: 30 }}
                    type="text"
                    name="description"
                    value={state.description}
                    onChange={handleChange}
                />
            </Grid.Column>
        </Grid.Row>
    )
}