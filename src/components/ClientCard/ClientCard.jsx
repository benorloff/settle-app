import React from 'react';
import { Card, Image, Icon, Button, Divider } from 'semantic-ui-react';

export default function ClientCard({ user, client }) {

    return (
        <Card 
            href='#'
            color='blue'
        >
            <Card.Content>
                <Image
                style={{ marginBottom: 20 }}
                floated='left'
                circular
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>{client.firstName} {client.lastName}</Card.Header>
                <Card.Meta>{client.company}</Card.Meta>
                <Card.Description style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {client.email}
                </Card.Description>
                { client.phone &&       
                    <Card.Description>
                        <Icon name="phone"></Icon> {client.phone}
                    </Card.Description>
                }
            </Card.Content>
        </Card>
    )

}
