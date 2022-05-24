import React, { useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';

export default function CreateInvoiceForm(props){
    const [state, setState] = useState({})

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData()
        for (let key in state){
            formData.append(key, state[key])
        }
        props.handleCreateInvoice(formData);
    }

}