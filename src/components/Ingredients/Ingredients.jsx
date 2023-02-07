import React, { useState, useContext, useEffect, useRef } from 'react'
import './Ingredients.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { API } from '../../utils/useAxios';
import AuthContext from '../../context/AuthContext';
import CreatableSelect from 'react-select/creatable';
import { useImmer } from 'use-immer';
import { Button } from 'react-bootstrap';


function Ingredients() {
  const { user } = useContext(AuthContext);

  const [prod, updateProd] = useImmer({
    amount: null,
    measure_id: null,
    ingredient_id: null,
    user_id: user?.user_id,
  });


  const newIngrName = useRef(null)
  const ingOptions = useRef(null)
  
  const [data, setData] = useState();
  const [ingredient, setIngredient] = useState();
  const [measure, setMeasure] = useState();

  ingOptions.current = (ingredient?.map(e => { return {value: e.id, label: e.name} }))
  const mesrOptions = measure?.map(e => { return {value: e.id, label: e.name} })

  const options = ["1", "2", "3", "3", "3", "3", "3", "3", "3", "3"];

  // onChange

  function handleIngIdChange(e) {
    newIngrName.current = e.label
    sendIngrSet()

    updateProd((draft) => {
      draft.ingredient_id = e.value;
    });
  }

  function handleAmountChange(e) {
    updateProd((draft) => {
      draft.amount = e.target.value;
    });
  }

  function handleMeasureIdChange(e) {
    updateProd((draft) => {
      draft.measure_id = e.value;
    });
  }

  const refreshStorage = async () => {
    await API.get("user_storages/")
      .then((res) => {
        setData(res.data?.filter(({ user_id }) => user_id === user.user_id));
      })
      .catch(console.error);

    await API.get("ingredients/")
      .then((res) => {
        setIngredient(res.data);
      })
      .catch(console.error);

    await API.get("measures/")
      .then((res) => {
        setMeasure(res.data);
      })
      .catch(console.error);
  };

  const sendStorageItem = async (e) => {
    e.preventDefault();
    if (data.some((e) => e.ingredient_id === prod.ingredient_id)){
      updateStorageItem(data.find(({ ingredient_id }) => prod.ingredient_id === ingredient_id ).id )
    }
    else if (!Object.values(prod).some((el) => el === null)) {
      await API.post("user_storages/", prod).catch((err) =>{
        alert("There are some post error")
        console.log(prod)}
      );
      refreshStorage()
    } 
    else {
      alert("Fill all filds!");
    }
    
  };


  const updateStorageItem = async (id) => {
    if (!Object.values(prod).some((el) => el === null)) {
      await API.put(`user_storages/${id}/`, prod).catch((err) =>{
        alert("There are some update error");
        console.log(err);
        console.log(prod)
        console.log(data)
      }
    );
    }
    else {
      alert("Error!");
    }
    refreshStorage()
  }

  const deleteStorageItem = async (id) => {
    await API.delete(`user_storages/${id}`)
    refreshStorage()
  }

  // INgr set list API
  const sendIngrSet = async () => {
    if(ingredient.find((e) => e.name === newIngrName.current ) === undefined){
      await API.post('ingredients/', { name: newIngrName.current, user_id: user?.user_id })
      window.location.reload(false);
    }    
  }


  const sendMeasureSet = async () => {
    if(measure.find((e) => e.name === newIngrName.current ) === undefined){
      await API.post('measures/', { name: newIngrName.current, user_id: user?.user_id })
      window.location.reload(false);
    }    
  }

  useEffect(() => {
    refreshStorage()
  }, []);

  return (
    <div className="main">
      <div className="container">
        <Dropdown className="sortbar" options={options} />

        <div className="ingredients">
          ingredient
          {data?.map((e) => (
            <li key={e.id}>
              {ingredient?.find(({ id }) => id === e.ingredient_id).name}
            </li>
          ))}
        </div>
        <div className="amount">
          <div className="colums">
            <div>
              amount
              {data?.map((e) => (
                <li key={e.id}>{e.amount}</li>
              ))}
            </div>
            <div>
              measure / delete item
              {data?.map((e) => (
                <div className="delete_items" key={e.id}>
                  {measure?.find(({ id }) => id === e.measure_id).name}
                  <button
                    key={e.id}
                    className="btn_delete"
                    onClick={() => deleteStorageItem(e.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <form className="apemeasure" onSubmit={sendStorageItem}>
        <CreatableSelect
          placeholder="Ingredient"
          onChange={handleIngIdChange}
          className="product_select"
          options={ingOptions.current}
          required
        />
        <input
          className="amount_select"
          placeholder="Amount"
          onChange={handleAmountChange}
          type="number"
          min="0"
          step="0.1"
          required
        />
        <CreatableSelect
          placeholder="Measure"
          onChange={handleMeasureIdChange}
          className="measure_select"
          options={mesrOptions}
          required
        />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
}

export default Ingredients