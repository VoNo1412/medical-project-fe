import React from 'react';
import Header from './header';
import Footer from './footer';
import '../../assets/css/priceList.css';
import Sidebar from './sidebar';
import Doctor from "./Doctor";

function DoctorList() {
    return (
        <div>
            <Header />
            <div className="container">
                <Sidebar />
                <div className="main-content">
                    {/* Nội dung bảng giá dịch vụ */}


                    <Doctor />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DoctorList;