// src/components/admin/DoctorHeader.js

import React, { useState } from 'react';
import { Navbar, Nav, Button, Form } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/userStore';
import '../../assets/css/admin/header.css'; // Đảm bảo đường dẫn đúng

const DoctorHeader = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const userProfile = useUserStore((state) => state.user.profile);
  const clearUser = useUserStore((state) => state.clearUser);
  const [, , removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload(); // Làm mới trang
  };

  const toggleProfileForm = () => {
    setShowProfileForm(!showProfileForm); // Chuyển trạng thái hiển thị form
  };

  const handleLogout = () => {
    // Clear the cookie token using react-cookie
    removeCookie('token', { path: '/' });

    // Clear user state
    clearUser();

    // Redirect to home page
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="header px-3">
      <Navbar.Brand href="#home">
        <img
          src="/img/logo.png" // Đường dẫn tới hình ảnh logo
          alt="Admin Dashboard Logo"
          style={{ height: '40px', width: 'auto' }} // Điều chỉnh kích thước hình ảnh nếu cần
        />
      </Navbar.Brand>
      <Nav className="d-flex align-items-center" style={{ marginLeft: 'auto' }}> {/* Sử dụng marginLeft: 'auto' để căn lề phải */}
        <Button variant="outline-light" className="me-2" onClick={handleRefresh}>
          <i className="bi bi-arrow-clockwise"></i> {/* Icon Refresh */}
        </Button>
        <Button variant="outline-light" onClick={toggleProfileForm}>
          <i className="bi bi-person-circle"></i> Hello, {userProfile?.fullname} {/* Icon Profile */}
        </Button>
      </Nav>
      {showProfileForm && (
        <div className="profile-form mt-2">
          <Form>
            <Form.Group controlId="formUserName">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" placeholder="Enter user name" />
            </Form.Group>
            <Form.Group controlId="formUserEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
            <Button variant="danger" onClick={handleLogout} className="ms-2">
              Logout
            </Button>
          </Form>
        </div>
      )}
    </Navbar>
  );
};

export default DoctorHeader;
