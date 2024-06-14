import React, { useState } from 'react';
import globalStyles from '../../globalStyles.module.css'
import styles from './notify.module.css'
import Header from '../../components/layout/header/header1';
import Schedule from '../../components/schedule/schedule';
import scheduleData from '../../dataTest/calenData';

export const Notify = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const renderContent = () => {
        switch (activeTab) {
            case 'upcoming':
            return <div >  
                    <p style={{ fontWeight: 'bold' }}>Còn 4 tiếng nữa</p>
                    <Schedule scheduleItem={[scheduleData[2]]} />
                </div>
            case 'passed':
            return <div>  
                    <p style={{ fontWeight: 'bold' }}>Quá hạn 3 tiếng</p>
                    <Schedule scheduleItem={[scheduleData[0]]} />
                    <p style={{ fontWeight: 'bold', marginTop: '20px' }}>Quá hạn 7 tiếng</p>
                    <Schedule scheduleItem={[scheduleData[1]]} />
                    {/* <div style={{ fontWeight: 'bold', marginTop: '20px' }}>Quán hạn 4 tiếng</div>
                    <Schedule scheduleItem={[scheduleData[0]]} /> */}
                </div>
        }
    }

    return (
        <div>
             <Header text="Thông báo" />
            <div className={globalStyles.tabContainer}>
                <div className={globalStyles['tab-nav']}>
                    <div className={`${globalStyles['tab-link']} ${activeTab === 'upcoming' ? globalStyles['active'] : ''}`}
                        onClick={() => setActiveTab('upcoming')}>
                        Sắp tới
                    </div>
                    <div className={`${globalStyles['tab-link']} ${activeTab === 'passed' ? globalStyles['active'] : ''}`}
                        onClick={() => setActiveTab('passed')}>
                        Đã qua
                    </div>
                </div>
            </div>
            <div className ={globalStyles.mainBackground} style={{top:'155px', bottom: '10px'}}> 
                {renderContent()}
            </div>
        </div>
    );
};
    
