import React from 'react';
import { useNavigate } from 'react-router-dom';
import './start.css';
import CustomButton from '../../components/CustomButton';

export const Start = () => {
    const navigate = useNavigate();
    const handleButtonPress = () => {
        navigate('/login');
    };

    return (
        <div className="container">
            <div className="animated-background"></div>
            <div className="content">
            <img
                        src="https://img.freepik.com/free-vector/kpi-abstract-concept-illustration-key-performance-indicator-success-measurement-company-growth-business-effectiveness-analytics-tool-financial-management-kpi_335657-506.jpg?t=st=1718330932~exp=1718334532~hmac=f751d82108ea71dbb1d473730b34c9db81b7b1711fca4275da1d62d8905fa333&w=740"
                        className="logo"
                        alt="KPI Tracker Logo"
                    />
                <div className="contentHeader">
                    <h1 className="title">
                        Làm việc hiệu quả hơn <br /> cùng{' '}
                        <span className="appName">
                            <span className="appNameText">EduKpi</span>
                        </span>
                    </h1>
                    <p className="text">
                        Chúng tôi tự tin mang lại cho bạn hiệu suất làm việc vượt trội
                    </p>
                </div>
        
                <CustomButton
                    title="Bắt đầu ngay"
                    handlePress={handleButtonPress}
                    containerStyles="w-full mt-7"
                />
            </div>
        </div>
    );
};
