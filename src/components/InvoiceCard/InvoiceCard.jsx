import React from 'react';
import { Card, Image, Icon, Button, Divider } from 'semantic-ui-react';
import invoiceApi from '../../utils/invoiceApi';

export default function InvoiceCard({ user, invoice }) {

    const issueDate = new Date(invoice.issueDate)
    const issueDateStr = issueDate.toLocaleDateString()

    

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
                <Card.Meta>{issueDateStr}</Card.Meta>
                <Card.Description style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    Invoice #: {invoice.invoiceNum}
                </Card.Description>
                { invoice.phone &&       
                    <Card.Description>
                        <Icon name="phone"></Icon> {invoice.phone}
                    </Card.Description>
                }
            </Card.Content>
            <Card.Content>
                <Card.Header>
                    {invoice.amountDue}
                </Card.Header>
            </Card.Content>
        </Card>
    )

}
