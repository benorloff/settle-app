import React from 'react';
import { Grid } from 'semantic-ui-react';

export default function InactiveLineItem({ key, name, description, rate, quantity }) {
    return(
        <Grid.Row columns='equal' key={key}>
            <Grid.Column width={10}>
                {name}
                {description}
            </Grid.Column>
            <Grid.Column width={2} textAlign='right'>
                <p>{rate}</p>
            </Grid.Column>
            <Grid.Column width={2} textAlign='right'>
                <p>{quantity}</p>
            </Grid.Column>
            <Grid.Column width={2} textAlign='right'>
                <p>{rate * quantity}</p>
            </Grid.Column>
        </Grid.Row>
    )
}