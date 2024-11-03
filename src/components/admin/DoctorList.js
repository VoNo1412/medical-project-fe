import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [newDoctor, setNewDoctor] = useState({
        fullname: '',
        specialty: '',
        phone: '',
        address: '',
        gender: '',
        birth_year: ''
    });
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        const fetchSpecialties = async () => {
            try {
                const response = await axios.get('https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/specialties');
                setSpecialties(response.data);
            } catch (error) {
                console.error('Error fetching specialties:', error);
            }
        };

        fetchDoctors();
        fetchSpecialties();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor({ ...newDoctor, [name]: value });
    };

    const handleAddDoctor = async () => {
        try {
            const response = await axios.post('https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/doctors', newDoctor);
            setDoctors([...doctors, response.data]);
            setNewDoctor({
                username: '',
                password: '',
                fullname: '',
                specialty: '',
                phone: '',
                address: '',
                gender: '',
                birth_year: ''
            });
            setShowAddForm(false);
            window.location.reload();
        } catch (error) {
            console.error('Error adding doctor:', error);
        }
    };

    const handleEditDoctor = (doctor) => {
        setEditingDoctor(doctor);
    };

    const handleUpdateDoctor = async () => {
        try {
            const response = await axios.put(`https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/doctors/${editingDoctor.id}`, editingDoctor);
            setDoctors(doctors.map(doc => (doc.id === editingDoctor.id ? response.data : doc)));
            setEditingDoctor(null);
            window.location.reload();
        } catch (error) {
            console.error('Error updating doctor:', error);
        }
    };

    const handleDeleteDoctor = async (id) => {
        try {
            await axios.delete(`https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/doctors/${id}`);
            setDoctors(doctors.filter(doc => doc.id !== id));
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    return (
        <div>
            <h3>Quản lý Bác sĩ</h3>
            <button className="btn btn-primary my-3" onClick={() => setShowAddForm(!showAddForm)}>Thêm Bác sĩ</button>
            {showAddForm && (
                <div>
                    <h3>Thêm Bác sĩ</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleAddDoctor();
                    }}>
                        <input type="text" name="username" placeholder="Username" value={newDoctor.username}
                               onChange={handleInputChange} required/>
                        <input type="password" name="password" placeholder="Password" value={newDoctor.password}
                               onChange={handleInputChange} required/>
                        <input type="text" name="fullname" placeholder="Họ và Tên" value={newDoctor.fullname}
                               onChange={handleInputChange} required/>
                        <select className="form-control mb-3" name="specialty" value={newDoctor.specialty} onChange={handleInputChange} required>
                            <option value="">Chọn Chuyên Khoa</option>
                            {specialties.map(specialty => (
                                <option key={specialty.id} value={specialty.id}>{specialty.name}</option>
                            ))}
                        </select>
                        <input type="text" name="phone" placeholder="Số Điện Thoại" value={newDoctor.phone}
                               onChange={handleInputChange} required/>
                        <input type="text" name="address" placeholder="Địa Chỉ" value={newDoctor.address}
                               onChange={handleInputChange} required/>
                        <select className="form-control mb-3" name="gender" value={newDoctor.gender} onChange={handleInputChange} required>
                            <option value="">Chọn Giới Tính</option>
                            <option value="0">Nam</option>
                            <option value="1">Nữ</option>
                        </select>
                        <input type="number" name="birth_year" placeholder="Năm Sinh" value={newDoctor.birth_year}
                               onChange={handleInputChange} required/>
                        <button type="submit">Thêm</button>
                    </form>
                </div>
            )}

            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Họ và Tên</th>
                    <th>Chuyên Khoa</th>
                    <th>Số Điện Thoại</th>
                    <th>Giới Tính</th>
                    <th>Năm Sinh</th>
                    <th>Hành Động</th>
                </tr>
                </thead>
                <tbody>
                {doctors.map((doctor) => (
                    <tr key={doctor.id}>
                        <td>{doctor.id}</td>
                        <td>{doctor.username}</td>
                        <td>{doctor.fullname}</td>
                        <td>{specialties.find(s => s.id === doctor.specialty)?.name || 'N/A'}</td>
                        <td>{doctor.phone}</td>
                        <td>{doctor.gender === '0' ? 'Nam' : 'Nữ'}</td>
                        <td>{doctor.birth_year}</td>
                        <td>
                            <button className="btn btn-primary m-2" onClick={() => handleEditDoctor(doctor)}>Sửa</button>
                            <button className="btn btn-warning" onClick={() => {
                                if (window.confirm('Bạn có chắc chắn muốn xóa bác sĩ này không?')) {
                                    handleDeleteDoctor(doctor.id);
                                }
                            }}>Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editingDoctor && (
                <div>
                    <h3>Sửa Bác sĩ</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateDoctor();
                    }}>
                        <input type="text" name="fullname" placeholder="Họ và Tên" value={editingDoctor.fullname} onChange={(e) => setEditingDoctor({ ...editingDoctor, fullname: e.target.value })} required />
                        <select className="form-control mb-3" name="specialty" value={editingDoctor.specialty} onChange={(e) => setEditingDoctor({ ...editingDoctor, specialty: e.target.value })} required>
                            <option value="">Chọn Chuyên Khoa</option>
                            {specialties.map(specialty => (
                                <option key={specialty.id} value={specialty.id}>{specialty.name}</option>
                            ))}
                        </select>
                        <input type="text" name="phone" placeholder="Số Điện Thoại" value={editingDoctor.phone} onChange={(e) => setEditingDoctor({ ...editingDoctor, phone: e.target.value })} required />
                        <input type="text" name="address" placeholder="Địa Chỉ" value={editingDoctor.address} onChange={(e) => setEditingDoctor({ ...editingDoctor, address: e.target.value })} required />
                        <select className="form-control mb-3" name="gender" value={editingDoctor.gender} onChange={(e) => setEditingDoctor({ ...editingDoctor, gender: e.target.value })} required>
                            <option value="">Chọn Giới Tính</option>
                            <option value="0">Nam</option>
                            <option value="1">Nữ</option>
                        </select>
                        <input type="number" name="birth_year" placeholder="Năm Sinh" value={editingDoctor.birth_year} onChange={(e) => setEditingDoctor({ ...editingDoctor, birth_year: e.target.value })} required />
                        <button type="submit">Cập Nhật</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default DoctorList;