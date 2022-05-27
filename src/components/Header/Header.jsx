import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Menu, Image, Button, Container } from 'semantic-ui-react';

export default function Header({ user, handleLogout }){
    return(
        <Menu>
            <Menu.Item>
                <Link to="/dashboard">
                    <h2>Settle</h2>
                </Link>
            </Menu.Item>
            <Menu.Menu position='right'>
                { user && (
                    <>
                        <Dropdown item floating text='New' color='green'>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Link to="/invoice/new">Invoice</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link to="/client/new">Client</Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Item item >
                            <Image src={user.photoUrl} avatar />
                        </Menu.Item>
                        <Dropdown item icon='caret down'>
                            <Dropdown.Menu>
                                <Dropdown.Item icon='dollar' text='Invoices' />
                                <Dropdown.Item icon='users' text='Clients' />
                                <Dropdown.Divider />
                                <Dropdown.Item icon='log out' text='Log Out' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                )}
                { !user && (
                    <>
                        <Menu.Item>
                            <Link to="/login">
                                <h2>Log In</h2>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/signup">
                                <h2>Sign Up</h2>
                            </Link>
                        </Menu.Item>
                    </>
                )}
            </Menu.Menu>
        </Menu>
    )
}