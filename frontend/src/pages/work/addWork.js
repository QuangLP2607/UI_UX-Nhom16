import React, { useState } from 'react';
import { Button, Form, Dropdown } from 'react-bootstrap';
import globalStyles from '../../globalStyles.module.css';
import styles from './work.module.css';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';
import ClockModal from '../../components/clockModal/clockModal';
import CalendarModal from '../../components/calendar/calendarModal';
import { Icon } from '@iconify/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const AddWork = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [selectedWorkGroup, setSelectedWorkGroup] = useState('Chọn nhóm công việc');
  const handleSelectedWorkGroup = (eventKey) => setSelectedWorkGroup(eventKey);
  const [workData, setWorkData] = useState({
    title: '',
    note: '',
    startTime: '',
    startDate: '',
    endTime: '',
    endDate: '',
    tasks: []
  });

  const handleDeleteTask = (index) => {
    setWorkData(prevData => {
      const updatedTasks = [...prevData.tasks];
      updatedTasks.splice(index, 1);
      return { ...prevData, tasks: updatedTasks };
    });
  };

  const handleAddTask = () => {
    setWorkData(prevData => {
      const newTasks = [...prevData.tasks, { name: '' }];
      return { ...prevData, tasks: newTasks };
    });
  };

  const handleTaskInputChange = (index, field, value) => {
    setWorkData(prevData => {
      const updatedTasks = [...prevData.tasks];
      updatedTasks[index][field] = value;
      return { ...prevData, tasks: updatedTasks };
    });
  };

  const saveChange = () => {
    if (!validateForm()) {
      toast.error('Vui lòng nhập đầy đủ thông tin.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    }

    console.log("Save:", workData);
    localStorage.setItem('workData', JSON.stringify(workData));
    toast.success('Thêm công việc thành công!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const validateForm = () => {
    return (
      workData.title.trim() !== '' &&
      workData.startTime.trim() !== '' &&
      workData.startDate.trim() !== '' &&
      workData.endTime.trim() !== '' &&
      workData.endDate.trim() !== '' &&
      workData.tasks.every(task => task.name.trim() !== '')
    );
  };

  const handleTimeSelect = (field, time) => {
    setWorkData(prevData => ({
      ...prevData,
      [field]: `${time.hour}:${time.minute}`
    }));
  };

  const handleDateSelect = (field, date) => {
    setWorkData(prevData => ({
      ...prevData,
      [field]: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }));
  };

  const cancel = () => {
    setWorkData({
      title: '',
      note: '',
      startTime: '',
      startDate: '',
      endTime: '',
      endDate: '',
      tasks: []
    });
    console.log('Canceled');
    navigate(-1); // Go back to the previous page
  };

  return (
    <div>
      <Header text="Thêm công việc" />
      <div className={globalStyles.mainBackground}>
        <div className={styles.mainContainer}>
          <div>
            <Form.Label style={{ fontWeight: 'bold' }}>Nhóm công việc</Form.Label>
            <Dropdown onSelect={handleSelectedWorkGroup} className="w-100">
                <Dropdown.Toggle 
                    variant="light" 
                    id="dropdown-basic" 
                    className={globalStyles["custom-dropdown-toggle"]} 
                >
                    {selectedWorkGroup}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                    <Dropdown.Item 
                        eventKey="Tiếng Nhật" 
                        className={selectedWorkGroup === "Tiếng Nhật" ? styles.selectedItem : ''}
                    >
                        Tiếng Nhật
                    </Dropdown.Item>
                    <Dropdown.Item 
                        eventKey="Lập trình" 
                        className={selectedWorkGroup === "Lập trình" ? styles.selectedItem : ''}
                    >
                        Lập trình
                    </Dropdown.Item>
                    <Dropdown.Item 
                        eventKey="Kỹ năng mềm" 
                        className={selectedWorkGroup === "Kỹ năng mềm" ? styles.selectedItem : ''}
                    >
                        Kỹ năng mềm
                    </Dropdown.Item>
                    {/* Bạn có thể thêm nhiều Dropdown.Item ở đây */}
                </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            <Form.Label style={{ fontWeight: 'bold', margin: '10px 0 5px 0'  }}>Tiêu đề</Form.Label>
            <Form.Control 
              placeholder="Nhập tiêu đề"
              value={workData.title} 
              onChange={(event) => setWorkData(prevData => ({ ...prevData, title: event.target.value }))} 
              type='text'
            />
            <Form.Label style={{ fontWeight: 'bold', marginTop: '10px' }}>Ghi chú</Form.Label>
            <textarea
              className={styles.note}
              placeholder="Nhập ghi chú"
              value={workData.note} 
              onChange={(event) => setWorkData(prevData => ({ ...prevData, note: event.target.value }))} 
            />
            <hr />
            <div style={{ fontWeight: 'bold' }}>Thời gian</div>
            <div style={{ fontWeight: '500', margin: '10px 0 5px 0' }}>Ngày bắt đầu</div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <ClockModal onTimeSelect={(time) => handleTimeSelect('startTime', time)} />
              <CalendarModal onDateSelect={(date) => handleDateSelect('startDate', date)} />
            </div>
            <div style={{ fontWeight: '500', margin: '10px 0 5px 0' }}>Ngày kết thúc</div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <ClockModal onTimeSelect={(time) => handleTimeSelect('endTime', time)} />
              <CalendarModal onDateSelect={(date) => handleDateSelect('endDate', date)} />
            </div>
            <hr />
            <div style={{ fontWeight: 'bold' }}>Nội dung công việc</div>

            {workData.tasks.map((task, index) => (
              <div key={index} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', margin: '10px'}} >
                <div>{index+1}</div>
                <Form.Control 
                  placeholder="Nội dung nhiệm vụ"
                  value={task.name} 
                  onChange={(event) => handleTaskInputChange(index, 'name', event.target.value)} 
                  type='text'
                />
                <button className={styles.deleteWork} onClick={() => handleDeleteTask(index)}>
                  <Icon icon="bi:trash3-fill" style={{ fontSize: '20px', color: 'white' }} />
                </button>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'right', padding: '10px'}}>
              <button className={styles.addWork} onClick={handleAddTask}>
                <Icon icon="material-symbols-light:add-circle-outline" style={{ fontSize: '20px', marginRight: '10px'}} />
                Thêm mới
              </button>
            </div>
          </div>

          <div className={styles.flexRow}>
            <Button className={styles.button} onClick={saveChange}>Lưu</Button>
            <Button className={styles.button} onClick={cancel} variant="danger">Hủy bỏ</Button>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer/>
    </div>
  );
};

export default AddWork;
