import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, Button, ListGroup, Card, CardHeader } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

import './emp.css';

export const Employee = ({ t }) => {
    const [societies, setSocieties] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [workhours, setWorkhours] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        firstname: '',
        id_departments: '',
        id_societies: '',
        id_work_hours: '',
    });
    const [editedEmployee, setEditedEmployee] = useState({
        name: '',
        firstname: '',
        id_departments: '',
        id_societies: '',
        id_work_hours: '',
    });
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    const editEmployee = (employee) => {
        setIsEditing(employee.id);
        setEditedEmployee({
            name: employee.name,
            firstname: employee.firstname,
            id_departments: employee.id_departments,
            id_societies: employee.id_societies,
            id_work_hours: employee.id_work_hours,
        });
    };

    useEffect(() => {
        fetchEmployees();

        const intervalId = setInterval(() => {
            fetchEmployees();
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/employees');
            setEmployees(response.data.employees);
        } catch (error) {
            if (error.response.status === 429) {
                console.error('Failed to fetch employees:', error);

                await new Promise((resolve) => setTimeout(resolve, 5000));
                fetchEmployees();
            } else {
                console.error('Failed to fetch employees:', error);
            }
        }
    };

    const fetchSocieties = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/societies');
            setSocieties(response.data);
        } catch (error) {
            console.error('Error fetching societies:', error);
        }
    };

    useEffect(() => {
        fetchSocieties();
    }, []);

    const handleClickWorkhour = async (workhourId, workhourName, totalHours, employeeName, employeeFirstName) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/workhourlines/${workhourId}`);
            showWorkhourLinesModal(response.data.workhourlines, workhourName, totalHours, employeeName, employeeFirstName);
        } catch (error) {
            console.error('Error fetching workhour lines:', error);
        }
    };

    const showWorkhourLinesModal = (workhourlines, workhourName, totalHours, employeeName, employeeFirstName) => {
        const tableRows = workhourlines
            .map(
                (line) => `
                <tr>
                    <td>${line.jour}</td>
                    <td>${line.checkin_am}</td>
                    <td>${line.checkout_am}</td>
                    <td>${line.checkin_pm}</td>
                    <td>${line.checkout_pm}</td>
                </tr>
            `
            )
            .join('');

        Swal.fire({
            title: `Workhour Lines - ${workhourName} (${employeeName} ${employeeFirstName})`,
            html: `
                <p>Total Hours: ${totalHours} hours</p>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Check-in AM</th>
                            <th>Check-out AM</th>
                            <th>Check-in PM</th>
                            <th>Check-out PM</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            `,
            confirmButtonText: 'OK',
            customClass: {
                container: 'custom-swal-container',
                popup: 'custom-swal-popup',
                header: 'custom-swal-header',
                title: 'custom-swal-title',
                content: 'custom-swal-content',
                closeButton: 'custom-swal-close-button',
                icon: 'custom-swal-icon',
                image: 'custom-swal-image',
                input: 'custom-swal-input',
                actions: 'custom-swal-actions',
                confirmButton: 'custom-swal-confirm-button',
                cancelButton: 'custom-swal-cancel-button',
                footer: 'custom-swal-footer',
            },
            showConfirmButton: true,
        });
    };

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/departments');
            setDepartments(response.data.departments);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchWorkhours = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/workhours');
            setWorkhours(response.data);
        } catch (error) {
            console.error('Error fetching work hours:', error);
        }
    };

    useEffect(() => {
        fetchWorkhours();
    }, []);

    const createEmployees = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/employees', newEmployee);
            setEmployees([...employees, response.data]);
            setNewEmployee({
                name: '',
                firstname: '',
                id_departments: '',
                id_societies: '',
                id_work_hours: '',
            });
            toast.success('Employee created successfully');
        } catch (error) {
            console.error('Failed to create employee:', error);
        }
    };

    const updateEmployee = async () => {
        try {
            await axios.put(`http://localhost:8000/api/employees/${isEditing}`, editedEmployee);
            toast.info('Employee updated successfully');
            fetchEmployees();
            setIsEditing(null);
            setEditedEmployee({
                name: '',
                firstname: '',
                id_departments: '',
                id_societies: '',
                id_work_hours: '',
            });
        } catch (error) {
            console.error('Failed to update employee:', error);
        }
    };

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/employees/${id}`);
            setEmployees(employees.filter((employee) => employee.id !== id));
            Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
        } catch (error) {
            console.error('Failed to delete employee:', error);
            Swal.fire('Error!', 'Failed to delete employee.', 'error');
        }
    };

    const toggleEmployeeSelection = (id) => {
        if (selectedEmployees.includes(id)) {
            setSelectedEmployees(selectedEmployees.filter((employeeId) => employeeId !== id));
        } else {
            setSelectedEmployees([...selectedEmployees, id]);
        }
    };

    const deleteSelectedEmployees = async () => {
        if (selectedEmployees.length === 0) {
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'This action is irreversible!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete them!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8000/api/employees/delete`, {
                        data: { ids: selectedEmployees },
                    });
                    setEmployees(employees.filter((employee) => !selectedEmployees.includes(employee.id)));
                    setSelectedEmployees([]);
                    Swal.fire('Deleted!', 'Employees have been deleted.', 'success');
                } catch (error) {
                    console.error('Failed to delete employees:', error);
                    Swal.fire('Error!', 'Failed to delete employees.', 'error');
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Employee deletion has been cancelled.', 'error');
            }
        });
    };

    
    return (
            <Row>
                <Col md={5}>
                <Card style={{backgroundColor:'transparents',background:"transparent" ,border:'none'}}>
                {isEditing ? (
                        <Card.Header style={{backgroundColor:'#50b64a', padding:'10px' ,textAlign:'center',color:"white",fontWeight:'bolder'}}>{t('Edit employee')}</Card.Header>
                      ):(
                        <Card.Header style={{backgroundColor:'#50b64a', padding:'10px' ,textAlign:'center',color:"white",fontWeight:'bolder'}}>{t('Create employee')}</Card.Header>
                      )}                        
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>{t('Name')}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={isEditing ? editedEmployee.name : newEmployee.name}
                                onChange={(e) => (isEditing ? setEditedEmployee({ ...editedEmployee, name: e.target.value }) : setNewEmployee({ ...newEmployee, name: e.target.value }))}
                            />
                        </Form.Group>
                        <Form.Group controlId="firstname">
                            <Form.Label>{t('Firstname')}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter firstame"
                                value={isEditing ? editedEmployee.firstname : newEmployee.firstname}
                                onChange={(e) => (isEditing ? setEditedEmployee({ ...editedEmployee, firstname: e.target.value }) : setNewEmployee({ ...newEmployee, firstname: e.target.value }))}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicDepartmentId">
                        <Form.Label>{t('Department')}</Form.Label>
                        <Form.Control as="select" name="id_departments" onChange={(e) => (isEditing ? setEditedEmployee({ ...editedEmployee, id_departments: e.target.value }) : setNewEmployee({ ...newEmployee, id_departments: e.target.value }))} value={isEditing ? editedEmployee.id_departments : newEmployee.id_departments}>
                            <option value="">{t('Select')} {t('Department')}</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.coded}
                                </option>
                            ))}

                        </Form.Control>
                    </Form.Group>
                        <Form.Group controlId="formBasicSocietyId">
                            <Form.Label>{t('Society')}</Form.Label>
                            <Form.Control as="select" name="id_societies" onChange={(e) => (isEditing ? setEditedEmployee({ ...editedEmployee, id_societies: e.target.value }) : setNewEmployee({ ...newEmployee, id_societies: e.target.value }))} value={isEditing ? editedEmployee.id_societies : newEmployee.id_societies}>
                                <option value="">{t('Select')} {t('Society')}</option>
                                {societies && societies.map((society) => (
                                    <option key={society.id} value={society.id}>
                                        {society.company_name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicWorkhourId">
                            <Form.Label>{t('Workhour')}</Form.Label>
                            <Form.Control as="select" name="id_work_hours" onChange={(e) => (isEditing ? setEditedEmployee({ ...editedEmployee, id_work_hours: e.target.value }) : setNewEmployee({ ...newEmployee, id_work_hours: e.target.value }))} value={isEditing ? editedEmployee.id_work_hours : newEmployee.id_work_hours}>
                                <option value="">{t('Select')} {t('Workhour')}</option>
                                {workhours && workhours.map((workhour) => (
                                    <option key={workhour.id} value={workhour.id}>
                                        {workhour.nom}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        {isEditing ? (
                            <Button variant="primary mt-2" onClick={updateEmployee}>
                                {t('Update employee')}
                            </Button>
                        ) : (
                            <Button variant="primary mt-2" onClick={createEmployees}>
                                {t('Create employee')}
                            </Button>
                        )}
                    </Form>
                    </Card>
                </Col>
                    <Col md={7} className="bg-transparent">
                        <Card className='department-table bg-transparent' style={{backgroundColor:'transparent',border:'none'}}>
                        <Card.Header className="" style={{ backgroundColor: '#50b64a', color: 'white', textAlign: 'center' }}>
                            {t('Employee list')}
                            
                        </Card.Header>
                        {selectedEmployees.length > 0 && (
                                <Button variant="danger" onClick={deleteSelectedEmployees} className="ml-2" style={{right:'0'}}>
                                    {t('Delete selected')}
                                </Button>
                            )}
                    <table className='departement-table'    style={{ width: "100%", backgroundColor: "transparent" }}>
                        <thead style={{ backgroundColor: "transparent" }}>
                            <tr>
                                <th>{t('Name')}</th>
                                <th>{t('Firstname')}</th>
                                <th>{t('Workhour')}</th>
                                <th>{t('Society name')}</th>
                                <th>{t('Society logo')}</th>
                                <th>{t('Department')}</th>
                                <th>{t('Actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {employees.length === 0 ? (
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
                        ) : (
                            employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedEmployees.includes(employee.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedEmployees([...selectedEmployees, employee.id]);
                                                } else {
                                                    setSelectedEmployees(selectedEmployees.filter(id => id !== employee.id));
                                                }
                                            }}
                                        />
                                    </td>
                                    <td>{employee.name}</td>
                                    <td>{employee.firstname}</td>
                                   <td><p onClick={() => handleClickWorkhour(employee.workhour?.id, employee.workhour?.nom, employee.workhour?.total_hour, employee.name, employee.firstname)} className='workhour-emp clickable'>{employee.workhour?.nom}</p></td>
                                    <td>{employee.society?.company_name}</td>
                                    <td><img width="50px" src={`http://localhost:8000/storage/society/logo/${employee.society?.logo}`} alt="Society Logo" /></td>
                                    <td>{employee.department?.description}</td>
                                    <td>
                                        <button className="btn btn-primary ml-2" onClick={() => editEmployee(employee)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className="btn btn-danger" onClick={() => deleteEmployee(employee.id)}>
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
