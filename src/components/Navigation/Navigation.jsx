import React from 'react'
import s from './Navigation.module.css'

function Navigation() {
  return (
    <nav className={s.container}>
      <div className={s.links}> 
        <a className={s.item} href="#meals">Meals</a>  
        <a className={s.item} href="#ingrideants">Ingrideants</a>
      </div>

      <div className={s.profile}>
        My Profile
        <img src="https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg" alt="profilepic" />
      </div>

    </nav>
  )
}

export default Navigation