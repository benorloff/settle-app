import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';

export default function InactiveLineItem({ key, name, description, rate, quantity }) {
    return(
        <>
            <Grid.Row columns='equal' key={key}>
                <Divider hidden />
                <Grid.Column width={10}>
                    <p style={{ fontWeight: 700 }}>{name}</p>
                    <p>{description}</p>
                </Grid.Column>
                <Grid.Column width={2} textAlign='right'>
                    <p>${rate}</p>
                </Grid.Column>
                <Grid.Column width={2} textAlign='right'>
                    <p>{quantity}</p>
                </Grid.Column>
                <Grid.Column width={2} textAlign='right'>
                    <p style={{ fontWeight: 700 }}>${rate * quantity}</p>
                </Grid.Column>
            </Grid.Row>
            <Divider fitted />
        </>
    )
}