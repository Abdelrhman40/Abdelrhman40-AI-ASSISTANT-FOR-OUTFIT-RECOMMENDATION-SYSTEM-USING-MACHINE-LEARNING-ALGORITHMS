import React from 'react'
import logo from '../../logo.png'
import {Link} from 'react-router-dom'
// import { useSelector } from 'react-redux'

export default function Navbar(props) {
    // const state = useSelector((state)=> state.handleCart);  
  return (
    <>
        <nav class="navbar navbar-expand-lg position-fixed w-100  blur">
        <div class="container">
            <Link class="navbar-brand" to='/'><img src={logo} alt="logo" className='w-25' /></Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav  ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <Link class="nav-link nav-color active" aria-current="page" to="/home">Home</Link>
                </li>
                <li class="nav-item">
                <Link class="nav-link nav-color active" aria-current="page" to="/about">About</Link>
                </li>
                
                <li class="nav-item">
                <Link class="nav-link nav-color active" aria-current="page" to='/features'>Features</Link>
                </li>
                {props.user?<>
                  <li class="nav-item">
                <Link class="nav-link nav-color active" aria-current="page" to='/clothestypes'>Clothss types</Link>
                </li>
                <li class="nav-item dropdown">
                    <Link className="nav-link nav-color dropdown-toggle" to='/features' id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Features List
                    </Link>
                      <ul class="dropdown-menu bg-transparent border-0" aria-labelledby="navbarDropdownMenuLink">
                        <li><Link class="dropdown-item w-75 nav-color rounded-3" to="/sizepage">Size Prediction</Link></li>
                        <li><Link class="dropdown-item w-50 nav-color rounded-3" to='/clothestypes'>Cloths types</Link></li>
                        <li><Link class="dropdown-item w-100 nav-color rounded-3" to="/cloths_recommendation">cloths Recommendition</Link></li>
                        <li><Link class="dropdown-item w-100 nav-color rounded-3" to="/colors_recommendation" href="#">colors Recommendition</Link></li>
                      </ul>
                </li>
                </>:''}
                {props.user?<>
                <div>
                  <li class="nav-item dropdown">
                    <Link className="nav-link nav-color" to='/features' id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fa-solid fa-user"></i>
                    </Link>
                      <ul class="dropdown-menu bg-transparent border-0" aria-labelledby="navbarDropdownMenuLink">
                        <li><Link class="dropdown-item w-75 nav-color rounded-3" to="/userpage">Profile</Link></li>
                        {props.user.role=="admin"?
                        <div>
                          <li class="nav-item">
                            <Link class="dropdown-item w-75 nav-color rounded-3" na aria-current="page" to='/dashboard' ><i class="fa-solid fa-table-columns"></i> Dashboard</Link>
                          </li>
                        </div>
                        :null}
                        <li class="nav-item">
                          <button class="dropdown-item w-75 nav-color rounded-3" na aria-current="page" onClick={props.logOut}> <i class="fa-solid fa-circle-right me-1"></i>Logout</button>
                        </li>
                      </ul>
                  </li>
                  </div>
                </>:
                <>
                  <li class="nav-item">
                  <Link class="nav-link nav-color active" aria-current="page" to='/login'><i class="fa-solid fa-right-to-bracket me-1"></i> Login</Link>
                  </li>
                  <li class="nav-item">
                  <Link class="nav-link nav-color active" aria-current="page" to='/register'><i class="fa-solid fa-user-plus me-1"></i> Register</Link>
                  </li>
                  </>
                }
                
                  
            </ul>
            </div>
        </div>
        </nav>
    </>
  )
}
