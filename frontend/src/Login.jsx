// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.css";
// import './Login.css'; // Import the CSS file

// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Nav from 'react-bootstrap/Nav';
// import Button from 'react-bootstrap/Button';
// // import { jwtDecode } from 'jwt-decode';

// import { API_ENDPOINT } from './Api';

// function Login() {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);

//     /* Verify if User In-Session in LocalStorage */
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = JSON.parse(localStorage.getItem('token'));
//                 setUser(response.data);
//                 navigate("/dashboard");
//             } catch (error) {
//                 navigate("/login");
//             }
//         };
//         fetchUser();
//     }, []);

//     /* Performs Login Method */
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [token, setToken] = useState(localStorage.getItem('token') || '');
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(`${API_ENDPOINT}/users/login`, {
//                 username,
//                 password,
//             });
//             localStorage.setItem("token", JSON.stringify(response));
//             setError('');
//             navigate("/dashboard");
//         } catch (error) {
//             setError('Invalid username or password');
//         }
//     };

//     return (
//         <>
//             <Navbar bg="info" data-bs-theme="dark">
//                 <Container>
//                     <Navbar.Brand href="#home">A'TIN UNIVERSE</Navbar.Brand>
//                 </Container>
//             </Navbar>
//             <br /><br /><br /><br /><br /><br />
//             <Container>
//                 <Row className="justify-content-md-center">
//                     <Col md={4}>
//                         <div className="login-form">
//                             <div className="container">
//                                 <div className="login-logo">
//                                     {/* <img src={logo} width={'38%'} alt="Logo" /> */}
//                                 </div>
//                                 <center>
//                                    WELCOME! <br />
//                                     Please Login.
//                                 </center>
//                                 &nbsp;
//                                 <div className="card">
//                                     <div className="card-body login-card-body">
//                                         <Form onSubmit={handleSubmit}>
//                                             <Form.Group controlId="formUsername">
//                                                 <Form.Label>Username:</Form.Label>
//                                                 <Form.Control
//                                                     className="form-control-sm rounded-0"
//                                                     type="username"
//                                                     placeholder="Enter Username"
//                                                     value={username}
//                                                     onChange={(e) => setUsername(e.target.value)}
//                                                     required
//                                                 />
//                                             </Form.Group>
//                                             <br />
//                                             <Form.Group controlId="formPassword">
//                                                 <Form.Label>Password:</Form.Label>
//                                                 <Form.Control
//                                                     className="form-control-sm rounded-0"
//                                                     type="password"
//                                                     placeholder="Enter Password"
//                                                     value={password}
//                                                     onChange={(e) => setPassword(e.target.value)}
//                                                     required
//                                                 />
//                                             </Form.Group>
//                                             <br />
//                                             <Form.Group controlId="formButton">
//                                                 {error && <p style={{ color: 'red' }}>{error}</p>}
//                                                 <Button
//                                                     variant="success"
//                                                     className="btn btn-block bg-custom btn-flat rounded-0"
//                                                     size="sm"
//                                                     block="block"
//                                                     type="submit"
//                                                 >
//                                                     L o g i n &nbsp; N o w
//                                                 </Button>
//                                             </Form.Group>
//                                         </Form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </Col>
//                 </Row>
//             </Container>
//         </>
//     );
// }

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import './Login.css'; // Import the CSS file
import Card from 'react-bootstrap/Card'; // Import the Card component
import Container from 'react-bootstrap/Container';
import Navbar from './Navbar';  // Import the Navbar component
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { API_ENDPOINT } from './Api';  // Assuming you have this for API calls

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_ENDPOINT}/users/login`, { username, password });
      localStorage.setItem("token", JSON.stringify(response));
      setError('');
      navigate("/dashboard");
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      {/* Include the Navbar component */}
      <Navbar />

      {/* The rest of the Login page */}
      <div className="login-form">
        <Card>
          <Card.Body>
            <Card.Title className="text-center">WELCOME!</Card.Title>
            <Card.Subtitle className="mb-2 text-muted text-center">
              Please Login
            </Card.Subtitle>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <br />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <Button
                className="btn btn-block bg-custom btn-flat rounded-0"
                size="sm"
                block="block"
                type="submit"
              >
                Login Now
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Login;







