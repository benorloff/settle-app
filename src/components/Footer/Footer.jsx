import React from 'react';
import { Segment, Container, Grid } from 'semantic-ui-react';

export default function Footer() {

    return(
        <Segment inverted vertical style={{ padding: '2em 5em' }}>
            <Container>
                <Grid inverted centered>
                    <Grid.Row>
                        <Grid.Column>
                            Copyright Settle. All Rights Reserved.
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    )
}