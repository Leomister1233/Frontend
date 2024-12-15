import React from 'react'
import {Link} from 'react-router-dom'
import './Navigation.css'; 

function Navigation() {
    return (
        <nav>
            <div className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='container-fluid'>
                    <Link className='navbar-brand' to='/'>ADAD</Link>
                    <div className='collapse navbar-collapse'>
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                            <Link className='nav-link' to='/'>Home</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/books'>Books</Link>
                            </li>
                            <li className='nav-item dropdown'>
                                <Link className="nav-link dropdown-toggle" to="/users" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Users
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/users/:id">Users ID</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
