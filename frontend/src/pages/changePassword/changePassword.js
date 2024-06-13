import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import globalStyles from '../../globalStyles.module.css';
import styles from './changePassword.module.css';
import Header from '../../components/layout/header/header1';

export const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [alertVariant, setAlertVariant] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        if (newPassword.length !== 0) {
            if (newPassword.length < 5) {
                setPasswordStrength({ text: ' Yếu', color: 'red' });
            } else if (newPassword.length >= 5 && newPassword.length <= 8) {
                setPasswordStrength({ text: ' Khá', color: 'orange' });
            } else {
                setPasswordStrength({ text: ' Mạnh', color: 'green' });
            }
        } else {
            setPasswordStrength({ text: '', color: '' });
        }
    }, [newPassword]);

    const handleSubmit = () => {
        if (currentPassword.trim() === '' || newPassword.trim() === '' || rePassword.trim() === '') {
            setAlertVariant('danger');
            setAlertMessage('Hãy điền đầy đủ thông tin.');
            return;
        }
        if (newPassword !== rePassword) {
            setAlertVariant('danger');
            setAlertMessage('Nhập lại mật khẩu không chính xác.');
            return;
        }
        setAlertVariant('success');
        setAlertMessage('Cập nhật mật khẩu thành công !');
        setTimeout(() => {
            setAlertVariant('');
            setAlertMessage('');
        }, 2000);
    };

    return (
        <div>
            <Header text="Đổi mật khẩu" />
            <div className={globalStyles.mainBackground} style={{ bottom: '10px' }}>
                <p>
                    <Form.Label>Mật khẩu cũ:</Form.Label>
                    <Form.Control
                        placeholder="Nhập mật khẩu"
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                        type="password"
                    />
                </p>
                <p>
                    <Form.Label>Mật khẩu mới:</Form.Label>
                    <Form.Control
                        placeholder="Mật khẩu mới"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        type="password"
                    />
                </p>
                <p>
                    <Form.Label>Nhập lại mật khẩu:</Form.Label>
                    <Form.Control
                        placeholder="Nhập mật khẩu"
                        value={rePassword}
                        onChange={(event) => setRePassword(event.target.value)}
                        type="password"
                    />
                </p>
                <p>
                    Độ mạnh:{' '}
                    <span className={styles.passwordStrength} style={{ color: passwordStrength.color }}>
                        {passwordStrength.text}
                    </span>
                </p>
                <Button className={styles.button} onClick={handleSubmit}>
                    Gửi phản hồi
                </Button>
                {alertVariant && (
                    <Alert variant={alertVariant} onClose={() => setAlertVariant(null)} dismissible className={globalStyles.Notification}>
                        {alertMessage}
                    </Alert>
                )}
            </div>
        </div>
    );
};
