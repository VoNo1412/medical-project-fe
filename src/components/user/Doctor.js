import React from 'react';

const doctors = [
    { name: 'Dr. John Doe', specialty: 'Orthodontist', experience: '10 years' },
    { name: 'Dr. Jane Smith', specialty: 'Periodontist', experience: '8 years' },
    { name: 'Dr. Emily Johnson', specialty: 'Prosthodontist', experience: '12 years' },
    // Add more doctors as needed
];

function DoctorList() {
    return (
        <section id="doctor-list">
            <h1>Danh Sách Bác Sĩ</h1>
            <table>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Chuyên Khoa</th>
                        <th>Kinh Nghiệm</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor, index) => (
                        <tr key={index}>
                            <td>{doctor.name}</td>
                            <td>{doctor.specialty}</td>
                            <td>{doctor.experience}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default DoctorList;