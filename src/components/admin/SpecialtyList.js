import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SpecialtyList = () => {
    const [specialties, setSpecialties] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [editingSpecialty, setEditingSpecialty] = useState(null);

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await axios.get('https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/specialties');
                setSpecialties(response.data);
            } catch (error) {
                console.error('Error fetching specialties:', error);
            }
        };

        fetchSpecialties();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/specialties', formData);
            setFormData({ name: '', description: '' });
            const response = await axios.get('https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/specialties');
            setSpecialties(response.data);
        } catch (error) {
            console.error('Error creating specialty:', error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/specialties/${editingSpecialty.id}`, formData);
            setFormData({ name: '', description: '' });
            setEditingSpecialty(null);
            const response = await axios.get('https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/specialties');
            setSpecialties(response.data);
        } catch (error) {
            console.error('Error editing specialty:', error);
        }
    };

    const handleEditClick = (specialty) => {
        setFormData({ name: specialty.name, description: specialty.description });
        setEditingSpecialty(specialty);
    };

    return (
        <div>
            <h3>Quản lý Chuyên khoa</h3>
            <button className="btn btn-primary my-3" onClick={() => setEditingSpecialty({})}>Thêm</button>
            {editingSpecialty && (
                <form onSubmit={editingSpecialty.id ? handleEditSubmit : handleCreateSubmit}>
                    <div>
                        <label>Tên</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Mô tả</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">{editingSpecialty.id ? 'Lưu' : 'Thêm'}</button>
                    <button type="button" onClick={() => setEditingSpecialty(null)}>Hủy</button>
                </form>
            )}
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Mô tả</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {specialties.map((specialty) => (
                    <tr key={specialty.id}>
                        <td>{specialty.id}</td>
                        <td>{specialty.name}</td>
                        <td>{specialty.description}</td>
                        <td>
                            <button className="btn btn-primary" onClick={() => handleEditClick(specialty)}>Sửa</button>
                            <button className="btn btn-warning m-2" onClick={async () => {
                                if (window.confirm('Bạn có chắc chắn muốn xóa chuyên khoa này không?')) {
                                    await axios.delete(`https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/specialties/${specialty.id}`);
                                    setSpecialties(specialties.filter(s => s.id !== specialty.id));
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

export default SpecialtyList;