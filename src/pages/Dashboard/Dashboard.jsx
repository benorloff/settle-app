import React from 'react';
import Header from "../../components/Header/Header";
import { Grid } from 'semantic-ui-react';

export default function Dashboard({ user, handleLogout }) {
    return (
        <>
            <Header user={user} handleLogout={handleLogout} />
        </>
    )
}