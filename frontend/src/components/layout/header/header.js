import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Popover, OverlayTrigger} from 'react-bootstrap';
import styles from './header.module.css';
import Avatar from '../../../../assets/img/Avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@iconify/react';

export const Header = ({ text }) => {
    const navigate = useNavigate();
    const bellRef = useRef(null);
    const [alerts] = useState([3]);

    const handleLogout = () => {
        console.log('Logout success');
        navigate('/');
    };

    const popover = (
        <Popover id="popover-avatar">
            <Popover.Body style={{padding: '5px', width: '160px'}}>
                <button onClick={() => navigate('/setting')} className={`${styles.button} ${styles.button2}`}>
                <Icon icon="material-symbols:settings" className={styles.icon}/>
                    Cài đặt
                </button>
                <button onClick={() => navigate('/help')} className={`${styles.button} ${styles.button2}`}>
                <Icon icon="material-symbols:help-outline" className={styles.icon}/>
                    Trợ giúp
                </button>
                <button onClick={handleLogout} className={`${styles.button} ${styles.button1}`}>
                    <Icon icon="material-symbols:logout" className={styles.icon}/> 
                    Đăng xuất
                </button>      
            </Popover.Body>
        </Popover>
    );

    return (
        <div className={styles.header}>
            <div className={styles.text}>{text}</div>
            <div className={styles.bellIconContainer} ref={bellRef} onClick={() => navigate('/notify')}>
                <FontAwesomeIcon className={styles.bellIcon} icon={faBell} />
                {alerts.length > 0 && (
                    <div className={styles.notificationCount}>{alerts.length}</div>
                )}
            </div>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
                <img src={Avatar} alt="anh" className={styles.avatar} />
            </OverlayTrigger>
        </div>
    );
};

export default Header;
