import React from 'react';
import { Table } from 'semantic-ui-react';

export default function InvoiceRow({ user, invoice }) {

    return (
        <Table.Row>
            <Table.Cell>{invoice.clientId} {invoice.lastName}</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{new Date(invoice.issueDate).toLocaleDateString()}</Table.Cell>
            <Table.Cell>Amount</Table.Cell>
        </Table.Row>
    )

}