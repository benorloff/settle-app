import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

export default function InvoiceRow({ user, invoice }) {

    const date = new Date(invoice.created * 1000)
    const issueDate = date.toLocaleDateString()

    return (
        <Table.Row>
            <Table.Cell><b>{invoice.customer_name}</b><br />{ invoice.number ? invoice.number : 'Draft' }</Table.Cell>
            <Table.Cell>{invoice.description ? invoice.description : invoice.lines.data[0].description}</Table.Cell>
            <Table.Cell>{issueDate}</Table.Cell>
            <Table.Cell>${invoice.total / 100}</Table.Cell>
        </Table.Row>
    )

}