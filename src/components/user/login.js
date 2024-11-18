import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';
import '../../assets/css/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bars } from 'react-loader-spinner'; // Import thư viện loader
import Admin from '../admin/admin';
import Swal from "sweetalert2";

function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true); // Bắt đầu loading
    axios.post(
      'http://localhost:8080/auth/login',
      { username: phone, password },
      { withCredentials: true } // Gửi cookie kèm theo request
    )
    .then(res => {
      if (res.status === 200) {
        if(res.data.message) {
             localStorage.setItem('token', res.data.token); // Lưu token vào localStorage
              setTimeout(() => {
                setLoading(false); // Tắt loading trước khi chuyển hướng
                    Swal.fire({
                title: "Đăng nhập thành công",
                icon: "success"
              });
                navigate(res.data.redirect); // Chuyển hướng đến trang admin sau 1 giây
              }, 1000); // Thay đổi thời gian thành 1000ms
        }
        else{
          localStorage.setItem('token', res.data.token); // Lưu token vào localStorage
              setTimeout(() => {
                setLoading(false); // Tắt loading trước khi chuyển hướng
                    Swal.fire({
                title: "Sai tài khoản hoặc mật khẩu",
                text: "Vui lòng thử lại",
                icon: "error"
              });
                navigate(res.data.redirect); // Chuyển hướng đến trang admin sau 1 giây
              }, 1000); // Thay đổi thời gian thành 1000ms
        }
       
      }
    })
    .catch(err => {
      setLoading(false); // Tắt loading khi có lỗi
      if (err.response) {
        setMessage(err.response.data); // Hiển thị thông báo từ server
      } else {
        setMessage("Có lỗi xảy ra. Vui lòng thử lại!"); // Thông báo lỗi chung
      }
      // Tắt thông báo sau 1 giây
      setTimeout(() => {
        setMessage('');
      }, 10000); // Thay đổi thời gian thành 3000ms
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

          <button type="submit" disabled={loading}>Đăng nhập</button>
        </form>
        {loading && (
          <div className="loading-spinner">
            <Bars
              height="50"
              width="50"
              color="#00BFFF"
              ariaLabel="loading"
            />
          </div>
        )}
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
