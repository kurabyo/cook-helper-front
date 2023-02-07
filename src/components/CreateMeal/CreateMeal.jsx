import React, { useState, useContext, useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { API } from '../../utils/useAxios';
import AuthContext from '../../context/AuthContext';
import { useImmer } from 'use-immer';
import { useNavigate } from 'react-router-dom';

function CreateMeal() {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [meal, updateMeal] = useImmer({
    name: null,
    recipe: null,
    img: null,
    video: null,
    category_id: null,
    user_id: user?.user_id,
  });

 
  const [categoties, setCategories] = useState([]);

  useEffect(() => {
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

    updateMeal((o) => o.img = e.target.value)
    
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



  // Meals API
  const createNewMeal = async (e) => {
    e.preventDefault();
    await API.post("meals/", meal)
      .then((res) => {navigate('/ingrsetup')
    console.log(res)})
      .catch((error) => {
        console.error("There was an error in POST!", error);
      });
    };
    

  // Categories API
  const getCategories = async () => {
    await API.get("categories/")
      .then((res) => {
        setCategories(res.data);
      })
      .catch(console.error);
  };


  return (
    <div>
      <Form onSubmit={createNewMeal}>
        <Form.Text className='ml-10'>Here you can create meal!</Form.Text>

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
            className='my-2'
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

        <Form.Group className="m-3">
          <Form.Control
            onChange={handleRecipeChange}
            as="textarea"
            type="text"
            placeholder="Enter your recipe here"
            required
          />
          <Form.Control
            className="my-3"
            placeholder="Put your img url"
            name="img"
            onChange={handleImgChange}
            type="text"
          />
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