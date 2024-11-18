import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/css/admin/sidebar.css';

const PatientList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [newUser, setNewUser] = useState({ username: '', password: '', fullname: '', phone: '', address: '', gender: '', birth_year: '' });
    const [formData, setFormData] = useState({ id: '', fullname: '', username: '', phone: '', address: '', gender: '', birth_year: '' });
    const [showAddUserForm, setShowAddUserForm] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/patients');
                setUsers(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách người dùng:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleEditClick = (user) => {
        setEditingUser(user);
        setFormData({ id: user.id, fullname: user.fullname, username: user.username, phone: user.phone, address: user.address, gender: user.gender, birth_year: user.birth_year });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/patients/${formData.id}`, formData);
            setUsers(users.map(user => user.id === formData.id ? { ...user, ...formData } : user));
            setEditingUser(null);
            window.location.reload()
        } catch (error) {
            console.error('Lỗi khi cập nhật người dùng:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/patients/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/patients', newUser);
            setUsers([...users, response.data]);
            setNewUser({ username: '', password: '', fullname: '', phone: '', address: '', gender: '', birth_year: '' });
            setShowAddUserForm(false);
            window.location.reload()
        } catch (error) {
            console.error('Lỗi khi thêm người dùng:', error);
        }
    };

    return (
        <div>
            <h3>Quản lý người dùng</h3>
            <button className="btn btn-primary my-3" onClick={() => setShowAddUserForm(!showAddUserForm)}>Thêm người dùng</button>
            {showAddUserForm && (
                <form onSubmit={handleAddUser}>
                    <div>
                        <label>Tên đăng nhập</label>
                        <input
                            type="text"
                            name="username"
                            value={newUser.username}
                            onChange={handleNewUserChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleNewUserChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Họ và tên</label>
                        <input
                            type="text"
                            name="fullname"
                            value={newUser.fullname}
                            onChange={handleNewUserChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Số điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            value={newUser.phone}
                            onChange={handleNewUserChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Địa chỉ</label>
                        <input
                            type="text"
                            name="address"
                            value={newUser.address}
                            onChange={handleNewUserChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Giới tính</label>
                        <input
                            type="text"
                            name="gender"
                            value={newUser.gender}
                            onChange={handleNewUserChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Năm sinh</label>
                        <input
                            type="number"
                            name="birth_year"
                            value={newUser.birth_year}
                            onChange={handleNewUserChange}
                            required
                        />
                    </div>
                    <button type="submit">Thêm người dùng</button>
                </form>
            )}
            {editingUser ? (
                <form onSubmit={handleFormSubmit}>
                    <input type="hidden" name="id" value={formData.id}/>
                    <div>
                        <label>Tên đăng nhập</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Họ và tên</label>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Số điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Địa chỉ</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Giới tính</label>
                        <input
                            type="text"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Năm sinh</label>
                        <input
                            type="number"
                            name="birth_year"
                            value={formData.birth_year}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="w-25 m-2">Lưu</button>
                        <button type="button" className="w-25 m-2" onClick={() => setEditingUser(null)}>Hủy</button>
                    </div>
                </form>
            ) : (
                <table className="table">
                    <thead>
                    <tr>
                        <th>Tên đăng nhập</th>
                        <th>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Giới tính</th>
                        <th>Năm sinh</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.fullname}</td>
                            <td>{user.phone}</td>
                            <td>{user.gender === 1 ? 'Nam' : 'Nữ'}</td>
                            <td>{user.birth_year}</td>
                            <td>
                                <button className="btn-icon edit-icon m-2" onClick={() => handleEditClick(user)} title="Sửa">
                                    <i className="bi bi-pencil-fill"></i>
                                </button>
                                <button
                                    className="btn-icon delete-icon"
                                    onClick={() => {
                                        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
                                            handleDeleteClick(user.id);
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
            )}
        </div>
    );
};

export default PatientList;