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
                        <Menu.Item item>
                            <Dropdown text='New' className='green' button pointing>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Link to="/invoice/new">Invoice</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Link to="/client/new">Client</Link>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                        <Menu.Item item >
                            <Image src={user.photoUrl} avatar />
                        </Menu.Item>
                        <Dropdown item icon='caret down'>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Link to="/dashboard">Dashboard</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link to="/invoices">Invoices</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link to="/clients">Clients</Link>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>
                                    Logout
                                </Dropdown.Item>
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