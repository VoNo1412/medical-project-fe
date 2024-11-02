import React from 'react';
import Header from './header';
import Footer from './footer';
import '../../assets/css/priceList.css';
import Sidebar from './sidebar';

function Pricelist() {
  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="main-content">
          {/* Nội dung bảng giá dịch vụ */}
          <section id="price-list">
        <h1>Bảng Giá Dịch Vụ Dán Sứ Veneer</h1>
        <table>
          <thead>
            <tr>
              <th>Thương Hiệu</th>
              <th>Xuất Xứ</th>
              <th>Bảo Hành</th>
              <th>Giá Niêm Yết/Răng</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>IPS Emax</td><td>Đức</td><td>10 năm</td><td>6.000.000</td></tr>
            <tr><td>Lisi</td><td>Mỹ</td><td>10 năm</td><td>7.000.000</td></tr>
            <tr><td>Celtra</td><td>Đức</td><td>10 năm</td><td>8.000.000</td></tr>
            <tr><td>Ceramoy Concept</td><td>Đức</td><td>10 năm</td><td>9.000.000</td></tr>
            <tr><td>IPS Emax Press</td><td>Đức</td><td>15 năm</td><td>8.000.000</td></tr>
            <tr><td>Lisi Press</td><td>Mỹ</td><td>15 năm</td><td>10.000.000</td></tr>
            <tr><td>Celtra Press</td><td>Đức</td><td>15 năm</td><td>12.000.000</td></tr>
            <tr><td>Ceramoy Concept Press</td><td>Đức</td><td>15 năm</td><td>14.000.000</td></tr>
          </tbody>
        </table>
        <p>Giá trên chưa bao gồm ưu đãi tốt nhất của tháng. Quý khách vui lòng liên hệ để nhận bảng giá ưu đãi chi tiết.</p>
      </section>

      {/* Bảng giá dịch vụ Bọc Răng Sứ */}
      <section id="price-list">
        <h1>Bảng giá dịch vụ Bọc Răng Sứ</h1>
        <table>
          <thead>
            <tr>
              <th>Thương Hiệu</th>
              <th>Xuất Xứ</th>
              <th>Bảo Hành</th>
              <th>Giá Răng</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Răng sứ Katana</td><td>Đức</td><td>3 năm</td><td>2.500.000</td></tr>
            <tr><td>Răng sứ Venus</td><td>Đức</td><td>3 năm</td><td>3.000.000</td></tr>
            <tr><td>Chốt sứ thạch anh</td><td>Đức</td><td>10 năm</td><td>1.500.000</td></tr>
            <tr><td>Chốt ziconia</td><td>Đức</td><td>10 năm</td><td>3.000.000</td></tr>
            <tr><td>Inlay/onlay Emax Press</td><td>Đức</td><td>10 năm</td><td>5.000.000</td></tr>
            <tr><td>Răng sứ Ziconia Full</td><td>Đức</td><td>10 năm</td><td>5.500.000</td></tr>
            <tr><td>Răng sứ Ceramill</td><td>Đức</td><td>10 năm</td><td>5.000.000</td></tr>
            <tr><td>Răng sứ Cercon</td><td>Đức</td><td>10 năm</td><td>8.500.000</td></tr>
            <tr><td>Răng sứ DD Bio</td><td>Đức</td><td>10 năm</td><td>6.000.000</td></tr>
            <tr><td>Răng sứ naera da lớp</td><td>Đức</td><td>10 năm</td><td>7.000.000</td></tr>
            <tr><td>Răng sứ HT Smile</td><td>Đức</td><td>7.000.000</td><td>7.000.000</td></tr>
            <tr><td>Răng sứ Lava Plus</td><td>Mỹ</td><td>15 năm</td><td>8.000.000</td></tr>
            <tr><td>Răng sứ Orodont High Translucent</td><td>Italia</td><td>19 năm</td><td>10.000.000</td></tr>
            <tr><td>Răng sứ Orodont Bleach</td><td>Italia</td><td>19 năm</td><td>12.000.000</td></tr>
            <tr><td>Răng sứ Ceramill - Vt</td><td>Đức</td><td>15 năm</td><td>8.500.000</td></tr>
            <tr><td>Răng sứ Emax - Ex</td><td>Đức</td><td>15 năm</td><td>9.500.000</td></tr>
            <tr><td>Răng sứ Emax - Cr</td><td>Đức</td><td>15 năm</td><td>9.500.000</td></tr>
            <tr><td>Răng sứ Naera da lớp - Nt</td><td>Đức</td><td>15 năm</td><td>10.500.000</td></tr>
            <tr><td>Răng sứ HT Smile - G</td><td>Đức</td><td>15 năm</td><td>10.500.000</td></tr>
            <tr><td>Răng sứ Orodont High Translucent - Tosoh</td><td>Italia</td><td>15 năm</td><td>13.000.000</td></tr>
            <tr><td>Răng sứ Orodont Bleach - Tosoh</td><td>Italia</td><td>15 năm</td><td>15.000.000</td></tr>
          </tbody>
        </table>
        <p>Giá trên chưa bao gồm ưu đãi tốt nhất của tháng. Quý khách vui lòng liên hệ để nhận bảng giá ưu đãi chi tiết.</p>
      </section>
          
          {/* Thêm bảng giá dịch vụ khác */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Pricelist;
