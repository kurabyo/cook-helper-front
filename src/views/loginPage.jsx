import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <Form className="col-md-5 mx-auto pt-3" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          id="username" 
          pattern="[A-Za-z0-9@.+_-]+"
          type="text"
          placeholder="Enter name"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          id="password"
          minLength={8}
          type="password"
          placeholder="Enter password"
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    // <section>
    //   <form onSubmit={handleSubmit}>
    //     <h1>Login </h1>
    //     <hr />
    //     <label htmlFor="username">Username</label>
    //     <input type="text" id="username" placeholder="Enter Username" />
    //     <label htmlFor="password">Password</label>
    //     <input type="password" id="password" placeholder="Enter Password" />
    //     <button type="submit">Login</button>
    //   </form>
    // </section>
  );
};

export default LoginPage;