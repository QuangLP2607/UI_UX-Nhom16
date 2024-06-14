import { Dropdown } from 'react-bootstrap';
import React, { useState } from 'react';
import globalStyles from '../../globalStyles.module.css'
import styles from './report.module.css'
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';
import RadarChart from '../../components/radarChart/radarChart';
import PieChart from '../../components/pieChart/pieChart';

export const Report = () => {
    const [dateRange, setDateRange] = useState('7');
    const handelSetDateRange = (eventKey) => setDateRange(eventKey);
    const [tags, setTags] = useState(['Kỹ năng Mềm', 'Lập trình', 'Tiếng Nhật', 'Thể dục', 'Tiếng Anh']);
    
    return (
        <div>
             <Header text="Thống kê" />
            <div className ={globalStyles.mainBackground}>
                <div className={styles.tagContainer}>
                    <div style={{ fontWeight: '510' }}>Công việc:</div>
                    {tags.map((tag, index) => (
                    <div key={index} className={styles.tag}>
                        # {tag}
                    </div>
                    ))}
                </div>
                <hr/>
                <div className={styles.flexRow}>
                    <div style={{fontWeight: '510'}}>Công việc {dateRange} ngày gần đây</div>
                    <div>
                    <Dropdown onSelect={handelSetDateRange} className={styles.dropdown}>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            {dateRange === '7' ? '7 ngày' : '30 ngày'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="7">7 ngày</Dropdown.Item>
                            <Dropdown.Item eventKey="30">30 ngày</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                        </div>
                    </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <PieChart />
                    
                    <RadarChart />
                </div>
            </div>
            <Footer option="report" />
        </div>
    );
};
    
