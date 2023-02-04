import React, { useEffect } from 'react'
import s from './OneMeal.module.css'
import ReactPlayer from 'react-player';

function OneMeal(props) {
    useEffect(() => {
        window.scrollTo({top: 0, left: 0});
    }, []);


  return (
    <div className={s.container}>
        <div className={s.img}>
            <img src={props.obj.img} alt="pic" />
        </div>
        <div className={s.text}>
            <div className={s.title}>{props.obj.name}</div>
            <div className={s.ingr}>{props.obj.ingredients}</div>
        </div>
        <div className={s.recipe}>{props.obj.recipe}</div>
        <ReactPlayer
            url={props.obj.video}
            controls={true}
        />
    </div>
  )
}

export default OneMeal