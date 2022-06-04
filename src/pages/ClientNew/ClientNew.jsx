import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import CreateClientForm from '../../components/CreateClientForm/CreateClientForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from "../../components/Loader/Loader";

import clientApi from "../../utils/clientApi";

export default function ClientNew({ user, handleLogout }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    console.log(user)

    async function handleCreateClient(client) {
        try {
            await clientApi.create(client);
            navigate('/clients');
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