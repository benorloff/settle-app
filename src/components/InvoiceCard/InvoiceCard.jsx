import React from 'react';
import { Card, Image, Icon, Button, Divider } from 'semantic-ui-react';
import invoiceApi from '../../utils/invoiceApi';

export default function InvoiceCard({ user, invoice }) {

    const issueDate = new Date(invoice.created * 1000) 
    const issueDateStr = issueDate.toLocaleDateString()

    return (
        <Card 
            href={`/invoices/${invoice.id}`}
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
                <Card.Header>{invoice.customer_name}</Card.Header>
                <Card.Meta>{issueDateStr}</Card.Meta>
                <Card.Description style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {invoice.number}
                </Card.Description>
            </Card.Content>
            <Card.Content>
                <Card.Header>
                    ${invoice.total / 100}
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <Card.Header>
                    {invoice.status}
                </Card.Header>
            </Card.Content>
        </Card>
    )

}
