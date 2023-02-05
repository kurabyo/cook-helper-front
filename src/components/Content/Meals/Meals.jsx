import React, { useEffect, useState } from 'react'
import Sort from './Sort/Sort'
import MealsList from './MealsLIst/MealsList';
import './Meals.css'
import OneMeal from './OneMeal/OneMeal';
import API from './API';

function Meals() {
  const options = [
    'All', 'Can be cooked', 'Michaeldog'
  ];

  const [page, setPage] = useState(false);
  const [data, setData] = useState();
  const [dataMap, setDataMap] = useState([])
  const [sort, setSort] = useState(options[0]);

  useEffect(() => {
    refreshMovies();
  }, []);

  const refreshMovies = () => {
    API.get("meals/")
      .then((res) => {
        console.log(res.data);
        setData(res.data)
        setDataMap(res.data)
      })
      .catch(console.error);
  };

  const componentDidMount = () => {
    // POST request using axios with error handling
    const article = { name: 'test post', recipe: 'lorem', img: null, video: "", category_id: null, user_id: 1 };
    API.post('/meals/', article)
        .then(response => console.log(response))
        .catch(error => {
            console.error('There was an error!', error);
        });
  }



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
      {page ? (
        <div>
          <button onClick={() => setPage(prev => !prev)}>Return</button>
          <OneMeal obj={page}/>
        </div>
      ) : (
        <div>
          <Sort options={options} sort={sort} set={setSort} />
          <div className="meals_grid">
            {dataMap?.map((e) => (
              <MealsList
                obj={e}
                key={e.id}
                img={e.img}
                title={e.name}
                click={setPage}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Meals