import React, { useEffect, useState } from 'react'
import s from './OneMeal.module.css'
import { API } from '../../../../utils/useAxios'


function OneMeal({ data }) {
    const [ingr, setIngr] = useState([]);

    const path = Number(window.location.pathname.split("/").pop())
    const meal = data.find(({ id }) => id === path)

    const getIngredients = async () => {
      await API.get("ingredients/")
        .then((res) => {
          setIngr(res.data);
        })
        .catch(console.error);
    }

    useEffect(() => {
      getIngredients();
    }, []);


  return (
    <div className={s.container}>
        <div className={s.img}>
            <img src={meal.img} alt="pic" />
        </div>
        <div className={s.text}>
            <div className={s.title}>{meal.name}</div>
            <div className={s.ingr}>{meal.ingredients?.map(e => <li key={e}>{ingr.find(o => o.id === e)?.name}</li>)}</div>
        </div>
        <div className={s.recipe}>{meal.recipe}</div>
    </div>
  )
}

export default OneMeal