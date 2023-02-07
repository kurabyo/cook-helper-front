import React from "react";
import s from "./MealsList.module.css";

export default function MealsList(props) {

  return (
    <div className={s.card}>
      <img className={s.card_image} src={props.obj.img} alt="Logo" />
      <div className={s.card_header}>
          <h5 className={s.card_title}>{props.title}</h5>
      </div>  
    </div>
  );
}