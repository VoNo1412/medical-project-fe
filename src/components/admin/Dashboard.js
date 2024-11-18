import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        patients: 0,
        doctors: 0,
        appointments: 0,
        specialties: 0,
        medicalRecords: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [patientsRes, doctorsRes, appointmentsRes, specialtiesRes, medicalRecordsRes] = await Promise.all([
                    axios.get('http://localhost:8080/patients'),
                    axios.get('http://localhost:8080/doctors'),
                    axios.get('http://localhost:8080/appointments'),
                    axios.get('http://localhost:8080/specialties'),
                    axios.get('http://localhost:8080/medical-records')
                ]);

                setStats({
                    patients: patientsRes.data.length,
                    doctors: doctorsRes.data.length,
                    appointments: appointmentsRes.data.length,
                    specialties: specialtiesRes.data.length,
                    medicalRecords: medicalRecordsRes.data.length
                });
            } catch (error) {
                toast.error('Failed to fetch statistics');
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h3>Bảng điều khiển</h3>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Bệnh nhân</h4>
                            <p className="card-text">{stats.patients}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Bác sĩ</h4>
                            <p className="card-text">{stats.doctors}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Lịch hẹn</h4>
                            <p className="card-text">{stats.appointments}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Dịch vụ</h4>
                            <p className="card-text">{stats.specialties}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Bệnh án</h4>
                            <p className="card-text">{stats.medicalRecords}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;