import React, { useEffect, useState } from 'react';
import axios from 'axios';


const SpecialtyList = () => {
    const [specialties, setSpecialties] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '', image: null });
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

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            await axios.post('https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/specialties', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFormData({ name: '', description: '', image: null });
            const response = await axios.get('https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/specialties');
            setSpecialties(response.data);
        } catch (error) {
            console.error('Error creating specialty:', error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            await axios.put(`https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/specialties/${editingSpecialty.id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFormData({ name: '', description: '', image: null });
            setEditingSpecialty(null);
            const response = await axios.get('https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/specialties');
            setSpecialties(response.data);
        } catch (error) {
            console.error('Error editing specialty:', error);
        }
    };

    const handleEditClick = (specialty) => {
        setFormData({ name: specialty.name, description: specialty.description, image: null });
        setEditingSpecialty(specialty);
    };

    const handleDeleteSpecialty = async (id) => {
        try {
            await axios.delete(`https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/specialties/${id}`);
            setSpecialties(specialties.filter(specialty => specialty.id !== id));
        } catch (error) {
            console.error('Error deleting specialty:', error);
        }
    };

    return (
        <div>
            <h3>Quản lý dịch vụ</h3>
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
                    <div>
                        <label>Hình ảnh</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="w-25 m-3" type="submit">{editingSpecialty.id ? 'Lưu' : 'Thêm'}</button>
                        <button className="w-25 m-3" type="button" onClick={() => setEditingSpecialty(null)}>Hủy</button>
                    </div>
                </form>
            )}
            <table className="table">
                <thead>
                <tr>
                    <th>Tên</th>
                    <th>Mô tả</th>
                    <th>Hình ảnh</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                {specialties.map((specialty) => (
                    <tr key={specialty.id}>
                        <td>{specialty.name}</td>
                        <td>{specialty.description}</td>
                        <td><img src={`https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/${specialty.image}`} alt="Specialty" width="50" /></td>
                         <td>
                                <button className="btn-icon edit-icon m-2" onClick={() => handleEditClick(specialty)} title="Sửa">
                                    <i className="bi bi-pencil-fill"></i>
                                </button>
                                <button
                                    className="btn-icon delete-icon"
                                    onClick={() => {
                                        if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này không?')) {
                                            handleDeleteSpecialty(specialty.id);
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

export default SpecialtyList;