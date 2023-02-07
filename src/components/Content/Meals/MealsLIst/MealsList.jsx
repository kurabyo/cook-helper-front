import React, {useState, useEffect} from "react";
import s from "./MealsList.module.css";

export default function MealsList(props) {
  const [blobImg, setBlobImg] = useState(null);

  console.log(props)

  // useEffect(() => {
  //   fetch(props.obj?.img)
  //   //                         vvvv
  //   .then(response => console.log(response))
  //   // .then(imageBlob => {
  //   //     // Then create a local URL for that image and print it 
  //   //    setBlobImg(URL.createObjectURL(imageBlob))
  //   //     console.log(blobImg);
  //   //     console.log(imageBlob);
        
        
  //   // });

  // }, [])


  return (
    <div className={s.card}>
      <img className={s.card_image} src={blobImg} alt="Logo" />
      <div className={s.card_header}>
          <h5 className={s.card_title}>{props.title}</h5>
      </div>  
    </div>
  );
}