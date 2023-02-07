import React from 'react'
import Sort from './Sort/Sort'
import MealsList from './MealsLIst/MealsList';
import './Meals.css'
import { Link } from 'react-router-dom';

function Meals({ data }) {

  const options = [
    'All', 'Can be cooked', 'Michaeldog'
  ];


  return ( 
    <div>
      <Sort options={options} />
      <div className="meals_grid">
        {data?.map((e) => (            
            <Link className='link_item' key={e.id} to={e.id.toString()}>
              <MealsList
                obj={e}
                key={e.id}
                title={e.name}
              />
            </Link>
        ))}
      </div>
    </div>
  );
}

export default Meals