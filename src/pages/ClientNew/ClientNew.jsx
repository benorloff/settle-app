import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Header';
import CreateClientForm from '../../components/CreateClientForm/CreateClientForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from "../../components/Loader/Loader";

export default function ClientNew({ user, handleLogout }) {
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleCreateClient(formData) {
        try {
            setLoading(true);
            // const data = await invoiceApi.create(invoice);
            setLoading(false);
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
            <CreateClientForm user={user} handleCreateClient={handleCreateClient} />
        </>
    )

}