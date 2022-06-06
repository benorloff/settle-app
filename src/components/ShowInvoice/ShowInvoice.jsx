import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InactiveLineItem from '../InactiveLineItem/InactiveLineItem';
import { Button, Grid, Segment, Divider, Table } from 'semantic-ui-react';

export default function ShowInvoice({ user, invoice }){
    const [numLineItems, setNumLineItems] = useState({value: 0})
    const [inactiveLineItems, setInactiveLineItems] = useState([])

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
                </Grid.Column>
            </Grid>
            <Grid>

            </Grid>
        </>
    )
}