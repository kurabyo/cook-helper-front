import React, { useContext, useEffect, useState } from 'react'
import Sort from './Sort/Sort'
import MealsList from './MealsLIst/MealsList';
import './Meals.css'
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import { API } from '../../../utils/useAxios';

function Meals({ data }) {
  const options = [
    'All', 'Can be cooked', 
  ];

  const { user } = useContext(AuthContext)

  const [userStor, setUserStor] = useState([]);
  const [optionS, setOptionS] = useState(options[0]);

  const userIngedients = userStor.map(e => e.ingredient_id)

  const getStorage = async () => {
    await API.get("user_storages/")
      .then((res) => {
        setUserStor(res.data?.filter(({ user_id }) => user_id === user.user_id));
      })
      .catch(console.error);
  }

  

  useEffect(() => {
    getStorage()

  }, [])

  const handleOptionChange = (e) => {
    setOptionS(e.value)
  }

  return (
    <div className="main">
      <Sort options={options} handleFunc={handleOptionChange} />
      <div className="meals_grid">
        {options[0] === optionS &&
          data?.map((e) => (
            <Link className="link_item" key={e.id} to={e.id.toString()}>
              <MealsList obj={e} key={e.id} title={e.name} />
            </Link>
          ))}
        {options[1] === optionS &&
          data
            ?.filter((e) => {
              return e.ingredients.every(o => userIngedients.includes(o));
            })
            ?.map((e) => (
              <Link className="link_item" key={e.id} to={e.id.toString()}>
                <MealsList obj={e} key={e.id} title={e.name} />
              </Link>
            ))}
      </div>
    </div>
  );
}

export default Meals