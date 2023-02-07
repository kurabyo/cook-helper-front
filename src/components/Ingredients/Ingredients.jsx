import React, { useState, useContext, useEffect, useRef } from 'react'
import './Ingredients.css'
import 'react-dropdown/style.css';
import { API } from '../../utils/useAxios';
import AuthContext from '../../context/AuthContext';
import CreatableSelect from 'react-select/creatable';
import { useImmer } from 'use-immer';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';


function Ingredients() {
  const { user } = useContext(AuthContext);

  const [prod, updateProd] = useImmer({
    amount: null,
    measure_id: null,
    ingredient_id: null,
    user_id: user?.user_id,
  });


  const newIngrName = useRef(null)
  const newIngrCat = useRef(null)
  const ingOptions = useRef(null)
  
  const [data, setData] = useState();
  const [ingredient, setIngredient] = useState(null);
  const [ingredientCat, setIngredientCat] = useState(null);
  const [measure, setMeasure] = useState();
  const [selector, setSelector] = useState(false);

  ingOptions.current = (ingredient?.map(e => { return {value: e.id, label: e.name} }))
  const mesrOptions = measure?.map(e => { return {value: e.id, label: e.name} })

  // onChange
  function handleSelectorChange(e) {
    if (e.target.value == 0) setSelector(false)
    else setSelector(e.target.value)
  }

  function handleIngIdChange(e) {
    newIngrName.current = e.label
    sendIngrSet()

    updateProd((draft) => {
      draft.ingredient_id = e.value;
    });
  }

  function handleIngCatChange(e) {
    newIngrCat.current = e.target.value
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

    await API.get("ingredient_categories/")
      .then((res) => {
        setIngredientCat(res.data);
      })
      .catch(console.error);
    
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
      console.log(data)
      console.log(prod)
      alert("Fill all filds!");
    }
    
  };


  const updateStorageItem = async (id) => {
    if (!Object.values(prod).some((el) => el === null)) {
      await API.put(`user_storages/${id}/`, prod).catch((err) =>{
        alert("There are some update error");
        console.log(err);
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
    if(ingredient.find((e) => e.name === newIngrName.current ) === undefined && newIngrCat.current !== null){
      await API.post('ingredients/', { name: newIngrName.current, ingredient_category_id: newIngrCat.current, user_id: user?.user_id })
      window.location.reload(false);
    }    
  }

  useEffect(() => {
    refreshStorage()
  }, []);

  return (
    <div className="main">
      <div className="container">
        <Form.Select className="sortbar" onChange={handleSelectorChange}>
          <option value={0}>Choose category / All</option>
          {ingredientCat?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </Form.Select>

        <div className="ingredients">
          ingredient
          {!selector &&
            data?.map((e) => (
              <li key={e.id}>
                {ingredient?.find(({ id }) => id === e.ingredient_id)?.name}
              </li>
            ))}
          {selector &&
            ingredient
              ?.filter((e) => {
                return e.ingredient_category_id == selector;
              })?.filter((e) => {
                for(let d of data){
                  if (e.id === d.ingredient_id) return true
                }
                return false
              }).map((e) => <li key={e.id}>{e.name}</li>)}
        </div>
        <div className="amount">
          <div className="colums">
            <div>
              amount
              {selector &&
                data
                  ?.filter(
                    (e) =>
                      e.ingredient_id ===
                      ingredient?.find((e) => {
                        return e.ingredient_category_id == selector;
                      })?.id
                  )
                  .map((e) => <li key={e.id}>{e.amount}</li>)}
              {!selector && data?.map((e) => <li key={e.id}>{e.amount}</li>)}
            </div>
            <div>
              measure / delete item
              {!selector && data?.map((e) => (
                <div className="delete_items" key={e.id}>
                  {measure?.find(({ id }) => id === e.measure_id).name}
                  <button
                    key={e.id}
                    className="btn_delete"
                    onClick={() => deleteStorageItem(e.id)}
                  />
                </div>
              ))}
              {
                selector && measure
                ?.filter(
                  (e) =>
                    e.id ===
                    data?.find((e) => e.ingredient_id === ingredient.find(e => e.ingredient_category_id == selector)?.id)?.measure_id
                )
                .map((e) => <li key={e.id}>{e.name}</li>)
              }
            </div>
          </div>
        </div>
      </div>
      <form className="apemeasure" onSubmit={sendStorageItem}>
        <Form.Select
          defaultValue={3}
          className="select_category"
          onChange={handleIngCatChange}
          required
        >
          <option>Choose category</option>
          {ingredientCat?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </Form.Select>
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

        <Button className='btn_submit' type="submit">Add</Button>
      </form>
      <div className='botom_text'>
        If you want to add new ingredient in list you should first pick category
        and then type the name of the ingredient
      </div>
    </div>
  );
}

export default Ingredients