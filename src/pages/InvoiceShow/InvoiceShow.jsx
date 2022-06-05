import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from "../../components/Loader/Loader";

import invoiceApi from '../../utils/invoiceApi';

export default function InvoiceShow({ user, handleLogout }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [invoice, setInvoice] = useState({});

    const { id } = useParams()

    async function getInvoice() {
        try {
            setLoading(true)
            const data = await invoiceApi.getOne(id);
            setInvoice(data);
            setLoading(false)
        } catch (err) {
            console.log(err.message, "<- this is the error");
            setError(err.message);
        }
    }

    useEffect(() => {
        getInvoice()
    }, [])

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
            {invoice.invoice.id}
        </>
    )

}