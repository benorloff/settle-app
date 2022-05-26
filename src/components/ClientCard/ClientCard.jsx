import React from 'react';
import { Card, Image, Button} from 'semantic-ui-react';

export default function ClientCard({ user, client }) {

    return (
        <Card>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>{client.firstName} {client.lastName}</Card.Header>
                <Card.Meta>{client.email}</Card.Meta>
                <Card.Description>
                Steve wants to add you to the group <strong>best friends</strong>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                <Button basic color='green'>
                    Approve
                </Button>
                <Button basic color='red'>
                    Decline
                </Button>
                </div>
            </Card.Content>
        </Card>
    )

}
