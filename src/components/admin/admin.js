import React from 'react';
import AdminHeader from './header';
import Sidebar from './sidebar';
import AdminFooter from './footer';
import AppointmentList from './AppointmentList';
import DoctorList from './DoctorList';
import { Route, Routes } from 'react-router-dom';

const AdminPage = () => {
    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <AdminHeader />
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-3" style={{ backgroundColor: '#f0f2f5' }}>
                    <Routes>
                        <Route path="/admin/appointments" element={<AppointmentList />} />
                        <Route path="/admin/doctors" element={<DoctorList />} />
                    </Routes>
                    <DoctorList />
                    <AppointmentList />
                </div>
            </div>
            <AdminFooter />
        </div>
    );
};

export default AdminPage;