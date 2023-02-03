import React, { useEffect, useState } from 'react'
import Sort from './Sort/Sort'
import axios from 'axios';
import MealsList from './MealsLIst/MealsList';
import './Meals.css'

function Meals() {
  const options = [
    'All', 'Can be cooked', 'Michaeldog'
  ];

  const [data, setData] = useState();
  const [dataMap, setDataMap] = useState([])
  const [sort, setSort] = useState(options[0]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://63dbfdc1a3ac95cec5af619c.mockapi.io/cook/meals',
      );
      setData(result.data)
      setDataMap(result.data)
    };
    fetchData();
  }, []);

  useEffect(() => {
    switch (sort) {
      case options[0]:
        setDataMap(data)
        break;
      case options[1]:
        setDataMap(data.filter(e => e.can === true))
        break
      case options[2]:
        setDataMap([])
        break
    
      default:
        break;
    }
    
  }, [sort]);

  return (
    <div>
        <Sort options={options} sort={sort} set={setSort}/>
        <div className='meals_grid'>
          {dataMap?.map(e => <MealsList key={e.id} img={e.img} title={e.name}/>)}
        </div>
    </div>
  )
}

export default Meals