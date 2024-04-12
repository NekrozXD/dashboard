import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, Row, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

const WorkhourMapping = ({t}) => {
    const [data, setData] = useState({ workhours: [], workhourlines: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/workhours-with-lines');
                console.log('API Response:', response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const convertDecimalToHoursAndMinutes = (decimalHours) => {
        const hours = Math.floor(decimalHours);
        const minutes = Math.round((decimalHours - hours) * 60);
        return `${hours} hours ${minutes} minutes`;
    };

    // const deleteWorkhourlines = async (id) => {
    //     const isConfirm = await Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         return result.isConfirmed;
    //     });

    //     if (!isConfirm) {
    //         return;
    //     }

    //     await axios.delete(`http://localhost:8000/api/workhourlines/${id}`).then(({ data }) => {
    //         Swal.fire({
    //             icon: "success",
    //             text: data.message
    //         });
    //         fetchData();
    //     }).catch(({ response: { data } }) => {
    //         Swal.fire({
    //             text: "Failed to delete workhourlines",
    //             icon: "error"
    //         });
    //     });
    // };


    const deleteWorkhours = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            return result.isConfirmed;
        });

        if (!isConfirm) {
            return;
        }

        await axios.delete(`http://localhost:8000/api/workhours/${id}`).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            });
            fetchData();
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: "Failed to delete workhours",
                icon: "error"
            });
        });
    };
    return (
        <div>
            <h2>{t('Workhour mapping')}</h2>

            {data.workhours.slice().reverse().map((workhour) => (
                <div key={workhour.id}>
                    <Card className='mt-5'>
                        <CardHeader className='text-light' style={{ backgroundColor: '#50b64a' }}>
                            <h5>{workhour.nom}</h5>
                            <h5>{t('Total hour')}: {convertDecimalToHoursAndMinutes(workhour.total_hour)} {t('per week')}</h5>
                            <h5>{t('Delay tolerance')}: {workhour.delay_tolerance} minutes</h5>
                            <Button style={{ width: '50px' }} className='btn btn-danger' onClick={() => deleteWorkhours(workhour.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                        </CardHeader>
                        <Table striped bordered hover style={{ textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th>{t('Day')}</th>
                                    <th>Check-in AM</th>
                                    <th>Check-out AM</th>
                                    <th>Check-in PM</th>
                                    <th>Check-out PM</th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {data.workhourlines
                                    .filter((line) => line.id_work_hours === workhour.id)
                                    .map((line) => (
                                        <tr key={line.id}>
                                            <td>{line.jour}</td>
                                            <td>{line.checkin_am}</td>
                                            <td>{line.checkout_am}</td>
                                            <td>{line.checkin_pm}</td>
                                            <td>{line.checkout_pm}</td>
                                            {/* <td className='col-md-1'>
                                                <Button style={{ width: '50px' }} className='btn btn-primary'><FontAwesomeIcon icon={faEdit} /></Button>
                                                <span>&nbsp;</span>
                                                <Button style={{ width: '50px' }} className='btn btn-danger' onClick={() => deleteWorkhourlines(line.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </td> */}
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default WorkhourMapping;
