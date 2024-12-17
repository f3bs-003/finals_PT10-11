// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // import Container from 'react-bootstrap/Container';
// // import Navbar from 'react-bootstrap/Navbar';
// // import Form from 'react-bootstrap/Form';
// // import Row from 'react-bootstrap/Row';
// // import Col from 'react-bootstrap/Col';
// // import NavDropdown from 'react-bootstrap/NavDropdown';
// // import Nav from 'react-bootstrap/Nav';
// // import Button from 'react-bootstrap/Button';
// // import { jwtDecode } from 'jwt-decode';
// // import Tab from 'react-bootstrap/Tab';
// // import Tabs from 'react-bootstrap/Tabs';
// // import { FormControl, Dropdown, DropdownButton } from 'react-bootstrap';

// // import { API_ENDPOINT } from './Api';

// // function Dashboard() {
// //     const [user, setUser] = useState(null);
// //     const navigate = useNavigate();

// //     /* Verify if User In-Session in LocalStorage */
// //     useEffect(() => {
// //         const fetchDecodedUserID = async () => {
// //             try {
// //                 const response = JSON.parse(localStorage.getItem('token'));
// //                 setUser(response.data);

// //                 const decoded_token = jwtDecode(response.data.token);
// //                 setUser(decoded_token);
// //             } catch (error) {
// //                 navigate("/login");
// //             }
// //         };
// //         fetchDecodedUserID();
// //     }, []);

// //     /* Performs Logout Method */
// //     const handleLogout = async () => {
// //         try {
// //             localStorage.removeItem('token');
// //             navigate("/login");
// //         } catch (error) {
// //             console.error('Logout failed', error);
// //         }
// //     };

// //     return (
// //         <>
// //             <Navbar bg="success" data-bs-theme="dark">
// //                 <Container>
// //                     <Navbar.Brand href="#home">A'TIN UNIVERSE</Navbar.Brand>
// //                     <Nav className="me-auto">
// //                         <Nav.Link href="#users">Discover</Nav.Link>
// //                         <Nav.Link href="#departments">Departments</Nav.Link>
// //                         <Nav.Link href="#courses">Courses</Nav.Link>
// //                     </Nav>
// //                     <Navbar.Collapse id="basic-navbar-nav">
// //                         <Nav className="ms-auto">
// //                             <NavDropdown
// //                                 title={user ? `User: ${user.username}` : 'Dropdown'}
// //                                 id="basic-nav-dropdown"
// //                                 align="end"
// //                             >
// //                                 <NavDropdown.Item href="#">Profile</NavDropdown.Item>
// //                                 <NavDropdown.Item href="#">Settings</NavDropdown.Item>
// //                                 <NavDropdown.Item href="#" onClick={handleLogout}>
// //                                     Logout
// //                                 </NavDropdown.Item>
// //                             </NavDropdown>
// //                         </Nav>
// //                     </Navbar.Collapse>
// //                 </Container>
// //             </Navbar>
// //         </>
// //     );
// // }

// // export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Nav from 'react-bootstrap/Nav';
// import Button from 'react-bootstrap/Button';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import Table from 'react-bootstrap/Table';
// import Modal from 'react-bootstrap/Modal';

// import { API_ENDPOINT } from './Api';

// function Dashboard() {
//     const [user, setUser] = useState(null);
//     const [users, setUsers] = useState([]); // Store list of users
//     const [showModal, setShowModal] = useState(false); // Modal visibility
//     const [selectedUser, setSelectedUser] = useState(null); // Currently selected user for edit/delete
//     const [newUser, setNewUser] = useState({ fullname: '', username: '', password: '' }); // New user data

//     const navigate = useNavigate();

//     /* Verify if User In-Session in LocalStorage */
//     useEffect(() => {
//         const fetchDecodedUserID = async () => {
//             try {
//                 const response = JSON.parse(localStorage.getItem('token'));
//                 setUser(response.data);
//             } catch (error) {
//                 navigate("/login");
//             }
//         };
//         fetchDecodedUserID();
//     }, []);

    
//     /* Fetch Users (READ Operation) */
//     const fetchUsers = async () => {
//         try {
//             const token = JSON.parse(localStorage.getItem('token'))?.data?.token;
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 }
//             };
    
//             const response = await axios.get(`${API_ENDPOINT}/users`, config);
//             setUsers(response.data);
//         } catch (error) {
//             // Enhanced error logging
//             console.error('Error fetching users:', error.response ? error.response.data : error.message);
//         }
//     };
    
//     useEffect(() => {
//         fetchUsers();
//     }, []);
    
//     /* Create User */
//     const handleCreateUser = async () => {
//         try {
//             await axios.post(`${API_ENDPOINT}/users`, newUser, config);
//             // setNewUser({ fullname: '', username: '', password: '' });
//             fetchUsers(); // Refresh users list
//             setShowModal(false);
//         } catch (error) {
//             console.error('Error creating user:', error);
//         }
//     };

//     /* Update User */
//     const handleUpdateUser = async () => {
//         try {
//             await axios.put(`${API_ENDPOINT}/users/${selectedUser.id}`, selectedUser, config);
//             // setSelectedUser(null);
//             fetchUsers(); // Refresh users list
//             setShowModal(false);
//         } catch (error) {
//             console.error('Error updating user:', error);
//         }
//     };

//     /* Delete User */
//     const handleDeleteUser = async (id) => {
//         try {
//             await axios.delete(`${API_ENDPOINT}/users/${id}`, config);
//             fetchUsers(); // Refresh users list
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     /* Handle Modal Open */
//     const handleShowModal = (user = null) => {
//         setSelectedUser(user);
//         setNewUser(user ? { fullname: user.fullname, username: user.username, password: user.password } : { fullname: '', username: '', password: '' });
//         setShowModal(true);
//     };

//     /* Handle Modal Close */
//     const handleCloseModal = () => {
//         setShowModal(false);
//         setSelectedUser(null);
//     };

//     /* Performs Logout Method */
//     const handleLogout = async () => {
//         try {
//             localStorage.removeItem('token');
//             navigate("/login");
//         } catch (error) {
//             console.error('Logout failed', error);
//         }
//     };

//     return (
//         <>
//             {/* Navbar */}
//             <Navbar bg="success" data-bs-theme="dark">
//                 <Container>
//                     <Navbar.Brand href="#home">A'TIN UNIVERSE</Navbar.Brand>
//                     <Navbar.Collapse id="basic-navbar-nav">
//                         <Nav className="ms-auto">
//                             <NavDropdown
//                                 title={user ? `User: ${user.username}` : 'Dropdown'}
//                                 id="basic-nav-dropdown"
//                                 align="end"
//                             >

//                                 <NavDropdown.Item href="#" onClick={handleLogout}>
//                                     Logout
//                                 </NavDropdown.Item>
//                             </NavDropdown>
//                         </Nav>
//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>

//             {/* Main Content */}
//             <Container className="mt-5">
//                 <h2>Members</h2>
//                 <Button variant="success" onClick={() => handleShowModal()}>Add New User</Button>
//                 <Table striped bordered hover className="mt-3">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Fullname</th>
//                             <th>Username</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user) => (
//                             <tr key={user.id}>
//                                 <td>{user.id}</td>
//                                 <td>{user.fullname}</td>
//                                 <td>{user.username}</td>
//                                 <td>
//                                     <Button variant="info" size="sm" onClick={() => handleShowModal(user)}>Edit</Button>{' '}
//                                     <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </Container>

//             {/* Modal for Add/Edit User */}
//             <Modal show={showModal} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>{selectedUser ? 'Edit User' : 'Add New User'}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group controlId="formFullname">
//                             <Form.Label>Fullname</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={newUser.fullname}
//                                 onChange={(e) => setNewUser({ ...newUser, fullname: e.target.value })}
//                                 placeholder="Enter fullname"
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formUsername" className="mt-3">
//                             <Form.Label>Username</Form.Label>
//                             <Form.Control
//                                 type="username"
//                                 value={newUser.username}
//                                 onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
//                                 placeholder="Enter username"
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formPassword" className="mt-3">
//                             <Form.Label>Password</Form.Label>
//                             <Form.Control
//                                 type="password"
//                                 value={newUser.password}
//                                 onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//                                 placeholder="Enter password"
//                                 required
//                             />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseModal}>
//                         Close
//                     </Button>
//                     <Button
//                         variant="primary"
//                         onClick={selectedUser ? handleUpdateUser : handleCreateUser}
//                     >
//                         {selectedUser ? 'Update User' : 'Create User'}
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

// export default Dashboard;


// -------------------------------------RECENT USED-----------------------------------------
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Nav from 'react-bootstrap/Nav';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
// import Modal from 'react-bootstrap/Modal';

// import { API_ENDPOINT } from './Api';

// function Dashboard() {
//     const [user, setUser] = useState(null);
//     const [users, setUsers] = useState([]); // Store list of users
//     const [showModal, setShowModal] = useState(false); // Modal visibility for Add/Edit/View
//     const [confirmDelete, setConfirmDelete] = useState(false); // Modal visibility for delete confirmation
//     const [selectedUser, setSelectedUser] = useState(null); // Currently selected user for actions
//     const [newUser, setNewUser] = useState({ fullname: '', username: '', password: '' }); // New user data
//     const [loading, setLoading] = useState(false); // To manage loading state
//     const [viewingUser, setViewingUser] = useState(false); // To manage view user modal state
//     const [editMode, setEditMode] = useState(false); // To manage edit user mode

//     const navigate = useNavigate();

//     /* Verify if User In-Session in LocalStorage */
//     useEffect(() => {
//         const fetchDecodedUserID = async () => {
//             try {
//                 const response = JSON.parse(localStorage.getItem('token'));
//                 if (response?.data) {
//                     setUser(response.data);
//                 } else {
//                     navigate("/login");
//                 }
//             } catch (error) {
//                 navigate("/login");
//             }
//         };
//         fetchDecodedUserID();
//     }, [navigate]);

//     /* Fetch Users (READ Operation) */
//     const fetchUsers = async () => {
//         try {
//             const token = JSON.parse(localStorage.getItem('token'))?.data?.token;
//             const config = {
//                 headers: {
//                     Authorization: `${token}`,
//                 }
//             };
//             const response = await axios.get(`${API_ENDPOINT}/users`, config);
//             setUsers(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error.response ? error.response.data : error.message);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     /* Create User */
//     const handleCreateUser = async () => {
//         try {
//             const token = JSON.parse(localStorage.getItem('token'))?.data?.token;
//             const config = {
//                 headers: {
//                     Authorization: `${token}`,  
//                 }
//             };
//             const response = await axios.post(`${API_ENDPOINT}/users/register`, newUser, config);
//             console.log("User created:", response.data);
//         } catch (error) {
//             console.error('Error creating user:', error);
//         }
//     };
    

//     /* Update User */
//     const handleUpdateUser = async () => {
//         try {
//             setLoading(true);
//             const token = JSON.parse(localStorage.getItem('token'))?.data?.token;
//             const config = {
//                 headers: {
//                     Authorization: `${token}`,
//                 }
//             };
//             await axios.put(`${API_ENDPOINT}/users/${selectedUser.id}`, selectedUser, config);
//             fetchUsers(); // Refresh users list
//             setSelectedUser(null);
//             setShowModal(false);
//         } catch (error) {
//             console.error('Error updating user:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     /* Delete User */
//     const handleDeleteUser = async () => {
//         try {
//             const token = JSON.parse(localStorage.getItem('token'))?.data?.token;
//             const config = {
//                 headers: {
//                     Authorization: `${token}`,
//                 }
//             };
//             await axios.delete(`${API_ENDPOINT}/users/${selectedUser.id}`, config);
//             fetchUsers(); // Refresh users list after deletion
//             setConfirmDelete(false); // Close the confirmation modal
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     /* Handle Modal Open for Deletion */
//     const handleShowDeleteModal = (user) => {
//         setSelectedUser(user); // Set the user to delete
//         setConfirmDelete(true); // Show delete confirmation modal
//     };

//     /* Handle Modal Open */
//     const handleShowModal = (user = null, action = 'add') => {
//         setViewingUser(action === 'view');
//         setEditMode(action === 'edit'); // Set edit mode when editing a user
//         setSelectedUser(user);
//         setNewUser(user ? { user_id: user.user_id, fullname: user.fullname, username: user.username, password: '' } : { user_id: '', fullname: '', username: '', password: '' });
//         setShowModal(true);
//     };

//     /* Handle Modal Close */
//     const handleCloseModal = () => {
//         setShowModal(false); // Close the Add/Edit/View modal
//         setConfirmDelete(false); // Close the delete confirmation modal
//         setSelectedUser(null); // Reset the selected user
//     };

//     /* Performs Logout Method */
//     const handleLogout = async () => {
//         try {
//             localStorage.removeItem('token');
//             navigate("/login");
//         } catch (error) {
//             console.error('Logout failed', error);
//         }
//     };

//     return (
//         <>
//             {/* Navbar */}
//             <Navbar bg="success" data-bs-theme="dark">
//                 <Container>
//                     <Navbar.Brand href="#home">A'TIN UNIVERSE</Navbar.Brand>
//                     <Navbar.Collapse id="basic-navbar-nav">
//                         <Nav className="ms-auto">
//                             <NavDropdown
//                                 title={user ? `User: ${user.username}` : 'Dropdown'}
//                                 id="basic-nav-dropdown"
//                                 align="end"
//                             >
//                                 <NavDropdown.Item href="#" onClick={handleLogout}>
//                                     Logout
//                                 </NavDropdown.Item>
//                             </NavDropdown>
//                         </Nav>
//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>

//             {/* Main Content */}
//             <Container className="mt-5">
//                 <h2>Members</h2>
//                 <Button variant="success" onClick={() => handleShowModal(null, 'add')} disabled={loading}>Add New User</Button>
//                 <Table striped bordered hover className="mt-3">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Fullname</th>
//                             <th>Username</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, index) => (
//                             <tr key={`${user.user_id}-${index}`}>
//                                 <td>{user.user_id}</td>
//                                 <td>{user.fullname}</td>
//                                 <td>{user.username}</td>
//                                 <td>
//                                     <Button variant="info" size="sm" onClick={() => handleShowModal(user, 'view')} disabled={loading}>View</Button>{' '}
//                                     <Button variant="info" size="sm" onClick={() => handleShowModal(user, 'edit')} disabled={loading}>Edit</Button>{' '}
//                                     <Button variant="danger" size="sm" onClick={() => handleShowDeleteModal(user)} disabled={loading}>Delete</Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </Container>

//             {/* Modal for Add/Edit/View User */}
//             <Modal show={showModal} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>
//                         {viewingUser ? 'View User' : editMode ? 'Edit User' : 'Add New User'}
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {viewingUser ? (
//                         <div>
//                             <p><strong>Fullname:</strong> {selectedUser?.fullname}</p>
//                             <p><strong>Username:</strong> {selectedUser?.username}</p>
//                         </div>
//                     ) : (
//                         <Form>
//                             <Form.Group controlId="formFullname">
//                                 <Form.Label>Fullname</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     value={newUser.fullname}
//                                     onChange={(e) => setNewUser({ ...newUser, fullname: e.target.value })}
//                                     placeholder="Enter fullname"
//                                     readOnly={viewingUser}
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group controlId="formUsername" className="mt-3">
//                                 <Form.Label>Username</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     value={newUser.username}
//                                     onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
//                                     placeholder="Enter username"
//                                     readOnly={viewingUser}
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group controlId="formPassword" className="mt-3">
//                                 <Form.Label>Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     value={newUser.password}
//                                     onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//                                     placeholder="Enter password"
//                                     readOnly={viewingUser}
//                                     required
//                                 />
//                             </Form.Group>
//                         </Form>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseModal}>
//                         Close
//                     </Button>
//                     {editMode && (
//                         <Button variant="primary" onClick={handleUpdateUser} disabled={loading}>
//                             Update User
//                         </Button>
//                     )}
//                     {!viewingUser && !editMode && (
//                         <Button variant="primary" onClick={handleCreateUser} disabled={loading}>
//                             Create User
//                         </Button>
//                     )}
//                 </Modal.Footer>
//             </Modal>

//             {/* Modal for Confirm Delete User */}
//             <Modal show={confirmDelete} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Confirm Delete User</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     Are you sure you want to delete the user {selectedUser?.fullname}?
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseModal}>
//                         Close
//                     </Button>
//                     <Button variant="danger" onClick={handleDeleteUser} disabled={loading}>
//                         Delete User
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

// export default Dashboard;

// -----------------------------SOME BUTTONS ARE NOT FUNCTIONING------------------------------------
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Nav from 'react-bootstrap/Nav';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
// import Modal from 'react-bootstrap/Modal';

// import { API_ENDPOINT } from './Api';

// function Dashboard() {
//     const [user, setUser] = useState(null);
//     const [users, setUsers] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [confirmDelete, setConfirmDelete] = useState(false);
//     const [selectedUser, setSelectedUser] = useState({ fullname: '', username: '', password: '' });
//     const [newUser, setNewUser] = useState(user ? { user_id: user.user_id, fullname: user.fullname, username: user.username, password: '' } : { user_id: '', fullname: '', username: '', password: '' });
//     const [loading, setLoading] = useState(false);
//     const [viewingUser, setViewingUser] = useState(false);
//     const [editMode, setEditMode] = useState(false);

//     const navigate = useNavigate();

//     // Verify user session on component mount
//     useEffect(() => {
//         const verifyUserSession = () => {
//             try {
//                 const tokenData = JSON.parse(localStorage.getItem('token'));
//                 tokenData?.data ? setUser(tokenData.data) : navigate('/login');
//             } catch {
//                 navigate('/login');
//             }
//         };

//         verifyUserSession();
//     }, [navigate]);

//     // Fetch the list of users
//     const fetchUsers = async () => {
//         try {
//             const token = JSON.parse(localStorage.getItem('token'))?.data?.token;
//             const config = { headers: { Authorization: token } };
//             const response = await axios.get(`${API_ENDPOINT}/users`, config);
//             setUsers(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error.response?.data || error.message);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     // Handle showing modals
//     const handleShowModal = (user = null, action = 'add') => {
//         if (action === 'add') {
//             setEditMode(false);
//             setNewUser(user ? { user_id: user.user_id, fullname: user.fullname, username: user.username, password: '' } : { user_id: '', fullname: '', username: '', password: '' });
//             setShowModal(true);
//         } else if (action === 'edit') {
//             setEditMode(true);
//             setSelectedUser({ fullname: '', username: '', password: '' });
//             setShowModal(true);
//         } else if (action === 'view') {
//             setViewingUser(true);
//             setSelectedUser({ fullname: '', username: '', password: '' });
//             setShowModal(true);
//         }
//     };

//     // Handle closing modals
//     const handleCloseModal = () => {
//         setShowModal(false);
//         setConfirmDelete(false);
//         setEditMode(false);
//         setViewingUser(false);
//         setSelectedUser({ fullname: '', username: '', password: '' });
//         setNewUser(user ? { user_id: user.user_id, fullname: user.fullname, username: user.username, password: '' } : { user_id: '', fullname: '', username: '', password: '' });
//     };

//     // Create a new user
//     const handleCreateUser = async () => {
//         try {
//             const token = JSON.parse(localStorage.getItem('token'))?.data?.token;
//             const config = { headers: { Authorization: token } };
//             await axios.post(`${API_ENDPOINT}/users/register`, newUser, config);
//             fetchUsers();
//             handleCloseModal();
//         } catch (error) {
//             console.error('Error creating user:', error);
//         }
//     };

//     // Update an existing user
//     const handleUpdateUser = async () => {
//         try {
//             setLoading(true);
//             const token = JSON.parse(localStorage.getItem('token'))?.data?.token;
//             const config = { headers: { Authorization: token } };
//             await axios.put(`${API_ENDPOINT}/users/${selectedUser.user_id}`, selectedUser, config);
//             fetchUsers();
//             handleCloseModal();
//         } catch (error) {
//             console.error('Error updating user:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Delete a user
//     const handleDeleteUser = async () => {
//         try {
//             const token = JSON.parse(localStorage.getItem('token'))?.data?.token;
//             const config = { headers: { Authorization: token } };
//             await axios.delete(`${API_ENDPOINT}/users/${selectedUser.user_id}`, config);
//             fetchUsers();
//             handleCloseModal();
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     // Handle logout
//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         navigate('/login');
//     };

//     return (
//         <>
//             {/* Navbar */}
//             <Navbar bg="success" variant="dark">
//                 <Container>
//                     <Navbar.Brand>A'TIN UNIVERSE</Navbar.Brand>
//                     <Nav className="ms-auto">
//                         <NavDropdown title={user?.username || 'User'} align="end">
//                             <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
//                         </NavDropdown>
//                     </Nav>
//                 </Container>
//             </Navbar>

//             {/* Main Content */}
//             <Container className="mt-5">
//                 <h2>Members</h2>
//                 <Button variant="success" onClick={() => handleShowModal()} disabled={loading}>
//                     Add New User
//                 </Button>
//                 <Table striped bordered hover className="mt-3">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Fullname</th>
//                             <th>Username</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, index) => (
//                             <tr key={user.user_id || index}>
//                                 <td>{user.user_id}</td>
//                                 <td>{user.fullname}</td>
//                                 <td>{user.username}</td>
//                                 <td>
//                                     <Button variant="info" size="sm" onClick={() => handleShowModal(user, 'view')}>
//                                         View
//                                     </Button>{' '}
//                                     <Button variant="info" size="sm" onClick={() => handleShowModal(user, 'edit')}>
//                                         Edit
//                                     </Button>{' '}
//                                     <Button
//                                         variant="danger"
//                                         size="sm"
//                                         onClick={() => setConfirmDelete(true) && setSelectedUser(user)}
//                                     >
//                                         Delete
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </Container>

//             {/* Add/Edit/View User Modal */}
//             <Modal show={showModal} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>{viewingUser ? 'View User' : editMode ? 'Edit User' : 'Add New User'}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {viewingUser ? (
//                         <div>
//                             <p>
//                                 <strong>Fullname:</strong> {selectedUser.fullname}
//                             </p>
//                             <p>
//                                 <strong>Username:</strong> {selectedUser.username}
//                             </p>
//                         </div>
//                     ) : (
//                         <Form>
//               <Form.Group>
//     <Form.Label>Fullname</Form.Label>
//     <Form.Control
//         type="text"
//         placeholder="Enter fullname"
//         value={editMode ? selectedUser.fullname || '' : newUser.fullname || ''}
//         onChange={(e) =>
//             editMode
//                 ? setSelectedUser({ ...selectedUser, fullname: e.target.value })
//                 : setNewUser({ ...newUser, fullname: e.target.value })
//         }
//     />
// </Form.Group>
// <Form.Group className="mt-3">
//     <Form.Label>Username</Form.Label>
//     <Form.Control
//         type="text"
//         placeholder="Enter username"
//         value={editMode ? selectedUser.username || '' : newUser.username || ''}
//         onChange={(e) =>
//             editMode
//                 ? setSelectedUser({ ...selectedUser, username: e.target.value })
//                 : setNewUser({ ...newUser, username: e.target.value })
//         }
//     />
// </Form.Group>
// <Form.Group className="mt-3">
//     <Form.Label>Password</Form.Label>
//     <Form.Control
//         type="password"
//         placeholder="Enter password"
//         value={editMode ? selectedUser.password || '' : newUser.password || ''}
//         onChange={(e) =>
//             editMode
//                 ? setSelectedUser({ ...selectedUser, password: e.target.value })
//                 : setNewUser({ ...newUser, password: e.target.value })
//         }
//     />
// </Form.Group>
//                         </Form>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseModal}>
//                         Close
//                     </Button>
//                     {!viewingUser && (
//                         <Button
//                             variant="primary"
//                             onClick={editMode ? handleUpdateUser : handleCreateUser}
//                             disabled={loading}
//                         >
//                             {editMode ? 'Update' : 'Create'}
//                         </Button>
//                     )}
//                 </Modal.Footer>
//             </Modal>

//             {/* Delete Confirmation Modal */}
//             <Modal show={confirmDelete} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Confirm Delete</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     Are you sure you want to delete {selectedUser.fullname}?
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseModal}>
//                         Cancel
//                     </Button>
//                     <Button variant="danger" onClick={handleDeleteUser} disabled={loading}>
//                         Delete
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import { API_ENDPOINT } from './Api';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]); // Store list of users
    const [showModal, setShowModal] = useState(false); // Modal visibility for Add/Edit/View
    const [confirmDelete, setConfirmDelete] = useState(false); // Modal visibility for delete confirmation
    const [selectedUser, setSelectedUser] = useState({ fullname: '', username: '', password: '' }); // Currently selected user for actions
    const [newUser, setNewUser] = useState({ user_id: '', fullname: '', username: '', password: '' }); // New user data
    const [loading, setLoading] = useState(false); // To manage loading state
    const [viewingUser, setViewingUser] = useState(false); // To manage view user modal state
    const [editMode, setEditMode] = useState(false); // To manage edit user mode

    const navigate = useNavigate();

    /* Verify if User In-Session in LocalStorage */
    useEffect(() => {
        const fetchDecodedUserID = async () => {
            try {
                const response = JSON.parse(localStorage.getItem('token'));
                if (response?.data) {
                    setUser(response.data);
                } else {
                    navigate("/login");
                }
            } catch (error) {
                navigate("/login");
            }
        };
        fetchDecodedUserID();
    }, [navigate]);

    /* Fetch Users (READ Operation) ------------functioning-----------------*/
    const fetchUsers = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))?.data?.token;
            const config = {
                headers: {
                    Authorization: `${token}`,
                }
            };
            const response = await axios.get(`${API_ENDPOINT}/users`, config);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error.response ? error.response.data : error.message);
        }
    };

    // const fetchUsers = async () => {
    //     try {
    //         const token = JSON.parse(localStorage.getItem('token'))?.data?.token;
    //         const config = { headers: { Authorization: token } };
    //         const response = await axios.get(`${API_ENDPOINT}/users`, config);
    //         const fetchedUsers = response.data.map((user) => ({
    //             ...user,
    //             fullname: user.fullname || '',
    //             username: user.username || '',
    //         }));
    //         setUsers(fetchedUsers);
    //     } catch (error) {
    //         console.error('Error fetching users:', error.response?.data || error.message);
    //     }
    // };

    useEffect(() => {
        fetchUsers();
    }, []);

    /* Create User */
    const handleCreateUser = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))?.data?.token;
            const config = {
                headers: {
                    Authorization: `${token}`,
                }
            };
            await axios.post(`${API_ENDPOINT}/users/register`, newUser, config);
            fetchUsers(); // Refresh users list after creation
            setShowModal(false); // Close the modal
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    /* Update User */
    // const handleUpdateUser = async () => {
    //     try {
    //         setLoading(true);
    //         const token = JSON.parse(localStorage.getItem('token'))?.data?.token;
    //         const config = {
    //             headers: {
    //                 Authorization: `${token}`,
    //             }
    //         };
    //         await axios.put(`${API_ENDPOINT}/users/${selectedUser.user_id}`, selectedUser, config);
    //         fetchUsers(); // Refresh users list after update
    //         setSelectedUser({ fullname: '', username: '', password: '' });
    //         setShowModal(false);
    //     } catch (error) {
    //         console.error('Error updating user:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleUpdateUser = async () => {
        try {
            setLoading(true);
            
            // Log the user data before sending the request
            console.log('Updating user with data:', selectedUser);
            
            // Retrieve and log the token
            const token = JSON.parse(localStorage.getItem('token'))?.data?.token;
            if (!token) {
                console.error('No authorization token found!');
                return;
            }
            console.log('Authorization token:', token);
            
            const config = {
                headers: {
                    Authorization: `${token}`,
                }
            };
    
            // Send the PUT request
            await axios.put(`${API_ENDPOINT}/users/${selectedUser.user_id}`, selectedUser, config);
            
            // Refresh users list after update
            fetchUsers();
            
            // Reset selectedUser and close the modal
            setSelectedUser({ fullname: '', username: '', password: '' });
            setShowModal(false);
        } catch (error) {
            // Handle and log error
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };
    

    /* Delete User */
    const handleDeleteUser = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))?.data?.token;
            const config = {
                headers: {
                    Authorization: `${token}`,
                }
            };
            if (selectedUser && selectedUser.user_id) {
                await axios.delete(`${API_ENDPOINT}/users/${selectedUser.user_id}`, config);
                fetchUsers(); // Refresh users list after deletion
                setConfirmDelete(false); // Close the confirmation modal
            } else {
                console.error('Invalid user_id for deletion.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // const handleDeleteUser = async () => {
    //     try {
    //         setLoading(true);  // Set loading to true while the request is in progress
    //         const token = JSON.parse(localStorage.getItem('token'))?.data?.token;
    //         const config = {
    //             headers: {
    //                 Authorization: `${token}`,
    //             }
    //         };
    //         await axios.delete(`${API_ENDPOINT}/users/${selectedUser.user_id}`, config);
    //         fetchUsers(); // Refresh users list after deletion
    //         setConfirmDelete(false); // Close the confirmation modal
    //     } catch (error) {
    //         console.error('Error deleting user:', error);
    //     } finally {
    //         setLoading(false); // Set loading to false once the operation is complete
    //     }
    // };
    

    /* Handle Modal Open for Deletion */
    const handleShowDeleteModal = (user) => {
        setSelectedUser(user); // Set the user to delete
        setConfirmDelete(true); // Show delete confirmation modal
    };

    /* Handle Modal Open */
    // const handleShowModal = (user = null, action = 'add') => {
    //     setViewingUser(action === 'view');
    //     setEditMode(action === 'edit'); // Set edit mode when editing a user
    //     setSelectedUser(user);
    //     setNewUser(user ? { user_id: user.user_id, fullname: user.fullname, username: user.username, password: user.password } : { user_id: '', fullname: '', username: '', password: '' });
    //     setShowModal(true);
    // };
// -------------------------functioning------------------------------
    // const handleShowModal = (user = null, action = 'add') => {
    //     if (action === 'add') {
    //         setEditMode(false); // Ensure edit mode is off
    //         setNewUser({ user_id: '', fullname: '', username: '', password: '' }); // Reset new user fields
    //         setShowModal(true); // Show the modal
    //     } else if (action === 'edit') {
    //         setEditMode(true); // Enable edit mode
    //         setSelectedUser({ fullname: '', username: '', password: '' }) // Set the user to edit
    //         setShowModal(true); // Show the modal
    //     } else if (action === 'view') {
    //         setViewingUser(true); // Enable view-only mode
    //         setSelectedUser({ fullname: '', username: '', password: '' }) // Set the user to view
    //         setShowModal(true); // Show the modal
    //     }
    // };

    const handleShowModal = (user = null, action = 'add') => {
        if (action === 'add') {
            setEditMode(false); // Ensure edit mode is off
            setNewUser({ user_id: '', fullname: '', username: '', password: '' }); // Reset new user fields
            setShowModal(true); // Show the modal
        } else if (action === 'edit') {
            setEditMode(true); // Enable edit mode
            setSelectedUser({ 
                user_id: user.user_id,
                fullname: user.fullname || '',
                username: user.username || '',
                password: '' // Password can be edited but not shown for security reasons
            });
            setShowModal(true); // Show the modal
        } else if (action === 'view') {
            setViewingUser(true); // Enable view-only mode
            setSelectedUser({
                user_id: user.user_id,
                fullname: user.fullname || '',
                username: user.username || '',
                password: '' // Display password as empty or some placeholder (optional)
            });
            setShowModal(true); // Show the modal
        }
    };

    // const handleShowModal = (user = null, action = 'add') => {
    //     if (action === 'add') {
    //         setEditMode(false);
    //         setNewUser(user ? { user_id: user.user_id, fullname: user.fullname || '', username: user.username || '', password: user.password } : { user_id: '', fullname: '', username: '', password: '' });
    //         setShowModal(true);
    //     } else if (action === 'edit') {
    //         setEditMode(true);
    //         setSelectedUser({
    //             user_id: user.user_id,
    //             fullname: user.fullname || '',
    //             username: user.username || '',
    //             password: '',
    //         });
    //         setShowModal(true);
    //     }
    // };

    // const handleShowModal = (user = null, action = 'add') => {
    //     if (action === 'add') {
    //         setEditMode(false); // Ensure edit mode is off
    //         setNewUser({ user_id: '', fullname: '', username: '', password: '' }); // Reset new user fields
    //         setShowModal(true); // Show modal for adding new user
    //     } else if (action === 'edit') {
    //         setEditMode(true); // Enable edit mode
    //         setSelectedUser({
    //             user_id: user.user_id,
    //             fullname: user.fullname || '',
    //             username: user.username || '',
    //             password: '', // Password can be edited, but the existing value might be shown for clarity
    //         });
    //         setShowModal(true); // Show modal for editing an existing user
    //     } else if (action === 'view') {
    //         setEditMode(false); // Disable edit mode (view-only)
    //         setSelectedUser({
    //             user_id: user.user_id,
    //             fullname: user.fullname || '',
    //             username: user.username || '',
    //             password: '', // Display password as empty or some placeholder (optional)
    //         });
    //         setShowModal(true); // Show modal for viewing the user's information
    //     }
    // };
    

    /* Handle Modal Close */
    // const handleCloseModal = () => {
    //     setShowModal(false); // Close the Add/Edit/View modal
    //     setConfirmDelete(false); // Close the delete confirmation modal
    //     setSelectedUser(null); // Reset the selected user
    // };

    // ---------functioning---------------------
    const handleCloseModal = () => {
        setShowModal(false); // Close the Add/Edit/View modal
        setConfirmDelete(false); // Close the delete confirmation modal
        setEditMode(false); // Reset edit mode
        setViewingUser(false); // Reset view-only mode
        setSelectedUser({ fullname: '', username: '', password: '' }); // Clear selected user
        setNewUser({ user_id: '', fullname: '', username: '', password: '' }); // Clear new user data
    };

    

    /* Performs Logout Method */
    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            navigate("/login");
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <>
            {/* Navbar */}
            <Navbar bg="success" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">A'TIN Universe</Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavDropdown
                                title={user ? `User: ${user.username}` : 'Dropdown'}
                                id="basic-nav-dropdown"
                                align="end"
                            >
                                <NavDropdown.Item href="#" onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main Content */}
            <Container className="mt-5">
                <h2>Members</h2>
                <Button variant="success" onClick={() => handleShowModal(null, 'add')} disabled={loading}>Add New User</Button>
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fullname</th>
                            <th>Username</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={`${user.user_id}-${index}`}>
                                <td>{user.user_id}</td>
                                <td>{user.fullname}</td>
                                <td>{user.username}</td>
                                <td>
                                    <Button variant="info" size="sm" onClick={() => handleShowModal(user, 'view')} disabled={loading}>View</Button>{' '}
                                    <Button variant="info" size="sm" onClick={() => handleShowModal(user, 'edit')} disabled={loading}>Edit</Button>{' '}
                                    <Button variant="danger" size="sm" onClick={() => handleShowDeleteModal(user)} disabled={loading}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            {/* Modal for Add/Edit/View User */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {/* {viewingUser ? 'View User' : editMode ? 'Edit User' : 'Add New User'} */}
                        {editMode ? 'Edit User' : 'View User'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {viewingUser ? (
                        <div>
                            <p><strong>Fullname:</strong> {selectedUser?.fullname}</p>
                            <p><strong>Username:</strong> {selectedUser?.username}</p>
                            <p><strong>ID:</strong> {selectedUser?.user_id}</p>
                        </div>
                    ) : (
                        <Form>
                            <Form.Group controlId="formFullname">
                                <Form.Label>Fullname</Form.Label>
                                <Form.Control
                                    type="text"
                                    // value={newUser.fullname}
                                    // value={editMode ? selectedUser?.fullname : newUser.fullname} // Bind based on edit mode
                                    value={editMode ? selectedUser.fullname || '' : newUser.fullname || ''}
                                    // onChange={(e) => setNewUser({ ...newUser, fullname: e.target.value })}
                                    onChange={(e) => 
                                        editMode 
                                            ? setSelectedUser({ ...selectedUser, fullname: e.target.value }) 
                                            : setNewUser({ ...newUser, fullname: e.target.value })
                                    }
                                    placeholder="Enter fullname"
                                    readOnly={viewingUser}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formUsername" className="mt-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    // value={editMode ? selectedUser?.username : newUser.username} // Bind based on edit mode
                                    value={editMode ? selectedUser.username || '' : newUser.username || ''}
                                    onChange={(e) => 
                                        editMode 
                                            ? setSelectedUser({ ...selectedUser, username: e.target.value }) 
                                            : setNewUser({ ...newUser, username: e.target.value })
                                    }
                                    placeholder="Enter username"
                                    readOnly={viewingUser}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    // value={editMode ? selectedUser?.password : newUser.password} // Bind based on edit mode
                                    value={editMode ? selectedUser.password || '' : newUser.password || ''}
                                    onChange={(e) => 
                                        editMode 
                                            ? setSelectedUser({ ...selectedUser, password: e.target.value }) 
                                            : setNewUser({ ...newUser, password: e.target.value })
                                    }
                                    placeholder="Enter password"
                                    readOnly={viewingUser}
                                    required
                                />
                            </Form.Group>
                        </Form>

                        // <Form>
                        //     <Form.Group controlId="formFullname">
                        //         <Form.Label>Fullname</Form.Label>
                        //         <Form.Control
                        //             type="text"
                        //             value={selectedUser.fullname || ''}
                        //             onChange={(e) => setSelectedUser({ ...selectedUser, fullname: e.target.value })}
                        //             required
                        //         />
                        //     </Form.Group>
                        //     <Form.Group controlId="formUsername" className="mt-3">
                        //         <Form.Label>Username</Form.Label>
                        //         <Form.Control
                        //             type="text"
                        //             value={selectedUser.username || ''}
                        //             onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                        //             required
                        //         />
                        //     </Form.Group>
                        //      <Form.Group controlId="formPassword" className="mt-3">
                        //         <Form.Label>Password</Form.Label>
                        //         <Form.Control
                        //             type="password"
                        //             value={selectedUser.password || ''}
                        //             onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                        //             required
                        //         />
                        //     </Form.Group>
                        //  </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    {editMode && (
                        <Button variant="primary" onClick={handleUpdateUser} disabled={loading}>
                            Update User
                        </Button>
                    )}
                    {!viewingUser && !editMode && (
                        <Button variant="success" onClick={handleCreateUser} disabled={loading}>
                            Create User
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

            {/* Modal for Confirm Delete User */}
            <Modal show={confirmDelete} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the user {selectedUser?.fullname}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteUser} disabled={loading}>
                        Delete User
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Dashboard;



















