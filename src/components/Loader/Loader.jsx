import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

export default function Loading() {
    return(
        <Segment textAlign='center' style={{ height: '100vh' }} vertical={true}>
            <Dimmer active inverted>
                <Loader inverted size='big'>Loading</Loader>
            </Dimmer>
        </Segment>
    )
}