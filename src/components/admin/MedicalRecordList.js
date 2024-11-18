import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const MedicalRecordList = () => {
    const [records, setRecords] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [services, setServices] = useState([]);
    const [editingRecord, setEditingRecord] = useState(null);
    const [formData, setFormData] = useState({
        patient_id: '',
        doctor_id: '',
        diagnosis: '',
        treatment: '',
        record_date: '',
        services: []
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchRecords();
        fetchDoctors();
        fetchPatients();
        fetchServices();
    }, []);

    const fetchRecords = async () => {
        try {
            const response = await axios.get('http://localhost:8080/medical-records');
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
            const response = await axios.get('http://localhost:8080/doctors');
            setDoctors(response.data);
        } catch (error) {
            toast.error('Không thể lấy dữ liệu bác sĩ');
        }
    };

    const fetchPatients = async () => {
        try {
            const response = await axios.get('http://localhost:8080/patients');
            setPatients(response.data);
        } catch (error) {
            toast.error('Không thể lấy dữ liệu bệnh nhân');
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:8080/services');
            setServices(response.data);
        } catch (error) {
            toast.error('Không thể lấy dữ liệu dịch vụ');
        }
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
        setFormData({
            patient_id: record.patient_id,
            doctor_id: record.doctor_id,
            diagnosis: record.diagnosis,
            treatment: record.treatment,
            record_date: record.record_date,
            services: JSON.parse(record.services || '[]')
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/medical-records/${id}`);
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

    const handleServiceChange = (e) => {
        const { options } = e.target;
        const selectedServices = [];
        for (const option of options) {
            if (option.selected) {
                selectedServices.push(option.value);
            }
        }
        setFormData({ ...formData, services: selectedServices });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingRecord) {
                await axios.put(`http://localhost:8080/medical-records/${editingRecord.id}`, { ...formData, services: JSON.stringify(formData.services) });
                toast.success('Cập nhật bệnh án thành công');
            } else {
                await axios.post('http://localhost:8080/medical-records', { ...formData, services: JSON.stringify(formData.services) });
                toast.success('Thêm bệnh án thành công');
            }
            setEditingRecord(null);
            setFormData({
                patient_id: '',
                doctor_id: '',
                diagnosis: '',
                treatment: '',
                record_date: '',
                services: []
            });
            setShowForm(false);
            fetchRecords();
        } catch (error) {
            toast.error('Không thể gửi biểu mẫu');
        }
    };

    const handleView = (record) => {
        const serviceDetails = (record.services ? JSON.parse(record.services) : []).map(serviceId => {
            const service = services.find(s => s.id == serviceId);
            const formattedPrice = service ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(service.price)) : '';
            return service ? `<tr><td>${service.name}</td><td>${formattedPrice}</td></tr>` : '';
        }).join('');

        const totalPrice = (record.services ? JSON.parse(record.services) : []).reduce((total, serviceId) => {
            const service = services.find(s => s.id == serviceId);
            return service ? total + Number(service.price) : total;
        }, 0);

        const formattedTotalPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);

        Swal.fire({
            title: 'Chi tiết Bệnh án',
            html: `
            <div style="text-align: left;">
                <p><strong>Bệnh nhân:</strong> ${record.patient_name}</p>
                <p><strong>Bác sĩ:</strong> ${record.doctor_name}</p>
                <p><strong>Chẩn đoán:</strong> ${record.diagnosis}</p>
                <p><strong>Điều trị:</strong> ${record.treatment}</p>
                <p><strong>Ngày ghi nhận:</strong> ${new Date(record.record_date).toLocaleDateString()}</p>
                <p><strong>Dịch vụ:</strong></p>
                <table style="width: 100%; text-align: left;">
                    <thead>
                        <tr>
                            <th>Tên dịch vụ</th>
                            <th>Giá tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${serviceDetails}
                    </tbody>
                </table>
                <p><strong>Tổng giá tiền:</strong> ${formattedTotalPrice}</p>
            </div>
        `,
            icon: 'info'
        });
    };

    return (
        <div>
            <h3>Quản lý Bệnh án</h3>
            <button className="btn btn-primary my-3" onClick={() => setShowForm(true)}>Thêm Bệnh án</button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="patient_id">Bệnh nhân:</label>
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
                    <label htmlFor="doctor_id">Bác sĩ:</label>
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
                    <label htmlFor="services">Dịch vụ:</label>
                    <select
                        id="services"
                        name="services"
                        className="form-control"
                        value={formData.services}
                        onChange={handleServiceChange}
                        multiple
                        required
                    >
                        {services.map(service => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                    <div className="d-flex justify-content-center">
                        <button className="w-25 m-3" type="submit">{editingRecord ? 'Cập nhật' : 'Thêm'} Bệnh án</button>
                        <button className="w-25 m-3" type="button" onClick={() => setShowForm(false)}>Hủy</button>
                    </div>
                </form>
            )}
            <table className="table">
                <thead>
                <tr>
                    <th>Tên Bệnh nhân</th>
                    <th>Tên Bác sĩ</th>
                    <th>Chẩn đoán</th>
                    <th>Điều trị</th>
                    <th>Ngày ghi nhận</th>
                    <th>Dịch vụ</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {records.map(record => (
                    <tr key={record.id}>
                        <td>{record.patient_name}</td>
                        <td>{record.doctor_name}</td>
                        <td>{record.diagnosis}</td>
                        <td>{record.treatment}</td>
                        <td>{new Date(record.record_date).toLocaleDateString()}</td>
                        <td>{(record.services ? JSON.parse(record.services) : []).map(serviceId => {
                            const service = services.find(s => s.id == serviceId);
                            return service ? service.name : '';
                        }).join(', ')}</td>
                        <td>
                            <button className="btn-icon edit-icon m-2" onClick={() => handleView(record)} title="Xem">
                                <i className="bi bi-eye-fill"></i>
                            </button>
                            <button className="btn-icon edit-icon m-2" onClick={() => handleEdit(record)} title="Sửa">
                                <i className="bi bi-pencil-fill"></i>
                            </button>
                            <button
                                className="btn-icon delete-icon"
                                onClick={() => {
                                    if (window.confirm('Bạn có chắc chắn muốn xóa bệnh án này không?')) {
                                        handleDelete(record.id);
                                    }
                                }}
                                title="Xóa"
                            >
                                <i className="bi bi-trash-fill"></i>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MedicalRecordList;