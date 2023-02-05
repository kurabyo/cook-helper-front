import React, { useEffect, useState } from 'react'
import Sort from './Sort/Sort'
import MealsList from './MealsLIst/MealsList';
import './Meals.css'
import { API } from '../../../utils/useAxios';
import { Link } from 'react-router-dom';

function Meals({ data }) {

  const options = [
    'All', 'Can be cooked', 'Michaeldog'
  ];

  // const componentDidMount = () => {
  //   // POST request using axios with error handling
  //   const article = { name: 'test post', recipe: 'lorem', img: null, video: "", category_id: null, user_id: 1 };
  //   API.post('/meals/', article)
  //       .then(response => console.log(response))
  //       .catch(error => {
  //           console.error('There was an error!', error);
  //       });
  // }


  return ( 
    <div>
      <Sort options={options} />
      <div className="meals_grid">
        {data?.map((e) => (
          <div key={e.id}>
            <MealsList
              obj={e}
              key={e.id}
              title={e.name}
            />
            <Link to={e.id.toString()}>{e.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meals