import React, { useEffect, useState } from 'react'
import s from './OneMeal.module.css'
import { API } from '../../../../utils/useAxios'
import ReactPlayer from 'react-player';


function OneMeal({ data }) {


    window.scrollTo(0, 0)

    const [ingr, setIngr] = useState([]);
    const [ingrMeasure, setIngrMeasure] = useState([]);

    const path = Number(window.location.pathname.split("/").pop())
    const meal = data.find(({ id }) => id === path)

    const getIngredients = async () => {
      await API.get("ingredients/")
        .then((res) => {
          setIngr(res.data);
        })
        .catch(console.error);
    }

    const getIngredientsMeasures = async () => {
      await API.get("ingredient_measures/")
        .then((res) => {
          setIngrMeasure(res.data);
        })
        .catch(console.error);
    }

    useEffect(() => {
      getIngredients();
      getIngredientsMeasures()
    }, []);




  return (
    <div className={s.container}>
      <div className={s.img}>
        <img src={meal.img} alt="pic" />
      </div>
      <div className={s.text}>
        <div className={s.title}>{meal.name}</div>
        <div className={s.ingr}>
          {meal.ingredients?.map((e) => (
            <li key={e} className={s.ingr_item}>
              {ingr.find((o) => o.id === e)?.name}
              <p key={e.id}>{ingrMeasure.find(o => o.ingredient_id === e)?.description}</p>
            </li>
          ))}
        </div>
      </div>
      <div className={s.recipe}>{meal.recipe}</div>
      {meal && <ReactPlayer className={s.player} controls url={meal?.video}/>}
    </div>
  );
}

export default OneMeal