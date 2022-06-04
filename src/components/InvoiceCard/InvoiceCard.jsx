import React from 'react';
import { Card, Image, Icon, Button, Divider } from 'semantic-ui-react';

export default function InvoiceCard({ user, invoice }) {

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
                <Card.Header>{invoice.clientId.firstName} {invoice.clientId.lastName}</Card.Header>
                <Card.Meta>{invoice.company}</Card.Meta>
                <Card.Description style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {invoice.email}
                </Card.Description>
                { invoice.phone &&       
                    <Card.Description>
                        <Icon name="phone"></Icon> {invoice.phone}
                    </Card.Description>
                }
            </Card.Content>
        </Card>
    )

}
