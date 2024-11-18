import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MedicalRecordList = () => {
    const [records, setRecords] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [editingRecord, setEditingRecord] = useState(null);
    const [formData, setFormData] = useState({
        patient_id: '',
        doctor_id: '',
        diagnosis: '',
        treatment: '',
        record_date: ''
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchRecords();
        fetchDoctors();
        fetchPatients();
    }, []);

    const fetchRecords = async () => {
        try {
            const response = await axios.get('https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/medical-records');
            if (Array.isArray(response.data)) {
                setRecords(response.data);
            } else {
                setRecords([]);
                toast.error('Dữ liệu bệnh án không hợp lệ');
            }
        } catch (error) {
            toast.error('Không thể lấy dữ liệu bệnh án');
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/doctors');
            setDoctors(response.data);
        } catch (error) {
            toast.error('Không thể lấy dữ liệu bác sĩ');
        }
    };

    const fetchPatients = async () => {
        try {
            const response = await axios.get('https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/patients');
            setPatients(response.data);
        } catch (error) {
            toast.error('Không thể lấy dữ liệu bệnh nhân');
        }
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
        setFormData({
            patient_id: record.patient_id,
            doctor_id: record.doctor_id,
            diagnosis: record.diagnosis,
            treatment: record.treatment,
            record_date: record.record_date
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/medical-records/${id}`);
            toast.success('Xóa bệnh án thành công');
            fetchRecords();
        } catch (error) {
            toast.error('Không thể xóa bệnh án');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingRecord) {
                await axios.put(`https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/medical-records/${editingRecord.id}`, formData);
                toast.success('Cập nhật bệnh án thành công');
            } else {
                await axios.post('https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/medical-records', formData);
                toast.success('Thêm bệnh án thành công');
            }
            setEditingRecord(null);
            setFormData({
                patient_id: '',
                doctor_id: '',
                diagnosis: '',
                treatment: '',
                record_date: ''
            });
            setShowForm(false);
            fetchRecords();
        } catch (error) {
            toast.error('Không thể gửi biểu mẫu');
        }
    };

    return (
        <div>
            <h3>Quản lý Bệnh án</h3>
            <button className="btn btn-primary my-3" onClick={() => setShowForm(true)}>Thêm Bệnh án</button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="patient_id">Mã Bệnh nhân:</label>
                    <select
                        id="patient_id"
                        name="patient_id"
                        className="form-control"
                        value={formData.patient_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Chọn Bệnh nhân</option>
                        {patients.map(patient => (
                            <option key={patient.id} value={patient.id}>{patient.fullname}</option>
                        ))}
                    </select>
                    <label htmlFor="doctor_id">Mã Bác sĩ:</label>
                    <select
                        id="doctor_id"
                        name="doctor_id"
                        className="form-control"
                        value={formData.doctor_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Chọn Bác sĩ</option>
                        {doctors.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>{doctor.fullname}</option>
                        ))}
                    </select>
                    <label htmlFor="diagnosis">Chẩn đoán:</label>
                    <textarea
                        id="diagnosis"
                        name="diagnosis"
                        value={formData.diagnosis}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <label htmlFor="treatment">Điều trị:</label>
                    <textarea
                        id="treatment"
                        name="treatment"
                        value={formData.treatment}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <label htmlFor="record_date">Ngày ghi nhận:</label>
                    <input
                        type="date"
                        id="record_date"
                        name="record_date"
                        value={formData.record_date}
                        onChange={handleChange}
                        required
                    />
                    <div className="d-flex justify-content-center">
                        <button className="w-25 m-3" type="submit">{editingRecord ? 'Cập nhật' : 'Thêm'} Bệnh án</button>
                        <button className="w-25 m-3" type="button" onClick={() => setShowForm(false)}>Hủy</button>
                    </div>
                </form>
            )}
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên Bệnh nhân</th>
                    <th>Tên Bác sĩ</th>
                    <th>Chẩn đoán</th>
                    <th>Điều trị</th>
                    <th>Ngày ghi nhận</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {records.map(record => (
                    <tr key={record.id}>
                        <td>{record.id}</td>
                        <td>{record.patient_name}</td>
                        <td>{record.doctor_name}</td>
                        <td>{record.diagnosis}</td>
                        <td>{record.treatment}</td>
                        <td>{new Date(record.record_date).toLocaleDateString()}</td>
                        <td>
                            <button className="btn btn-primary m-3" onClick={() => handleEdit(record)}>Sửa</button>
                            <button className="btn btn-warning m-3" onClick={() => {
                                if (window.confirm('Are you sure you want to delete this record?')) {
                                    handleDelete(record.id);
                                }
                            }}>Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MedicalRecordList;