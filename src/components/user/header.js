import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useUserStore from '../../store/userStore';
import '../../assets/css/header.css';

function Header() {
  const isUserLoggedIn = useUserStore((state) => state.isUserLoggedIn());
  const userProfile = useUserStore((state) => state.user.profile);
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['token']);

  const handleLogout = () => {
    // Clear the cookie token using react-cookie
    removeCookie('token', { path: '/' });

    // Clear user state
    clearUser();

    // Redirect to home page
    navigate('/');
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="img/logo.png" alt="Phòng Khám Nha Khoa Logo" />
        </Link>
      </div>
      <nav className="main-menu">
        <ul>
          <li className="dropdown">
            <a href="#">Dịch vụ &#9662;</a>
            <ul className="dropdown-content">
              <li><Link to="/braces">Niềng Răng</Link></li>
              <li><Link to="/trong-rang-implant">Trồng răng Implant</Link></li>
              <li><Link to="/rang-su-tham-my">Răng sứ thẩm mỹ</Link></li>
              <li><Link to="/nha-khoa-tong-quat">Nha khoa tổng quát</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#">Bảng giá &#9662;</a>
            <ul className="dropdown-content">
              <li><Link to="/sanpham">Sản phẩm</Link></li>
              <li><Link to="/priceList">Bảng giá chi tiết các dịch vụ</Link></li>
            </ul>
          </li>
          <li><Link to="/thong-tin-khach-hang">Thông tin khách hàng</Link></li>
          <li className="dropdown">
            <a href="#">Kiến thức nha khoa &#9662;</a>
            <ul className="dropdown-content">
              <li><Link to="/news">Kiến thức niềng răng</Link></li>
              <li><Link to="/newsImplant">Kiến thức cấy ghép Implant</Link></li>
            </ul>
          </li>
          {
            isUserLoggedIn &&
            <li className="dropdown">
              <a href="#">Xin chào, {userProfile.fullname}</a>
              <ul className="dropdown-content">
                <li><a href="#" id="logout_btn_idx" onClick={handleLogout}>Đăng xuất</a></li>
              </ul>
            </li>
          }
          {!isUserLoggedIn && <li><Link to="/login">Đăng nhập</Link></li>}
          {!isUserLoggedIn && <li><Link to="/register">Đăng ký</Link></li>}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
