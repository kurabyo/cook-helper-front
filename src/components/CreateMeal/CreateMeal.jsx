import React, { useState, useContext, useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { API } from '../../utils/useAxios';
import AuthContext from '../../context/AuthContext';
import { useImmer } from 'use-immer';

function CreateMeal() {
  const { user } = useContext(AuthContext);

  const [meal, updateMeal] = useImmer({
    name: null,
    recipe: null,
    img: null,
    video: null,
    category_id: null,
    user_id: user?.user_id,
    ingredients: [],
  });

  const [ingredients, setIngredients] = useState([]);
  const [categoties, setCategories] = useState([]);
  const [boll, setBoll] = useState(false);
  const [imgprev, setImgPrev] = useState(null);

  useEffect(() => {
    getIngredients();
    getCategories();
  }, []);

  // Meal props filling
  const handleNameChange = (e) => {
    updateMeal((o) => {
      o.name = e.target.value;
    });
  };

  const handleRecipeChange = (e) => {
    updateMeal((o) => {
      o.recipe = e.target.value;
    });
  };



  const handleImgChange = (e) => {

    setImgPrev(URL.createObjectURL(e.target.files[0]))
    
  };

  const handleVideoChange = (e) => {
    updateMeal((o) => {
      o.video = e.target.value;
    });
  };

  const handleCategoryChange = (e) => {
    updateMeal((o) => {
      o.category_id = e.target.value;
    });
  };

  const handleIngredientsChange = (e) => {
    if (!meal.ingredients.includes(e.target.value)) {
      updateMeal((o) => {
        o.ingredients.push(Number(e.target.value));
      });
    }
  };

  const handleIngredientsDelete = () => {
    updateMeal((o) => {o.ingredients.splice(-1, 1)});
  };

  // Meals API
  const createNewMeal = async (e) => {
    e.preventDefault();
    await API.post("meals/", meal)
      .then((response) => console.log(response))
      .catch((error) => {
        console.error("There was an error in POST!", error);
      });
  };

  // Ingredients API
  const getIngredients = async () => {
    await API.get("ingredients/")
      .then((res) => {
        setIngredients(res.data);
      })
      .catch(console.error);
  };

  // Categories API
  const getCategories = async () => {
    await API.get("categorys/")
      .then((res) => {
        setCategories(res.data);
      })
      .catch(console.error);
  };


  return (
    <div>
      <Form onSubmit={createNewMeal}>
        <Form.Text>Here you can create meal!</Form.Text>

        <Form.Group className="m-3" controlId="formName">
          <Form.Control
            type="text"
            onChange={handleNameChange}
            placeholder="Enter meal name"
            required
          />
          <Form.Select
            onChange={handleCategoryChange}
            name="categories"
            required
          >
            <option>Choose meal category</option>
            {categoties?.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </Form.Select>
          {false && (
            <Form.Control type="text" placeholder="Enter meal category" />
          )}
        </Form.Group>

        <Form.Group className="m-3" controlId="formIngredients">
          <Row>
            <Col>
              <Form.Text>
                Ingredients:
                {meal.ingredients?.map((e) => (
                  <div key={e}>{ingredients?.find((o) => o.id == e).name}</div>
                ))}
              </Form.Text>
            </Col>
            <Col>
              <Button onClick={() => setBoll((prev) => !prev)}>+</Button>
              {meal.ingredients.length > 0 && <Button variant='danger' onClick={handleIngredientsDelete}>-</Button>}
            </Col>
          </Row>
        </Form.Group>

        {boll && (
          <Form.Group className="m-3">
            <Form.Select onChange={handleIngredientsChange} required>
              <option>Choose ingredient</option>
              {ingredients?.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        <Form.Group className="m-3">
          <Form.Control
            onChange={handleRecipeChange}
            as="textarea"
            type="text"
            placeholder="Enter your recipe here"
            required
          />
          <Form.Control name="img" onChange={handleImgChange} type="file" />
          {imgprev && <img src={imgprev} alt='pic' width={300}/>}
          <Form.Control
            onChange={handleVideoChange}
            type="text"
            placeholder="Enter your youtube video ref here"
          />
        </Form.Group>
        <Button className="m-3" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default CreateMeal