import React from 'react'
import Sort from './Sort/Sort'
import MealsList from './MealsLIst/MealsList';
import './Meals.css'
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