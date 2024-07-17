import React, { useState, useEffect } from 'react';
import { Button, Form, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import globalStyles from '../../globalStyles.module.css';
import styles from './setting.module.css';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';
import SelectTimeZone from '../../components/selectTimeZone/selectTimeZone';

export const Setting = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tongquan');
  const [language, setLanguage] = useState('Tiếng Việt');
  const handleSelectLanguage = (eventKey) => setLanguage(eventKey); 
  const [timeZone, setTimeZone] = useState('Việt Nam (GMT+7)');
  const handleSelectTimeZone = (eventKey) => setTimeZone(eventKey); 

  const [switch1, setSwitch1] = useState(true);
  const handleSwitch1Change = () => setSwitch1(!switch1);
  const [switch2, setSwitch2] = useState(true);
  const handleSwitch2Change = () => setSwitch2(!switch2);
  const [switch3, setSwitch3] = useState(false);
  const handleSwitch3Change = () => setSwitch3(!switch3);
  const [switch4, setSwitch4] = useState(true);
  const handleSwitch4Change = () => setSwitch4(!switch4);
  const [switch5, setSwitch5] = useState(false);
  const handleSwitch5Change = () => setSwitch5(!switch5);
  const [switch6, setSwitch6] = useState(false);
  const handleSwitch6Change = () => setSwitch6(!switch6);

  const userInfo = {
    Name: "Lương Phúc Quang",
    Phone: "0816420686",
    Email: "luongquangcbvn@gmail.com",
    Address: "Cao Bằng"
  };

  const saveChange = () => {
    console.log('Saved');
    toast.success("Lưu thay đổi thành công!");
  };

  useEffect(() => {
    // Reset alert when changing tabs
    toast.dismiss();
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'tongquan':
        return (
          <div className={styles.mainContainer}>
            <div style={{minHeight: '110px'}}>
              <p style={{ fontWeight: '600' }}>Ngôn ngữ</p>
              <Dropdown style={{ width: '100%' }} onSelect={handleSelectLanguage}>
                <Dropdown.Toggle variant="light" id="dropdown-basic" className={styles.dropdown}>
                    {language}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: '100%' }}>
                    <Dropdown.Item eventKey="Tiếng Việt">Tiếng Việt</Dropdown.Item>
                    <Dropdown.Item eventKey="English">English</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div style={{minHeight: '110px'}}>
              <p style={{ fontWeight: '600'}}>Múi giờ</p>
              <Dropdown style={{ width: '100%' }}  onSelect={handleSelectTimeZone}>
                <Dropdown.Toggle variant="light" id="dropdown-basic" className={styles.dropdown}>
                   {timeZone}
                </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: '100%' }}>
                  <Dropdown.Item eventKey="Việt Nam (GMT+7)">Việt Nam (GMT+7)</Dropdown.Item>
                  <Dropdown.Item eventKey="English (GMT)">English (GMT)</Dropdown.Item>
                  <Dropdown.Item eventKey="Japan (GMT+9)">Japan (GMT+9)</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div style={{minHeight: '110px'}}>
              <p style={{ fontWeight: '600'}}>Định dạng thời gian</p>
              <SelectTimeZone/>
            </div>

            <Button className={styles.button} onClick={saveChange}>Lưu thay đổi</Button>
          </div>
        );

      case 'thongbao':
        return (
          <div className={styles.mainContainer}>
            <div className={styles.flexRow}>
              <div style={{ fontWeight: '600' }}>Lời nhắn</div>
              <Form.Switch checked={switch1} onChange={handleSwitch1Change} className={styles.switch}/>
            </div>

            <div className={styles.flexRow}>
              <div style={{ fontWeight: '600' }}>Cập nhật nhiệm vụ</div>
              <Form.Switch checked={switch2} onChange={handleSwitch2Change} className={styles.switch}/>
            </div>

            <div className={styles.flexRow}>
              <div style={{ fontWeight: '600' }}>Hạn nhiệm vụ</div>
              <Form.Switch checked={switch3} onChange={handleSwitch3Change} className={styles.switch}/>
            </div>
            
            <div className={styles.flexRow}>
              <div>
                <div style={{ fontWeight: '600' }}>Âm báo</div>
                <div className={styles.textBelow}>Puddles</div>
              </div>
              <Form.Switch checked={switch4} onChange={handleSwitch4Change} className={styles.switch}/>
            </div>

            <div className={styles.flexRow}>
              <div>
                <div style={{ fontWeight: '600' }}>Rung</div>
                <div className={styles.textBelow}>Basic call</div>
              </div>
              <Form.Switch checked={switch5} onChange={handleSwitch5Change} className={styles.switch}/>
            </div>

            <div className={styles.flexRow}>
              <div>
                <div style={{ fontWeight: '600' }}>Tạm dừng</div>
                <div className={styles.textBelow}>5 phút,3 lần</div>
              </div>
              <Form.Switch checked={switch6} onChange={handleSwitch6Change} className={styles.switch}/>
            </div>

            <Button className={styles.button} onClick={saveChange}>Lưu thay đổi</Button>
          </div>
        );

      case 'taikhoan':
        return (
          <div>
            <div className={styles.flexRow}> 
              <div style={{ fontWeight: '600' }}>Họ và tên: </div>
              <div>{userInfo.Name}</div>
            </div>
            <div className={styles.flexRow}> 
              <div style={{ fontWeight: '600' }}>Số điện thoại: </div>
              <div>{userInfo.Phone}</div>
            </div>
            <div className={styles.flexRow}> 
              <div style={{ fontWeight: '600' }}>Email: </div>
              <div>{userInfo.Email}</div>
            </div>
            <div className={styles.flexRow}> 
              <div style={{ fontWeight: '600' }}>Địa chỉ: </div>
              <div>{userInfo.Address}</div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}} >
              <button className={styles.button1} onClick={() => navigate('/change-password')}>Đổi mật khẩu</button>
              <button className={styles.button1} onClick={() => navigate('/feedback')}>Phản hồi</button>
            </div> 
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Header text="Cài đặt" />
      <div className={globalStyles.tabContainer}>
        <div className={globalStyles['tab-nav']}>
          <div
            className={`${globalStyles['tab-link']} ${activeTab === 'tongquan' ? globalStyles['active'] : ''}`}
            onClick={() => setActiveTab('tongquan')}
          >
            Tổng quan
          </div>
          <div
            className={`${globalStyles['tab-link']} ${activeTab === 'thongbao' ? globalStyles['active'] : ''}`}
            onClick={() => setActiveTab('thongbao')}
          >
            Thông báo
          </div>
          <div
            className={`${globalStyles['tab-link']} ${activeTab === 'taikhoan' ? globalStyles['active'] : ''}`}
            onClick={() => setActiveTab('taikhoan')}
          >
            Tài khoản
          </div>
        </div>
      </div>
      <div className={globalStyles.mainBackground} style={{top:'155px'}}>
        {renderContent()}
        <ToastContainer />
      </div>
      <Footer option="setting" />
    </div>
  );
};
