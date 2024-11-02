// src/components/admin/Sidebar.js

import React from 'react';
import {Nav} from 'react-bootstrap';
import '../../assets/css/admin/sidebar.css'; // Đảm bảo đường dẫn đúng

const Sidebar = () => {
    return (
        <div className="sidebar"> {/* Không cần thêm style inline */}
            <Nav defaultActiveKey="#dashboard" className="flex-column">
                <Nav.Link href="/admin/appointments" className="nav-link">Dashboard</Nav.Link>
                <Nav.Link href="/admin/doctors" className="nav-link">Manage Doctors</Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
