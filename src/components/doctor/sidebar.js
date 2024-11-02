// src/components/admin/Sidebar.js

import React from 'react';
import { Nav } from 'react-bootstrap';
import '../../assets/css/admin/sidebar.css'; // Đảm bảo đường dẫn đúng

const Sidebar = () => {
  return (
    <div className="sidebar"> {/* Không cần thêm style inline */}
      <Nav defaultActiveKey="#dashboard" className="flex-column">
        <Nav.Link href="#dashboard" className="nav-link">Dashboard</Nav.Link>
        <Nav.Link href="#reports" className="nav-link">Reports</Nav.Link>
        <Nav.Link href="#profile" className="nav-link">Profile</Nav.Link>
        <Nav.Link href="#settings" className="nav-link">Settings</Nav.Link>
        <Nav.Link href="#logout" className="nav-link">Logout</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
