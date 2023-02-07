// import React, {useState, useContext, useEffect} from 'react'
// import { Form, Row, Col, Button } from 'react-bootstrap'
// import { API } from '../../utils/useAxios';
// import AuthContext from '../../context/AuthContext';
// import { useImmer } from 'use-immer';

// function AddIngredientsToMeal() {
//   const { user } = useContext(AuthContext);

//   const [ingredients, setIngredients] = useState([]);
//   const [boll, setBoll] = useState(false);

//   const [meal, updateMeal] = useImmer({
//     name: null,
//     recipe: null,
//     img: null,
//     video: null,
//     category_id: null,
//     user_id: user?.user_id,
//   });

//   const handleIngredientsChange = (e) => {
//     if (!meal.ingredients.includes(e.target.value)) {
//       updateMeal((o) => {
//         o.ingredients.push(Number(e.target.value));
//       });
//     }
//   };

//   const handleIngredientsDelete = () => {
//     updateMeal((o) => {
//       o.ingredients.splice(-1, 1);
//     });
//   };

//   //   API
//   // ingredient_measures/

//   const postIngredientMeasures = async (e) => {
//     e.preventDefault();
//     await API.post("ingredient_measures/", meal)
//       .then((response) => console.log(response))
//       .catch((error) => {
//         console.error("There was an error in POST!", error);
//       });
//   };

//   // Ingredients API
//   const getIngredients = async () => {
//     await API.get("ingredients/")
//       .then((res) => {
//         setIngredients(res.data);
//       })
//       .catch(console.error);
//   };

//   useEffect(() => {
//     getIngredients()
//   }, [])

//   return (
//     <div>
//       <Form.Group className="m-3" controlId="formIngredients">
//         <Row>
//           <Col>
//             <Form.Text>
//               Ingredients:
//               {meal.ingredients?.map((e) => (
//                 <div key={e}>{ingredients?.find((o) => o.id == e).name}</div>
//               ))}
//             </Form.Text>
//           </Col>
//           <Col>
//             <Button onClick={() => setBoll((prev) => !prev)}>+</Button>
//             {meal?.ingredients?.length > 0 && (
//               <Button variant="danger" onClick={handleIngredientsDelete}>
//                 -
//               </Button>
//             )}
//           </Col>
//         </Row>
//       </Form.Group>

//       {boll && (
//         <Form.Group className="m-3">
//           <Form.Select onChange={handleIngredientsChange} required>
//             <option>Choose ingredient</option>
//             {ingredients?.map((e) => (
//               <option key={e.id} value={e.id}>
//                 {e.name}
//               </option>
//             ))}
//           </Form.Select>
//         </Form.Group>
//       )}
//     </div>
//   );
// }

// export default AddIngredientsToMeal