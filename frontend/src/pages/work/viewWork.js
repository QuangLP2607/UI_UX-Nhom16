import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import globalStyles from '../../globalStyles.module.css';
import styles from './work.module.css';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';
import ClockModal from '../../components/clockModal/clockModal';
import CalendarModal from '../../components/calendar/calendarModal';
import { Icon } from '@iconify/react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSwipeable } from 'react-swipeable';

export const ViewWork = () => {
  const storedWorkData = localStorage.getItem('scheduleData');
  const initialWorkData = storedWorkData ? JSON.parse(storedWorkData) : { tasks: [] };
  const [workData, setWorkData] = useState(initialWorkData);
  const [isEditing, setIsEditing] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const completedTasks = workData.tasks.filter(task => task.completed);
    const percent = (completedTasks.length / workData.tasks.length) * 100;
    setPercentage(percent.toFixed(2)); 
  }, [workData.tasks]);

  const handleDeleteTask = (index) => {
    setWorkData(prevData => {
      const updatedTasks = [...prevData.tasks];
      updatedTasks.splice(index, 1);
      return { ...prevData, tasks: updatedTasks };
    });
  };
  
  const handleAddTask = () => {
    setWorkData(prevWorkData => {
      const newTasks = [...prevWorkData.tasks, { name: '', completed: false }];
      return { ...prevWorkData, tasks: newTasks };
    });
  };
  
  const handleTaskInputChange = (index, field, value) => {
    setWorkData(prevworkData => {
      const updatedTasks = [...prevworkData.tasks];
      updatedTasks[index][field] = value;
      return { ...prevworkData, tasks: updatedTasks };
    });
  };

  const saveChange = () => {
    console.log("Save:", workData);
    localStorage.setItem('scheduleData', JSON.stringify(workData));
    setIsEditing(!isEditing);
    toast.success('Lưu thay đổi thành công!');
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
    setIsEditing(!isEditing);
    toast.info('Thay đổi đã bị hủy bỏ.');
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...workData.tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setWorkData({ ...workData, tasks: updatedTasks });
  };

  const handleSwipeLeft = (index) => {
    if (isEditing) {
      setWorkData(prevData => {
        const updatedTasks = [...prevData.tasks];
        updatedTasks[index].showDelete = true;
        return { ...prevData, tasks: updatedTasks };
      });
    }
  };
  
  const handleSwipeRight = (index) => {
    if (isEditing) {
      setWorkData(prevData => {
        const updatedTasks = [...prevData.tasks];
        updatedTasks[index].showDelete = false;
        return { ...prevData, tasks: updatedTasks };
      });
    }
  };

  return (
    <div>
      <Header text="Chi tiết công việc" />
      <div className={globalStyles.mainBackground}>
        <div className={styles.mainContainer}>
          <div>
            <Form.Label style={{ fontWeight: 'bold' }}>Nhóm công việc</Form.Label>
            <Form.Control value={workData.workGroup} readOnly={true} />
          </div>
          <div>
            <Form.Label style={{ fontWeight: 'bold', margin: '10px 0 5px 0' }}>Tiêu đề</Form.Label>
            <Form.Control
              placeholder="Nhập tiêu đề"
              value={workData.title}
              onChange={(event) => setWorkData(prevData => ({ ...prevData, title: event.target.value }))}
              type='text'
              readOnly={!isEditing}
            />
            <Form.Label style={{ fontWeight: 'bold', marginTop: '10px' }}>Ghi chú</Form.Label>
            <textarea
              className={styles.note}
              placeholder="Nhập ghi chú"
              value={workData.note}
              onChange={(event) => setWorkData(prevData => ({ ...prevData, note: event.target.value }))}
              readOnly={!isEditing}
            />
            <hr />
            <div style={{ fontWeight: 'bold' }}>Thời gian</div>
            <div style={{ fontWeight: '500', margin: '10px 0 5px 0' }}>Ngày bắt đầu</div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <ClockModal onTimeSelect={(time) => handleTimeSelect('startTime', time)} disabled={!isEditing} />
              <CalendarModal onDateSelect={(date) => handleDateSelect('startDate', date)} disabled={!isEditing} />
            </div>
            <div style={{ fontWeight: '500', margin: '10px 0 5px 0' }}>Ngày kết thúc</div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <ClockModal onTimeSelect={(time) => handleTimeSelect('endTime', time)} disabled={!isEditing} />
              <CalendarModal onDateSelect={(date) => handleDateSelect('endDate', date)} disabled={!isEditing} />
            </div>
            <hr />
            <div style={{ fontWeight: 'bold' }}>Nội dung công việc</div>

            {workData.tasks.map((task, index) => (
              <div key={index} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', margin: '10px'}} {...useSwipeable({
                onSwipedLeft: () => handleSwipeLeft(index),
                onSwipedRight: () => handleSwipeRight(index),
                trackMouse: true,
              })}>
                {!task.showDelete ? (
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(index)}
                    className={styles.checkBox}
                  />
                ) : null}
                <Form.Control
                  placeholder="Nội dung nhiệm vụ"
                  value={task.name}
                  onChange={(event) => handleTaskInputChange(index, 'name', event.target.value)}
                  type='text'
                  readOnly={!isEditing}
                  style={{fontSize: '12px', height: '25px', backgroundColor: '#f2f2f2'}}
                />
                {task.showDelete && (
                  <button className={styles.deleteWork} onClick={() => handleDeleteTask(index)}>
                    <Icon icon="bi:trash3-fill" style={{ fontSize: '12px', color: 'white' }} />
                  </button>
                )}
              </div>

            ))}
          {isEditing && (
              <div style={{ display: 'flex', justifyContent: 'right', padding: '10px' }}>
              <button className={styles.addWork} 
                // onClick={handleAddTask}
              >
                <Icon icon="material-symbols-light:add-circle-outline" style={{ fontSize: '20px', marginRight: '10px' }} />
                Thêm mới
              </button>
            </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px', justifyContent: 'center' }}>
              <span style={{ marginRight: '15px',  marginTop: '35px', whiteSpace: 'nowrap' }}>Tỉ lệ hoàn thành công việc</span>
              <div style={{ maxWidth: '80px', maxHeight: '80px', textAlign: 'center' }}>
                {percentage >= 90 && percentage <= 100 ? (
                  <><span style={{color: '#4CAF50', fontWeight: 'bold'}}>Xuất sắc !</span></>
                ) : percentage >= 75 && percentage < 90 ? (
                  <><span style={{color: '#4CAF50', fontWeight: 'bold'}}>Tốt !</span></>
                ) : percentage >= 50 && percentage < 75 ? (
                  <><span style={{color: '#FFC107', fontWeight: 'bold'}}>Khá !</span></>
                ) : (
                  <><span style={{color: '#F44336', fontWeight: 'bold'}}>Tệ !</span></>
                )}
                <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      styles={buildStyles({
                        pathColor: '#605DEC',
                        textColor: '#605DEC',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#EBEBF6',
                      })}
                    />
              </div>
            </div>
            </div>
            
            <div className={styles.flexRow}>
              {isEditing ? (
                <>
                  <Button className={styles.button} onClick={saveChange}>Lưu</Button>
                  <Button className={styles.button} onClick={cancel} variant="danger">Hủy bỏ</Button>
                </>
              ) : (
                <Button className={styles.button} onClick={toggleEditing}>Cập nhật</Button>
              )}
            </div>
            </div>
            <ToastContainer />
            </div>
            <Footer option="work" />
            </div>
            );
            };
            
            export default ViewWork;
