import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Dashboard = () => {
  const [attendanceData, setAttendanceData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/liste');
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!attendanceData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Employee Attendance Data</h2>
      <p>Total Employees: {attendanceData.employee_total}</p>
      <p>Present Employees: {attendanceData.employee_present}</p>
      <p>Absent Employees: {attendanceData.employee_absent}</p>
      <p>Non-late Employees: {attendanceData.employee_non_retard}</p>
      <p>Late Employees: {attendanceData.employee_retard}</p>

      <h3>Employee Attendance Details</h3>
      <ul>
        {attendanceData.attendance.map((employee) => (
          <li key={employee.id_employe}>
            Employee: {employee.employee} - Presence: {employee.presence ? 'Present' : 'Absent'} - Late: {employee.retard ? 'Yes' : 'No'} ({employee.value_retard})
          </li>
        ))}
      </ul>
    </div>
  );
};

