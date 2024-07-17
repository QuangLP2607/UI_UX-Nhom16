import { Button, Dropdown } from 'react-bootstrap';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import globalStyles from '../../globalStyles.module.css';
import styles from './workGroup.module.css';
import Header from '../../components/layout/header/header1';
import Schedule from '../../components/schedule/schedule';
import scheduleData from '../../dataTest/calenData'; 
import { Icon } from '@iconify/react';

export const ViewWorkGroup = () => {
    const navigate = useNavigate();
    const { groupName } = useParams();
    const [activeTab, setActiveTab] = useState('doing');
    const [selectedSortType1, setSelectedSortType1] = useState('Tất cả');
    const handleSelectedSortType1 = (eventKey) => setSelectedSortType1(eventKey);

    const renderContent = () => {
        switch (activeTab) {
            case 'doing':
                return (
                    <div>
                        <Schedule scheduleItem={scheduleData} />
                        <div style={{ display: 'flex', justifyContent: 'right', padding: '15px 0' }}>
                            <Button onClick={handleAddWork}>
                            <Icon icon="material-symbols-light:add-circle-outline" style={{ fontSize: '25px', marginRight: '10px' }}/>
                                Thêm mới
                            </Button>
                        </div>
                    </div>
                );
            case 'completed':
                return (
                    <div>
                        <Dropdown onSelect={handleSelectedSortType1} className={styles.select}>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                {selectedSortType1}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item 
                                    eventKey="Tuần này" 
                                    className={selectedSortType1 === "Tuần này" ? styles.selectedItem : ''}
                                >
                                    Tuần này
                                </Dropdown.Item>
                                <Dropdown.Item 
                                    eventKey="Tháng này" 
                                    className={selectedSortType1 === "Tháng này" ? styles.selectedItem : ''}
                                >
                                    Tháng này
                                </Dropdown.Item>
                                <Dropdown.Item 
                                    eventKey="Tất cả" 
                                    className={selectedSortType1 === "Tất cả" ? styles.selectedItem : ''}
                                >
                                    Tất cả
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Schedule scheduleItem={scheduleData} />
                    </div>
                );
            default:
                return null;
        }
    };

    const handleAddWork = () => {
        navigate(`/addWork`);
      };

    return (
        <div>
            <Header text={groupName} />
            <div className={globalStyles.tabContainer}>
                <div className={globalStyles['tab-nav']}>
                    <div className={`${globalStyles['tab-link']} ${activeTab === 'doing' ? globalStyles['active'] : ''}`}
                        onClick={() => setActiveTab('doing')}>
                        Đang thực hiện
                    </div>
                    <div className={`${globalStyles['tab-link']} ${activeTab === 'completed' ? globalStyles['active'] : ''}`}
                        onClick={() => setActiveTab('completed')}>
                        Đã hoàn thành
                    </div>
                </div>
            </div>
            <div className={globalStyles.mainBackground} style={{ top: '155px', bottom: '10px' }}>
                {/* <div style={{ fontWeight: '510' }}>Danh sách công việc</div> */}
                {renderContent()}
            </div>
        </div>
    );
};
