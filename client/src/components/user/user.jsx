import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars, faMoneyBill, faCog, faEdit, faTasks,faSignOutAlt,faUserCircle, faTachometerAlt,faUsers,faBuilding,faUserFriends, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Swal from 'sweetalert2';
import './user.css'

export const User = ({t}) => {
  const [isEditing, setIsEditing] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    id_employees: "",
    id_departments: "",
    id_societies: ""
  });
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [societies, setSocieties] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchSocieties();
    fetchEmployees();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchSocieties = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/societies");
      setSocieties(response.data);
    } catch (error) {
      console.error("Error fetching societies:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      console.log("Saving user data:", userData);
      await axios.put(`http://localhost:8000/api/users/${userData.id}`, userData);
      Swal.fire({
        icon: 'success',
        title: 'User updated successfully',
        showConfirmButton: false,
        timer: 1500
      });
      fetchUsers();
      setIsEditing(null);
      setUserData({
        name: "",
        email: "",
        password: "",
        role: "",
        id_employees: "",
        id_departments: "",
        id_societies: ""
      });
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update user. Please try again later.'
      });
    }
  };
  
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      console.log("Adding user data:", userData);
      await axios.post("http://localhost:8000/api/users", userData);
      Swal.fire({
        icon: 'success',
        title: 'User created successfully',
        showConfirmButton: false,
        timer: 1500
      });
      fetchUsers();
      setUserData({
        name: "",
        email: "",
        password: "",
        role: "",
        id_employees: "",
        id_departments: "",
        id_societies: ""
      });
    } catch (error) {
      console.error("Error creating user:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create user. Please try again later.'
      });
    }
  };

  const handleSubmit = isEditing ? handleSave : handleAdd;

  const deleteUser = async (userId) => {
    const isConfirmed = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You are about to delete this user. This action cannot be undone.',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });
  
    if (isConfirmed.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${userId}`);
        fetchUsers();
        Swal.fire({
          icon: 'success',
          title: 'User deleted successfully',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete user. Please try again later.'
        });
      }
    }
  };
  

  const handleEdit = (userId) => {
    const userToEdit = users.find(user => user.id === userId);
    setIsEditing(userId);
    setUserData(userToEdit);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
      try {
          const response = await axios.get('http://localhost:8000/api/departments');
          setDepartments(response.data.departments);
      } catch (error) {
          console.error('Failed to fetch departments:', error);
      }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setUserData({
      name: "",
      email: "",
      password: "",
      role: "",
      id_employees: "",
      id_departments: "",
      id_societies: ""
    });
  };
  const fetchEmployees = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/employees");
        setEmployees(response.data.employees);
    } catch (error) {
        console.error("Failed to fetch employees:", error);
    }
};

  return (
    <Row>
      <Col className="col-md-4" style={{ borderRight:"1px solid grey"}}>
        <Card style={{background:"transparent" ,borderRight:'none',borderRadius:'none',border:'none'}}>
        <Card.Body style={{ borderLeft: 'none' }}>
          {isEditing ? (
              <Card.Header style={{backgroundColor:'#50b64a', padding:'10px' ,textAlign:'center',color:"white",fontWeight:'bolder'}}>{t('Modify user')}</Card.Header>
          ):(
            <Card.Header style={{backgroundColor:'#50b64a', padding:'10px' ,textAlign:'center',color:"white",fontWeight:'bolder'}}>{t('Add user')}</Card.Header>
          )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>{t('Name')}</Form.Label>
                <Form.Control type="text" placeholder={t('Enter name')} name="name" value={userData.name} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
              <Form.Label>{t('Email')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('Enter email')}
                name="email"
                value={userData.email}
                onChange={handleChange}
                autoComplete="off" 
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>{t('Password')}</Form.Label>
              <Form.Control
                type="password"
                placeholder="**********"
                name="password"
                value={userData.password}
                onChange={handleChange}
                autoComplete="off" 
                required
              />
            </Form.Group>
              <Form.Group controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" placeholder="Role" name="role" value={userData.role} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formBasicEmployeeID">
                <Form.Label>{t('Employee')}</Form.Label>
                <Form.Control as="select" name="id_employees" value={userData.id_employees} onChange={handleChange} required>
                  <option value="">{t('Select')} {t('Employee')}</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicSocietyId">
                <Form.Label>{t('Society')}</Form.Label>
                <Form.Control as="select" name="id_societies" value={userData.id_societies} onChange={handleChange} required>
                  <option value="">{t('Select')} {t('Society')}</option>
                  {societies.map((society) => (
                    <option key={society.id} value={society.id}>{society.company_name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicDepartmentId">
                <Form.Label>{t('Department')}</Form.Label>
                <Form.Control as="select" name="id_departments" value={userData.id_departments} onChange={handleChange} required>
                  <option value="">{t('Select')} {('Departement')}</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>{department.description}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              {isEditing ? (
              <>
                <Button variant="primary" type="submit" className="mt-2">
                  {t('Edit')}
                </Button>
                <span>&nbsp;</span>
                <Button variant="secondary" className="mt-2 ml-2" onClick={handleCancel}>
                  {t('Cancel')}
                </Button>
              </>
            ) : (
              <Button variant="primary" type="submit" className="mt-2">
                {t('Add')}
              </Button>     
            )}

            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col style={{maxHeight:'80vh', overflowY:"auto"}}>
        <Card className="bg-transparent user-card" style={{border:'none'}}>
          <Card.Body>
          <Card.Header style={{backgroundColor:'#50b64a', padding:'10px' ,textAlign:'center',color:"white",fontWeight:'bolder'}}>{t('User list')}</Card.Header>
            <table style={{width:'100%'}}>
              <thead>
                <tr>
                  <th>{t('Name')}</th>
                  <th>{('Email')}</th>
                  <th>Role</th>

                </tr>
              </thead>
              <tbody>
              {users.length === 0 ? (
                           <tr>
                        <td colSpan="6" className="text-center">
                        <div className="dot-spinner">
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                        </div>
                        </td>
                    </tr>
                        ) : (users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className="col-md-2" style={{textAlign:'center',borderTop:'1px solid grey'}}>
                      <button className="btn btn-primary" onClick={() => handleEdit(user.id)}><FontAwesomeIcon icon={faEdit}/></button>
                      <span>&nbsp;</span>
                      <button className="btn btn-danger" onClick={() => deleteUser(user.id)}><FontAwesomeIcon icon={faTrash}/></button>
                    </td>                 
                  </tr>
                ))
              )}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
