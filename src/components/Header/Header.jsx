import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default function Header({ user, handleLogout }){
    return(
        <Menu stackable>
            <Menu.Item>
                <Link to="/dashboard">
                    <h2>Logo</h2>
                </Link>
            </Menu.Item>
            <Menu.Menu position='right'>
                { user && (
                    <>
                        <Menu.Item onClick={handleLogout}>
                            <h2>Logout</h2>
                        </Menu.Item>
                        <Menu.Item>
                            <h2>Dropdown</h2>
                        </Menu.Item>
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