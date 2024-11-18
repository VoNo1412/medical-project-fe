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
            <h3>Danh sách đặt lịch</h3>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Họ và tên</th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Giới tính</th>
                    <th>Năm sinh</th>
                    <th>Ngày hẹn</th>
                    <th>Giờ hẹn</th>
                    <th>Bác sĩ</th>
                    <th>Nội dung</th>
                    <th>Ngày tạo</th>
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
                        <td>{new Date(appointment.appointment_date).toLocaleDateString('en-GB')}</td>
                        <td>{appointment.appointment_time}</td>
                        <td>{appointment.doctor_name}</td>
                        <td>{appointment.content}</td>
                        <td>{new Date(appointment.appointment_date).toLocaleString('en-GB')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentList;