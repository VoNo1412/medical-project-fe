import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';
import '../../assets/css/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Admin from '../admin/admin';

function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios.post(
      'https://nhakhoabackend-ea8ba2a9b1f1.herokuapp.com/login',
      { username: phone, password },
      { withCredentials: true } // Gửi cookie kèm theo request
    )
        .then(res => {
          if (res.status === 200) {
            setMessage(res.data.message); // Hiển thị thông báo đăng nhập thành công
            localStorage.setItem('token', res.data.token); // Lưu token vào localStorage
            setTimeout(() => {
              navigate(res.data.redirect); // Chuyển hướng đến trang admin sau 1 giây
            }, 1000); // Thay đổi thời gian thành 1000ms
          }
        })
      .catch(err => {
        if (err.response) {
          setMessage(err.response.data); // Hiển thị thông báo từ server
        } else {
          setMessage("Có lỗi xảy ra. Vui lòng thử lại!"); // Thông báo lỗi chung
        }
        // Tắt thông báo sau 1 giây
        setTimeout(() => {
          setMessage('');
        }, 3000); // Thay đổi thời gian thành 1000ms
      });
  }

  return (
    <>
      <Header />
      <section id="login">
        <div className="logo-container">
          <img src="img/logo.png" alt="Logo" />
        </div>
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Tài khoản:</label>
          <input
            type="tel"
            id="username"
            name="username"
            required
            onChange={e => setPhone(e.target.value)}
          />

          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit">Đăng nhập</button>
        </form>
        {message && (
          <div className="message-box">
            {message}
          </div>
        )}
        <p>Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a></p>
      </section>
      <Footer />
    </>
  );
}

export default Login;
