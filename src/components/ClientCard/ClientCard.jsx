import React from 'react';
import { Card, Image, Icon, Button, Divider } from 'semantic-ui-react';

export default function ClientCard({ user, client }) {

    return (
        <Card 
            href={`/clients/${client.id}`}
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
                <Card.Header>{client.name}</Card.Header>
                <Card.Meta>{client.metadata.company}</Card.Meta>
                <Card.Description style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    <Icon name="mail"></Icon>{client.email}
                </Card.Description>
                { client.phone &&       
                    <Card.Description>
                        <Icon name="phone"></Icon> {client.phone}
                    </Card.Description>
                }
            </Card.Content>
            <Card.Content>
                <h3>Balance: ${client.balance / 100}</h3>
            </Card.Content>
        </Card>
    )

}
