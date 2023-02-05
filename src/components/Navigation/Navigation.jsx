import React from 'react'
import s from './Navigation.module.css'
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from '../../context/AuthContext';

function Navigation() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className={s.container}>
      <div className={s.links}> 
        <Link className={s.item} to='/meals'>Meals</Link>
        {user && <Link className={s.item} to='/ingredients'>Ingredients</Link>}         
      </div>
      <div className={s.profile}>
      {user ? (
            <>
              <Link to="/">Home</Link> 
              <div className={s.logout} onClick={logoutUser}>Logout</div>
              <img src="https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg" alt="profilepic" />
            </>
          ) : (
            <>
              <Link className={s.login} to="/login">Login</Link>
              <Link className={s.register} to="/register">Register</Link>
            </>
          )}
      </div>

    </nav>
  )
}

export default Navigation