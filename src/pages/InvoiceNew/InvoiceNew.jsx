import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header';
import CreateInvoiceForm from '../../components/CreateInvoiceForm/CreateInvoiceForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from "../../components/Loader/Loader";
import invoiceApi from '../../utils/invoiceApi';
import clientApi from '../../utils/clientApi';

import { Grid } from 'semantic-ui-react';

export default function InvoiceNew({ user, business, handleLogout }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [clients, setClients] = useState([]);

    const navigate = useNavigate();

    async function getClients() {
        try {
            const data = await clientApi.getAll();
            setClients([...data.clients]);
        } catch (err) {
            console.log(err.message, "<- this is the error");
            setError(err.message);
        }
    }

    useEffect(() => {
        getClients()
    }, [])
    
    async function handleCreateInvoice(invoice) {
        try {
            setLoading(true);
            const data = await invoiceApi.create(invoice);
            setLoading(false);
            navigate('/dashboard')
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }

    if (error) {
        return (
            <>
                <Header user={user} handleLogout={handleLogout} />
                <ErrorMessage error={error} />
            </>
        )
    }

    if (loading) {
        return (
            <>
                <Header user={user} handleLogout={handleLogout} />
                <Loading />
            </>
        )
    }

    return (
        <>
            <Header user={user} handleLogout={handleLogout} />
            <CreateInvoiceForm user={user} clients={clients} handleCreateInvoice={handleCreateInvoice}/>
        </>
    )

}