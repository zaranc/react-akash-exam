import React from 'react'
import { nav } from './navData'
import { Link } from 'react-router-dom'

const UserNavbar = () => {
    let handleLogout = () => {

        window.location.href = '/'
        localStorage.clear()
        window.location.reload();
      }
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">

                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                       

                       <Link to="/productuser">
                       <li class="nav-item">
                            <a class="nav-link" href="">HOME</a>
                        </li>
                       </Link>
                      
                      
                       
                        <li class="nav-link">

                            <a onClick={handleLogout}>
                                <i class="bx bx-log-out icons"></i>
                                <span class="text nav-text">Log Out</span>
                            </a>

                        </li>


                    </ul>

                </div>
            </nav>




        </div>
    )
}

export default UserNavbar
