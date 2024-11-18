import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [formData, setFormData] = useState({ specialty_id: '', name: '', description: '', price: '' });
    const [editingService, setEditingService] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8080/services');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        const fetchSpecialties = async () => {
            try {
                const response = await axios.get('http://localhost:8080/specialties');
                setSpecialties(response.data);
            } catch (error) {
                console.error('Error fetching specialties:', error);
            }
        };

        fetchServices();
        fetchSpecialties();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/services', formData);
            setFormData({ specialty_id: '', name: '', description: '', price: '' });
            const response = await axios.get('http://localhost:8080/services');
            setServices(response.data);
        } catch (error) {
            console.error('Error creating service:', error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/services/${editingService.id}`, formData);
            setFormData({ specialty_id: '', name: '', description: '', price: '' });
            setEditingService(null);
            const response = await axios.get('http://localhost:8080/services');
            setServices(response.data);
        } catch (error) {
            console.error('Error editing service:', error);
        }
    };

    const handleEditClick = (service) => {
        setFormData({ specialty_id: service.specialty_id, name: service.name, description: service.description, price: service.price });
        setEditingService(service);
    };

    const handleDeleteService = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/services/${id}`);
            setServices(services.filter(service => service.id !== id));
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    return (
        <div>
            <h3>Quản lý dịch vụ</h3>
            <button className="btn btn-primary my-3" onClick={() => setEditingService({})}>Thêm</button>
            {editingService && (
                <form onSubmit={editingService.id ? handleEditSubmit : handleCreateSubmit}>
                    <div>
                        <label>Chuyên khoa</label>
                        <select
                            name="specialty_id"
                            value={formData.specialty_id}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Chọn chuyên khoa</option>
                            {specialties.map((specialty) => (
                                <option key={specialty.id} value={specialty.id}>
                                    {specialty.name}
                                </option>
                            ))}
                        </select>
                    </div>
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
                        <label>Giá</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="w-25 m-3" type="submit">{editingService.id ? 'Lưu' : 'Thêm'}</button>
                        <button className="w-25 m-3" type="button" onClick={() => setEditingService(null)}>Hủy</button>
                    </div>
                </form>
            )}
            <table className="table">
                <thead>
                <tr>
                    <th>Chuyên khoa</th>
                    <th>Tên</th>
                    <th>Mô tả</th>
                    <th>Giá</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                {services.map((service) => (
                    <tr key={service.id}>
                        <td>{service.specialty_id}</td>
                        <td>{service.name}</td>
                        <td>{service.description}</td>
                        <td>{new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }).format(service.price)}</td>
                        <td>
                            <button className="btn-icon edit-icon m-2" onClick={() => handleEditClick(service)}
                                    title="Sửa">
                                <i className="bi bi-pencil-fill"></i>
                            </button>
                            <button
                                className="btn-icon delete-icon"
                                onClick={() => {
                                    if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này không?')) {
                                        handleDeleteService(service.id);
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

export default ServiceList;