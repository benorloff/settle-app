import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment, Modal } from "semantic-ui-react";
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function SignUpPage(props) {

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

  const [error, setError] = useState('')
  const [state, setState] = useState({
    email: '',
    password: '',
    passwordConf: '',
    firstName: '',
    lastName: ''
  })
  const [selectedFile, setSelectedFile] = useState('/avatar-default.png')
  const [modalOpen, setModalOpen] = useState(false)

  const navigate = useNavigate()

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('photoUrl', selectedFile);
    for (let key in state){
      formData.append(key, state[key])
    }
    formData.forEach((item) => console.log(item), " <-- form data")
    try {
      await userService.signup(formData)
      props.handleSignUpOrLogin()
      navigate('/dashboard')
    } catch(err){
      setError(err.message)
    }
  }

  function handleFileInput(e){
    console.log(e.target.files, " <-- e.target.files");
    setSelectedFile(e.target.files[0])
    // const reader = new FileReader()
    // reader.addEventListener('load', () =>
    //   setSelectedFile(reader.result.toString() || ''),
    // )
    // reader.readAsDataURL(e.target.files[0])
    // console.log(selectedFile)
    // setModalOpen(true)
  }

  return (
    <>
      <Grid style={{ height: "100vh" }} verticalAlign="middle" centered>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            Sign Up
          </Header>
          {/* <Modal
            onClose={() => setModalOpen(false)}
            onOpen={() => setModalOpen(true)}
            modalOpen={modalOpen}
            trigger={<Button>Show Modal</Button>}
          >
            <Modal.Header>HEADER</Modal.Header>
            <Modal.Content>CONTENT</Modal.Content>
            <Modal.Actions>ACTIONS</Modal.Actions>
          </Modal> */}
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Segment stacked>
              {/* <Image src='/avatar-default.png' size='medium' circular /> */}
              <Form.Field>
                <Form.Input
                  type="file"
                  name="photoUrl"
                  placeholder="upload image"
                  onChange={handleFileInput}
                  required
                />
              </Form.Field>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  label="First Name"
                  value={state.firstName}
                  onChange={handleChange}
                  required
                />
                <Form.Input
                  fluid
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  label="Last Name"
                  value={state.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Input
                type="email"
                name="email"
                placeholder="Email"
                label="Email"
                value={state.email}
                onChange={handleChange}
                required
              />
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  name="password"
                  type="password"
                  placeholder="Password"
                  label="Password"
                  value={state.password}
                  onChange={handleChange}
                  required
                />
                <Form.Input
                  fluid
                  name="passwordConf"
                  type="password"
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  value={state.passwordConf}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button type="submit" className="btn">
                Create Account
              </Button>
            </Segment>
            {error ? <ErrorMessage error={error} /> : null}
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
}
