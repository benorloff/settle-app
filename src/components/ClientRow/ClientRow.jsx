import React from 'react';
import { Table } from 'semantic-ui-react';

export default function ClientRow({ user, client }) {

    return (
        <Table.Row>
            <Table.Cell><b>{client.name}</b><br />{client.metadata.company}</Table.Cell>
            <Table.Cell>{client.description}</Table.Cell>
            <Table.Cell>${client.balance / 100}</Table.Cell>
            <Table.Cell>Actions</Table.Cell>
        </Table.Row>
    )

}