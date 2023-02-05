import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, email, password, password2);
  };

  return (
    <Form className="col-md-5 mx-auto pt-3" onSubmit={handleSubmit}>
      <Form.Text className="center">Registration</Form.Text>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          pattern="[A-Za-z0-9@.+_-]+"
          type="text"
          placeholder="Enter Your Name"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Form.Text type='muted'>This value may contain only letters, numbers, and @/./+/-/_ characters.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          pattern="(?!^\d+$)^.+$"
          minLength={8}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPasswordConfirm">
        <Form.Label>Password-Confirm</Form.Label>
        <Form.Control
          pattern="(?!^\d+$)^.+$"
          minLength={8}
          type="password"
          placeholder="Password-Confirm"
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <Form.Text type='muted'>{password2 !== password ? "Passwords do not match" : ""}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
}

export default Register;