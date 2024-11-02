import React from 'react';
import AdminHeader from './header';
import Sidebar from './sidebar';
import AdminFooter from './footer';
import AppointmentList from './AppointmentList';
import DoctorList from './DoctorList';
import UserList from './UserList';
import SpecialtyList from './SpecialtyList'; // Import the SpecialtyList component
import { Route, Routes } from 'react-router-dom';

const Admin = () => {
    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <AdminHeader />
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-3" style={{ backgroundColor: '#f0f2f5' }}>
                    <Routes>
                        <Route path="appointments" element={<AppointmentList />} />
                        <Route path="doctors" element={<DoctorList />} />
                        <Route path="users" element={<UserList />} />
                        <Route path="specialties" element={<SpecialtyList />} /> {/* Add this route */}
                    </Routes>
                </div>
            </div>
            <AdminFooter />
        </div>
    );
};

export default Admin;