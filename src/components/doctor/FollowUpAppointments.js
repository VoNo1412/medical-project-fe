import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import useUserStore from '../../store/userStore';

const FollowUpAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState({ id: '', patientName: '', followUpDate: '', notes: '', doctorId: '' });
    const [isEditing, setIsEditing] = useState(false);
    const { user, setUser } = useUserStore();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token'); // Lấy token từ localStorage
            const response = await axios.get('http://localhost:8080/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);

            var user_id = response.data.profile?.id;

            await fetchFollowUpAppointments(user_id);
            await fetchAppointments(user_id);
            await fetchDoctors();
        };

        fetchUserData();
    }, [setUser]);

    const fetchAppointments = async (user_id) => {
        try {
            const response = await axios.get('http://localhost:8080/appointments');
            const filteredAppointments = response.data.filter(appointment => appointment.doctor_id == user_id);
            const uniquePatients = Array.from(new Set(filteredAppointments.map(a => a.user_id)))
                .map(id => {
                    return filteredAppointments.find(a => a.user_id == id);
                });

            setPatients(uniquePatients);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const fetchFollowUpAppointments = async (user_id) => {
        try {
            const response = await axios.get('http://localhost:8080/follow-up-appointments', { withCredentials: true });
            const filteredAppointments = response.data.filter(appointment => appointment.doctor_id == user_id);

            setAppointments(filteredAppointments);
        } catch (error) {
            console.error('Error fetching follow-up appointments:', error);
        }
    };

    const fetchPatients = async () => {
        try {
            const response = await axios.get('http://localhost:8080/patients', { withCredentials: true });
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/doctors', { withCredentials: true });
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const today = new Date().toISOString().split('T')[0];
        if (form.followUpDate < today) {
            alert('Follow-up date cannot be in the past');
            return;
        }
        try {
            var doctor_id = user.profile?.id;
            form.doctorId = doctor_id;
            if (isEditing) {
                await axios.put(`http://localhost:8080/follow-up-appointments/${form.id}`, form, { withCredentials: true });
            } else {
                await axios.post('http://localhost:8080/follow-up-appointments', form, { withCredentials: true });
            }
            fetchAppointments();
            setForm({ id: '', patientName: '', followUpDate: '', time: '', notes: '', doctorId: '' });
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving follow-up appointment:', error);
        }
    };

    const handleEdit = (appointment) => {
        setForm({
            id: appointment.id || '',
            patientName: appointment.patient_id || '',
            followUpDate: appointment.follow_up_date ? new Date(appointment.follow_up_date).toISOString().split('T')[0] : '',
            time: appointment.time || '',
            notes: appointment.notes || '',
            doctorId: appointment.doctor_id || ''
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/follow-up-appointments/${id}`, { withCredentials: true });
            fetchAppointments();
        } catch (error) {
            console.error('Error deleting follow-up appointment:', error);
        }
    };

    var doctor_id = user.profile?.id;

    // Create a map to track occurrences of each date and time combination
    const dateTimeMap = {};
    appointments.forEach(appointment => {
        const dateTime = `${appointment.follow_up_date}-${appointment.time}`;
        if (dateTimeMap[dateTime]) {
            dateTimeMap[dateTime]++;
        } else {
            dateTimeMap[dateTime] = 1;
        }
    });

    return (
        <div>
            <h3>Lịch tái khám</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Bệnh nhân</label>
                    <select className="form-control" name="patientName" value={form.patientName}
                            onChange={handleInputChange} required>
                        <option value="">Chọn bệnh nhân</option>
                        {patients.map(patient => (
                            <option key={patient.user_id} value={patient.user_id}>{patient.fullname}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <input type="hidden" name="doctorId" value={doctor_id}/>
                    <label>Bác sĩ</label>
                    <select disabled className="form-control" value={doctor_id} onChange={handleInputChange} required>
                        <option value="">Chọn bác sĩ</option>
                        {doctors.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>{doctor.fullname}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Ngày tái khám</label>
                    <input type="date" className="form-control" name="followUpDate" value={form.followUpDate}
                           onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                    <label>Giờ tái khám</label>
                    <input type="time" className="form-control" name="time" value={form.time}
                           onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                    <label>Ghi chú</label>
                    <textarea className="form-control" name="notes" value={form.notes}
                              onChange={handleInputChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">{isEditing ? 'Cập nhật' : 'Thêm'}</button>
            </form>
            <table className="table table-striped mt-3">
                <thead>
                <tr>
                    <th>Bệnh nhân</th>
                    <th>Ngày tái khám</th>
                    <th>Giờ tái khám</th>
                    <th>Ghi chú</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {appointments.map(appointment => {
                    const dateTime = `${appointment.follow_up_date}-${appointment.time}`;
                    const isDuplicate = dateTimeMap[dateTime] > 1;
                    return (
                        <tr key={appointment.id} className={isDuplicate ? 'table-danger' : ''}>
                            <td>{appointment.patient_name}</td>
                            <td>{new Date(appointment.follow_up_date).toLocaleDateString()}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.notes}</td>
                            <td>
                                <button className="btn-icon edit-icon m-2" onClick={() => handleEdit(appointment)}
                                        title="Sửa">
                                    <i className="bi bi-pencil-fill"></i>
                                </button>
                                <button
                                    className="btn-icon delete-icon"
                                    onClick={() => {
                                        if (window.confirm('Bạn có chắc chắn muốn xóa lịch tái khám này không?')) {
                                            handleDelete(appointment.id);
                                        }
                                    }}
                                    title="Xóa"
                                >
                                    <i className="bi bi-trash-fill"></i>
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default FollowUpAppointments;