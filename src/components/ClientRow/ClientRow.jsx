import React from 'react';
import { Table } from 'semantic-ui-react';

export default function ClientRow({ user, client }) {

    return (
        <Table.Row>
            <Table.Cell>{client.firstName} {client.lastName}</Table.Cell>
            <Table.Cell>{client.company}</Table.Cell>
            <Table.Cell>Actions</Table.Cell>
        </Table.Row>
    )

}