import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";
import '../SignupPage/SignupPage.css'

export default function SignUpPage(props) {

  const [error, setError] = useState('')
  const [state, setState] = useState({
    email: '',
    password: '',
    passwordConf: '',
    firstName: '',
    lastName: ''
  })
  const [selectedFile, setSelectedFile] = useState('')

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
    console.log(formData.forEach((item) => console.log(item)), " <-- form data")
    try {
      await userService.signup(formData)
      props.handleSignUpOrLogin()
      navigate('/')
    } catch(err){
      setError(err.message)
    }
  }

  function handleFileInput(e){
    console.log(e.target.files, " <-- e.target.files");
    setSelectedFile(e.target.files[0])
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              type="text"
              name="firstName"
              placeholder="First Name"
              label="First Name"
              value={state.firstName}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              label="Last Name"
              value={state.lastName}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="Email"
              label="Email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="Password"
              label="Password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              label="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photoUrl"
                placeholder="upload image"
                onChange={handleFileInput}
                required
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}
