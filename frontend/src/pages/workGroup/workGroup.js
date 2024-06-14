import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import globalStyles from '../../globalStyles.module.css';
import styles from './workGroup.module.css';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';
import ListWork from '../../components/listWork/listWork';
import { Icon } from '@iconify/react';

export const WorkGroup = () => {
  const [works, setWorks] = useState([
    { title: 'Học tiếng Nhật', note: 'Mục tiêu 6 tháng N3', percent: 30 },
    { title: 'Học lập trình', note: '3 tháng 1 ngôn ngữ', percent: 50 },
    { title: 'Kỹ năng mềm', note: 'Học phỏng vấn thực tập', percent: 20 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', note: '' });
  const [showAlert, setShowAlert] = useState(false); 

  const handleAddTask = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTask({ title: '', note: '' });
    setShowAlert(false);
  };

  const handleSaveTask = () => {
    if (!newTask.title.trim()) {
      setShowAlert(true); 
      return;
    }

    setWorks(prevWorks => [
      ...prevWorks,
      { ...newTask, percent: 0 }
    ]);

    handleCloseModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevTask => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <div>
      <Header text="Nhóm công việc" />
      <div className={globalStyles.mainBackground}>
        <div className={styles.mainContainer}>
          <ListWork works={works} />
          <div style={{ display: 'flex', justifyContent: 'right', padding: '15px 0' }}>
            <Button onClick={handleAddTask}>
              <Icon icon="material-symbols-light:add-circle-outline" style={{ fontSize: '25px', marginRight: '10px' }} />
              Thêm mới
            </Button>
          </div>
        </div>
      </div>
      <Footer option="work" />

      {/* Modal for adding new task */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới công việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskTitle">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tiêu đề"
                name="title"
                value={newTask.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTaskNote" className="mt-3">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập ghi chú"
                name="note"
                value={newTask.note}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveTask}>
            Lưu công việc
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Alert for empty task title */}
      <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible className={globalStyles.Notification}>
        Vui lòng nhập tiêu đề cho công việc.
      </Alert>
    </div>
  );
};

