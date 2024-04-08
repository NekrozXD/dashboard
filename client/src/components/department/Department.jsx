import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Form, Button, ListGroup, Card, CardHeader } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './departement.css';

export const Department = ({t}) => {
    const [societies, setSocieties] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [newDepartment, setNewDepartment] = useState({
        coded: "",
        description: "",
        id_societies: "",
    });
    const [editedDepartment, setEditedDepartment] = useState({
        coded: "",
        description: "",
        id_societies: "",
    });

    const editDepartment = (department) => {
        setIsEditing(department.id);
        setEditedDepartment({
            coded: department.coded,
            description: department.description,
            id_societies: department.id_societies,
        });
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/departments");
            setDepartments(response.data.departments);
        } catch (error) {
            console.error("Failed to fetch departments:", error);
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

    useEffect(() => {
        fetchSocieties();
    }, []);

    const createDepartment = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/departments", newDepartment);
            setDepartments([...departments, response.data.department]);
            setNewDepartment({
                coded: "",
                description: "",
                id_societies: "",
            });
            fetchDepartments();
            fetchSocieties();
            toast.success('Department created succesfully');
        } catch (error) {
            console.error("Failed to create department:", error);
        }
    };

    const updateDepartment = async () => {
        try {
            await axios.put(`http://localhost:8000/api/departments/${isEditing}`, editedDepartment);
            setDepartments(departments.map((department) => (department.id === isEditing ? editedDepartment : department)));
            setIsEditing(null);
            setEditedDepartment({
                coded: "",
                description: "",
                id_societies: "",
            });
            toast.info('Department updated succesfully');
            fetchDepartments();
            fetchSocieties();
        } catch (error) {
            console.error("Failed to update department:", error);
        }
    };

    const deleteDepartment = async (id) => {
        console.log("Deleting department with ID:", id);
        try {
            await axios.delete(`http://localhost:8000/api/departments/${id}`);
            setDepartments(departments.filter((department) => department.id !== id));
        } catch (error) {
            console.error("Failed to delete department:", error);
        }
    };

    return (
       
            <Row>
                <Col md={5}>
                <Card style={{backgroundColor:'transparents',background:"transparent" ,border:'none'}}>
                {/* <Card.Body style={{ borderLeft: 'none' }}> */}
          {isEditing ? (
              <Card.Header style={{backgroundColor:'#50b64a', padding:'10px' ,textAlign:'center',color:"white",fontWeight:'bolder'}}>{t('Modify department')}</Card.Header>
          ):(
            <Card.Header style={{backgroundColor:'#50b64a', padding:'10px' ,textAlign:'center',color:"white",fontWeight:'bolder'}}>{t('Add department')}</Card.Header>
          )}
        <Form>
                        <Form.Group controlId="coded">
                            <Form.Label>{t('Coded')}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t('Enter coded')}
                                value={isEditing ? editedDepartment.coded : newDepartment.coded}
                                onChange={(e) => (isEditing ? setEditedDepartment({ ...editedDepartment, coded: e.target.value }) : setNewDepartment({ ...newDepartment, coded: e.target.value }))}
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t('Enter description')}
                                value={isEditing ? editedDepartment.description : newDepartment.description}
                                onChange={(e) => (isEditing ? setEditedDepartment({ ...editedDepartment, description: e.target.value }) : setNewDepartment({ ...newDepartment, description: e.target.value }))}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicSocietyId">
                            <Form.Label>{t('Society')}</Form.Label>
                            <Form.Control as="select" name="id_societies" onChange={(e) => (isEditing ? setEditedDepartment({ ...editedDepartment, id_societies: e.target.value }) : setNewDepartment({ ...newDepartment, id_societies: e.target.value }))} value={isEditing ? editedDepartment.id_societies : newDepartment.id_societies}>
                                <option value="">{t('Select')} {t('Society')}</option>
                                {societies.map((society) => (
                                    <option key={society.id} value={society.id}>
                                        {society.company_name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        {isEditing ? (
                            <Button variant="primary mt-2" onClick={updateDepartment}>
                                {t('Update department')}
                            </Button>
                        ) : (
                            <Button variant="primary mt-2" onClick={createDepartment}>
                                {t('Create department')}
                            </Button>
                        )}
                    </Form>
                    </Card>
                </Col>
                <Col md={7} className="bg-transparent">
                    <Card className='department-table bg-transparent' style={{backgroundColor:'transparent',border:'none'}}>
                    <Card.Header className='' style={{backgroundColor:'#50b64a', padding:'10px' ,textAlign:'center',color:"white",fontWeight:'bolder'}}>{t('Department list')}</Card.Header>
                    <table className='departement-table'    style={{ width: "100%", backgroundColor: "transparent" }}>
                        <thead style={{ backgroundColor: "transparent" }}>
                            <tr>
                                <th>{t('Coded')}</th>
                                <th>Description</th>
                                <th>{t('Society')}</th>
                                <th>{t('Society logo')}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {departments.length === 0 ? (
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
                        ) : (departments.map((department) => (
                                <tr key={department.id}>
                                    <td>{department.coded}</td>
                                    <td>{department.description}</td>
                                    <td>{department.society?.company_name}</td>
                                    <td><img width="50px" src={`http://localhost:8000/storage/society/logo/${department.society?.logo}`} alt="Society Logo" /></td>
                                    <td>
                                        <button className="btn btn-primary ml-2" onClick={() => editDepartment(department)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className="btn btn-danger" onClick={() => deleteDepartment(department.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        <span>&nbsp;</span>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                    </Card>
                </Col>
                <ToastContainer />
            </Row>
    );
};

