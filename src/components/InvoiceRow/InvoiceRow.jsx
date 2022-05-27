import React from 'react';
import { Table } from 'semantic-ui-react';

export default function InvoiceRow({ user, invoice }) {

    return (
        <Table.Row>
            <Table.Cell>{invoice.firstName} {invoice.lastName}</Table.Cell>
            <Table.Cell>{invoice.company}</Table.Cell>
            <Table.Cell>Actions</Table.Cell>
        </Table.Row>
    )

}