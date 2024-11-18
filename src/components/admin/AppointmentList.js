import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';


// Component AppointmentList để hiển thị danh sách các cuộc hẹn
const AppointmentList = () => {
    // Khai báo state để lưu trữ danh sách các cuộc hẹn
    const [appointments, setAppointments] = useState([]);

    // useEffect chạy khi component được render lần đầu tiên
    useEffect(() => {
        // Hàm fetchAppointments để lấy dữ liệu các cuộc hẹn từ API
        const fetchAppointments = async () => {
            try {
                // Gửi yêu cầu GET đến API để lấy danh sách cuộc hẹn
                const response = await axios.get('http://localhost:8080/appointments');
                // Cập nhật state với dữ liệu nhận được từ API
                setAppointments(response.data);
            } catch (error) {
                // Xử lý lỗi nếu xảy ra khi lấy dữ liệu
                console.error('Error fetching appointments:', error);
            }
        };

        // Gọi hàm fetchAppointments
        fetchAppointments();
    }, []);

    // Hàm kiểm tra xem cuộc hẹn có trùng lặp với cuộc hẹn khác hay không
    const checkForDuplicates = (appointment, index) => {
        return appointments.some((otherAppointment, otherIndex) =>
            otherIndex !== index && // Đảm bảo không so sánh với chính cuộc hẹn hiện tại
            appointment.appointment_date === otherAppointment.appointment_date && // Kiểm tra ngày hẹn
            appointment.appointment_time === otherAppointment.appointment_time && // Kiểm tra giờ hẹn
            appointment.doctor_name === otherAppointment.doctor_name // Kiểm tra bác sĩ
        );
    };

    // Hàm xác nhận cuộc hẹn
    const confirmAppointment = async (id) => {
        try {
            await axios.put(`http://localhost:8080/appointments/${id}/confirm`);
            setAppointments(appointments.map(appointment =>
                appointment.id === id ? { ...appointment, status: 'accept' } : appointment
            ));
        } catch (error) {
            console.error('Error confirming appointment:', error);
        }
    };

    // Hàm từ chối cuộc hẹn
    const rejectAppointment = async (id) => {
        try {
            await axios.put(`http://localhost:8080/appointments/${id}/reject`);
            setAppointments(appointments.map(appointment =>
                appointment.id === id ? { ...appointment, status: 'reject' } : appointment
            ));
        } catch (error) {
            console.error('Error rejecting appointment:', error);
        }
    };

    return (
        <div>
            <h3>Danh sách đặt lịch</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Họ và tên</th>
                        <th>Ngày hẹn</th>
                        <th>Giờ hẹn</th>
                        <th>Bác sĩ</th>
                        <th>Nội dung</th>
                        <th>Ngày tạo</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Duyệt qua từng cuộc hẹn và hiển thị trong bảng */}
                    {appointments.map((appointment, index) => (
                        <tr key={appointment.id}>
                            {/* Kiểm tra trùng lặp và thêm class 'highlight' nếu có trùng lặp */}
                            <td className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.fullname}</td>
                            <td className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{new Date(appointment.appointment_date).toLocaleDateString('en-GB')}</td>
                            <td className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.appointment_time}</td>
                            <td className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.doctor_name}</td>
                            <td className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{appointment.content}</td>
                            <td className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>{new Date(appointment.appointment_date).toLocaleString('en-GB')}</td>
                            <td className={checkForDuplicates(appointment, index) ? 'highlight' : ''}>
                                {appointment.status === 'accept' ? 'Đã xác nhận' : appointment.status === 'reject' ? 'Đã từ chối' : 'Đang chờ'}
                            </td>
                            <td>
                                {appointment.status !== 'accept' && appointment.status !== 'reject' && (
                                    <>
                                        <FaCheck onClick={() => confirmAppointment(appointment.id)} style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }} />
                                        <FaTimes onClick={() => rejectAppointment(appointment.id)} style={{ cursor: 'pointer', color: 'red' }} />
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentList;
