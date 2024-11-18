import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Component quản lý danh sách bác sĩ
const DoctorList = () => {
    // Khai báo các state cần thiết
    const [doctors, setDoctors] = useState([]); // Danh sách bác sĩ
    const [specialties, setSpecialties] = useState([]); // Danh sách chuyên khoa
    const [editingDoctor, setEditingDoctor] = useState(null); // Bác sĩ đang chỉnh sửa
    const [newDoctor, setNewDoctor] = useState({ // Dữ liệu bác sĩ mới
        username: '',
        password: '',
        fullname: '',
        specialty: '',
        phone: '',
        address: '',
        gender: '',
        birth_year: '',
        image: null
    });
    const [showAddForm, setShowAddForm] = useState(false); // Hiển thị form thêm bác sĩ

    // Hàm lấy danh sách bác sĩ và chuyên khoa khi component được mount
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:8080/doctors'); // Gọi API để lấy danh sách bác sĩ
                setDoctors(response.data); // Cập nhật state với dữ liệu bác sĩ
            } catch (error) {
                console.error('Error fetching doctors:', error); // Log lỗi nếu có
            }
        };

        const fetchSpecialties = async () => {
            try {
                const response = await axios.get('http://localhost:8080/specialties'); // Gọi API để lấy danh sách chuyên khoa
                setSpecialties(response.data); // Cập nhật state với dữ liệu chuyên khoa
            } catch (error) {
                console.error('Error fetching specialties:', error); // Log lỗi nếu có
            }
        };

        fetchDoctors(); // Gọi hàm lấy bác sĩ
        fetchSpecialties(); // Gọi hàm lấy chuyên khoa
    }, []);

    // Hàm xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Lấy tên và giá trị từ input
        setNewDoctor({ ...newDoctor, [name]: value }); // Cập nhật state mới
    };

    // Hàm xử lý thay đổi file hình ảnh
    const handleFileChange = (e) => {
        setNewDoctor({ ...newDoctor, image: e.target.files[0] }); // Cập nhật hình ảnh
    };

    // Hàm thêm bác sĩ mới
    const handleAddDoctor = async () => {
        const formData = new FormData(); // Tạo FormData để gửi dữ liệu
        Object.keys(newDoctor).forEach(key => {
            formData.append(key, newDoctor[key]); // Thêm các trường vào formData
        });

        try {
            const response = await axios.post('http://localhost:8080/doctors', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Thiết lập header cho multipart/form-data
                }
            });
            setDoctors([...doctors, response.data]); // Cập nhật danh sách bác sĩ
            // Reset form
            setNewDoctor({
                username: '',
                password: '',
                fullname: '',
                specialty: '',
                phone: '',
                address: '',
                gender: '',
                birth_year: '',
                image: null
            });
            setShowAddForm(false); // Ẩn form thêm bác sĩ
            window.location.reload(); // Tải lại trang
        } catch (error) {
            console.error('Error adding doctor:', error); // Log lỗi nếu có
        }
    };

    // Hàm bắt đầu chỉnh sửa bác sĩ
    const handleEditDoctor = (doctor) => {
        setEditingDoctor(doctor); // Đặt bác sĩ cần chỉnh sửa
    };

    // Hàm cập nhật thông tin bác sĩ
    const handleUpdateDoctor = async () => {
        const formData = new FormData(); // Tạo FormData để gửi dữ liệu
        Object.keys(editingDoctor).forEach(key => {
            formData.append(key, editingDoctor[key]); // Thêm các trường vào formData
        });

        try {
            const response = await axios.put(`http://localhost:8080/doctors/${editingDoctor.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Thiết lập header cho multipart/form-data
                }
            });
            // Cập nhật danh sách bác sĩ với thông tin mới
            setDoctors(doctors.map(doc => (doc.id === editingDoctor.id ? response.data : doc)));
            setEditingDoctor(null); // Đặt lại trạng thái chỉnh sửa
            window.location.reload(); // Tải lại trang
        } catch (error) {
            console.error('Error updating doctor:', error); // Log lỗi nếu có
        }
    };

    // Hàm xóa bác sĩ
    const handleDeleteDoctor = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/doctors/${id}`); // Gọi API để xóa bác sĩ
            setDoctors(doctors.filter(doc => doc.id !== id)); // Cập nhật danh sách bác sĩ
        } catch (error) {
            console.error('Error deleting doctor:', error); // Log lỗi nếu có
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
                        e.preventDefault(); // Ngăn chặn hành vi mặc định của form
                        handleAddDoctor(); // Gọi hàm thêm bác sĩ
                    }}>
                        <input type="text" name="username" placeholder="Username" value={newDoctor.username}
                               onChange={handleInputChange} required/>
                        <input type="password" name="password" placeholder="Password" value={newDoctor.password}
                               onChange={handleInputChange} required/>
                        <input type="text" name="fullname" placeholder="Họ và Tên" value={newDoctor.fullname}
                               onChange={handleInputChange} required/>
                        <select className="form-control mb-3" name="specialty" value={newDoctor.specialty}
                                onChange={handleInputChange} required>
                            <option value="">Chọn Chuyên Khoa</option>
                            {specialties.map(specialty => (
                                <option key={specialty.id} value={specialty.id}>{specialty.name}</option>
                            ))}
                        </select>
                        <input type="text" name="phone" placeholder="Số Điện Thoại" value={newDoctor.phone}
                               onChange={handleInputChange} required/>
                        <input type="text" name="address" placeholder="Địa Chỉ" value={newDoctor.address}
                               onChange={handleInputChange} required/>
                        <select className="form-control mb-3" name="gender" value={newDoctor.gender}
                                onChange={handleInputChange} required>
                            <option value="">Chọn Giới Tính</option>
                            <option value="0">Nam</option>
                            <option value="1">Nữ</option>
                        </select>
                        <input type="number" name="birth_year" placeholder="Năm Sinh" value={newDoctor.birth_year}
                               onChange={handleInputChange} required/>
                        <input type="file" name="image" onChange={handleFileChange} /> {/* Chọn hình ảnh */}
                        <div className="d-flex justify-content-center">
                            <button className="w-25 m-3" type="submit">Thêm</button>
                            <button className="w-25 m-3" type="button" onClick={() => setShowAddForm(false)}>Hủy {/* Ẩn form */}</button>
                        </div>
                    </form>
                </div>
            )}

            <table className="table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Họ và Tên</th>
                    <th>Chuyên Khoa</th>
                    <th>Số Điện Thoại</th>
                    <th>Giới Tính</th>
                    <th>Năm Sinh</th>
                    <th>Hình Ảnh</th>
                    <th>Hành Động</th>
                </tr>
                </thead>
                <tbody>
                {doctors.map((doctor) => (
                    <tr key={doctor.id}>
                        <td>{doctor.username}</td>
                        <td>{doctor.fullname}</td>
                        <td>{doctor.specialty_name}</td>
                        <td>{doctor.phone}</td>
                        <td>{doctor.gender === '0' ? 'Nam' : 'Nữ'}</td>
                        <td>{doctor.birth_year}</td>
                        <td>
                         <img src={`http://localhost:8080/${doctor.image}`} alt="Doctor" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                        </td>
                        <td>
                                <button className="btn-icon edit-icon m-2" onClick={() => handleEditDoctor(doctor)} title="Sửa">
                                    <i className="bi bi-pencil-fill"></i>
                                </button>
                                <button
                                    className="btn-icon delete-icon"
                                    onClick={() => {
                                        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
                                            handleDeleteDoctor(doctor.id);
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

            {editingDoctor && (
    <div>
        <h3>Chỉnh Sửa Bác sĩ</h3>
        <form onSubmit={(e) => {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của form
            handleUpdateDoctor(); // Gọi hàm cập nhật bác sĩ
        }}>
            <input type="text" name="username" placeholder="Username" value={editingDoctor.username}
                onChange={(e) => setEditingDoctor({ ...editingDoctor, username: e.target.value })} required/>
            <input type="text" name="fullname" placeholder="Họ và Tên" value={editingDoctor.fullname}
                onChange={(e) => setEditingDoctor({ ...editingDoctor, fullname: e.target.value })} required/>

            {/* Thêm select cho Chuyên Khoa */}
            <select
                className="form-control mb-3"
                name="specialty"
                value={editingDoctor.specialty}
                onChange={(e) => setEditingDoctor({ ...editingDoctor, specialty: e.target.value })}
                required
            >
                <option value="">Chọn Chuyên Khoa</option>
                {specialties.map((specialty) => (
                    <option key={specialty.id} value={specialty.id}>
                        {specialty.name}
                    </option>
                ))}
            </select>
                    <input type="text" name="phone" placeholder="Số Điện Thoại" value={editingDoctor.phone}
                        onChange={(e) => setEditingDoctor({ ...editingDoctor, phone: e.target.value })} required/>
                    <input type="text" name="address" placeholder="Địa Chỉ" value={editingDoctor.address}
                        onChange={(e) => setEditingDoctor({ ...editingDoctor, address: e.target.value })} required/>
                    <select className="form-control mb-3" name="gender" value={editingDoctor.gender}
                        onChange={(e) => setEditingDoctor({ ...editingDoctor, gender: e.target.value })} required>
                        <option value="0">Nam</option>
                        <option value="1">Nữ</option>
                    </select>
                    <input type="number" name="birth_year" placeholder="Năm Sinh" value={editingDoctor.birth_year}
                        onChange={(e) => setEditingDoctor({ ...editingDoctor, birth_year: e.target.value })} required/>
                    <input type="file" name="image" onChange={(e) => {
                        setEditingDoctor({ ...editingDoctor, image: e.target.files[0] }); // Cập nhật hình ảnh
                    }} /> {/* Chọn hình ảnh mới */}
                    <div className="d-flex justify-content-center">
                        <button className="w-25 m-3" type="submit">Cập Nhật</button>
                        <button className="w-25 m-3" type="button" onClick={() => setEditingDoctor(null)}>Hủy</button> {/* Đặt lại trạng thái chỉnh sửa */}
                    </div>
                </form>
            </div>
        )}
        </div>
    );
};

export default DoctorList;
