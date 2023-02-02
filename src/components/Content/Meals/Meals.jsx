import React, { useEffect, useState } from 'react'
import Sort from './Sort/Sort'
import axios from 'axios';
import MealsList from './MealsLIst/MealsList';
import './Meals.css'

function Meals() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://63dbfdc1a3ac95cec5af619c.mockapi.io/cook/meals',
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  console.log(data)

  return (
    <div>
        <Sort />
        <div className='meals_grid'>
          {data?.map(e => <MealsList key={e.id} img={e.img} title={e.name}/>)}
        </div>
    </div>
  )
}

export default Meals