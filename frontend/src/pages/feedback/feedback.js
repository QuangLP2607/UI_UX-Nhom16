import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import globalStyles from '../../globalStyles.module.css';
import styles from './feedback.module.css';
import Header from '../../components/layout/header/header1';

export const Feedback = () => {
    const [feedBack, setFeedBack] = useState('');

    const handleSubmit = () => {
        if (feedBack.trim() === '') {
            toast.error("Hãy nhập nội dung phản hồi !");
            return;
        }
        toast.success("Phản hồi đã được gửi thành công !");
        setFeedBack('');
    };

    return (
        <div>
            <Header text="Phản hồi" />
            <div className={globalStyles.mainBackground} style={{ bottom: '10px' }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Vui lòng gửi phản hồi cho chúng tôi</p>
                <p>Chia sẻ tại đây</p>
                <textarea
                    className={styles.feedBack}
                    placeholder="Nhập chia sẻ"
                    value={feedBack}
                    onChange={(event) => setFeedBack(event.target.value)}
                />
                <Button className={styles.button} onClick={handleSubmit}>Gửi phản hồi</Button>
                <ToastContainer />
            </div>
        </div>
    );
};
