import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loading from '../../components/Loader/Loader';
import { Button, Form, Grid, Segment, Divider } from 'semantic-ui-react';

export default function CreateClientForm({ user, handleCreateClient }){
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        company: '',
        role: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    })

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        console.log(state)
    }

    async function handleSubmit(e){
        e.preventDefault();
        // const formData = new FormData()
        // for (let key in state){
        //     formData.append(key, state[key])
        // }
        handleCreateClient(state);
    }

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <Grid style={{ height: "100vh"}} centered container>
            <Grid.Column style={{ maxWidth: 600 }}>
                <Grid>
                    <Grid.Row columns='equal' verticalAlign='middle'>
                        <Grid.Column width={10}>
                            <h1 style={{ marginTop: 20, marginBottom: 20 }}>New Client</h1>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Button>Cancel</Button>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Button>Save</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Segment raised>
                <Form autoComplete="off" onSubmit={handleSubmit} style={{ border: 1 }} >
                    <Grid padded stackable>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Form.Input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    label="First Name"
                                    value={state.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    label="Last Name"
                                    value={state.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Form.Input
                                    type="text"
                                    name="company"
                                    placeholder="Company Name"
                                    label="Company"
                                    value={state.company}
                                    onChange={handleChange}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Input
                                    type="text"
                                    name="role"
                                    placeholder="Role/Title"
                                    label="Role/Title"
                                    value={state.role}
                                    onChange={handleChange}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Divider fitted style={{ marginTop: 0, marginBottom: 0 }} />
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Form.Input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    label="Email"
                                    value={state.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Input
                                    type="phone"
                                    name="phone"
                                    placeholder="Phone"
                                    label="Phone"
                                    value={state.phone}
                                    onChange={handleChange}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Divider fitted style={{ marginTop: 0, marginBottom: 0 }} />
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Input
                                    type="text"
                                    name="address1"
                                    placeholder="Address 1"
                                    label="Address 1"
                                    value={state.address1}
                                    onChange={handleChange}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Input
                                    type="text"
                                    name="address2"
                                    placeholder="Address 2"
                                    label="Address 2"
                                    value={state.address2}
                                    onChange={handleChange}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns='equal'>
                            <Grid.Column width={8}>
                                <Form.Input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    label="City"
                                    value={state.city}
                                    onChange={handleChange}
                                />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Form.Input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    label="State"
                                    value={state.state}
                                    onChange={handleChange}
                                />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Form.Input
                                    type="text"
                                    name="zipCode"
                                    placeholder="ZIP Code"
                                    label="ZIP Code"
                                    value={state.zipCode}
                                    onChange={handleChange}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    label="Country"
                                    value={state.country}
                                    onChange={handleChange}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Button type='submit'>Save</Button>
                    {error ? <ErrorMessage error={error} /> : null}
                </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )

}