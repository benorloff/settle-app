import React from 'react';
import { Table } from 'semantic-ui-react';

export default function InactiveLineItem({ key, name, description, rate, quantity }) {
    return(
            <Table.Row columns='equal' key={key}>
                <Table.Cell width={10}>
                    <span style={{ fontWeight: 700 }}>{name}</span> | <span>{description}</span>
                </Table.Cell>
                <Table.Cell width={2} textAlign='right'>
                    <p>${rate}</p>
                </Table.Cell>
                <Table.Cell width={2} textAlign='right'>
                    <p>{quantity}</p>
                </Table.Cell>
                <Table.Cell width={2} textAlign='right'>
                    <p style={{ fontWeight: 700 }}>${rate * quantity}</p>
                </Table.Cell>
            </Table.Row>
    )
}