import React from 'react'
import s from './OneMeal.module.css'


function OneMeal({ data }) {
    const path = Number(window.location.pathname.split("/").pop())
    const meal = data.find(({ id }) => id === path)

  return (
    <div className={s.container}>
        <div className={s.img}>
            <img src={meal.img} alt="pic" />
        </div>
        <div className={s.text}>
            <div className={s.title}>{meal.name}</div>
            <div className={s.ingr}>{meal.ingredients}</div>
        </div>
        <div className={s.recipe}>{meal.recipe}</div>
    </div>
  )
}

export default OneMeal