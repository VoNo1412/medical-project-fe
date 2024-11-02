import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/appointments');
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div>
            <h3>Booked Appointments</h3>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Gender</th>
                    <th>Birth Year</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Doctor</th>
                    <th>Content</th>
                    <th>Created At</th>
                </tr>
                </thead>
                <tbody>
                {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                        <td>{appointment.id}</td>
                        <td>{appointment.fullname}</td>
                        <td>{appointment.phone}</td>
                        <td>{appointment.address}</td>
                        <td>{appointment.gender}</td>
                        <td>{appointment.birth_year}</td>
                        <td>{appointment.appointment_date}</td>
                        <td>{appointment.appointment_time}</td>
                        <td>{appointment.doctor_name}</td>
                        <td>{appointment.content}</td>
                        <td>{appointment.created_at}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentList;