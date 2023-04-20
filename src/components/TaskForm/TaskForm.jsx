import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import styles from './TaskForm.module.css';
import useForm from '../../hooks/useForm';
import { fetchCreate, fetchGetTasks } from '../../store/reducers/TaskReducer/ActionCreator';
import { validateAndSanitize } from '../../utils/func';
import { makeAlert } from '../../store/reducers/TaskReducer/TaskSlice';

const initialValues = { name: '', email: '', text: '' };

const TaskForm = () => {
  const dispatch = useDispatch();
  const taskState = useSelector(state => state.TaskReducer);
  const { tasks, numOfPages, count, page, sortWord, sortDir } = taskState;

  const [formValues, handleInputChange, resetForm] = useForm(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let sanitizedData;
    try {
      console.log('!', formValues);
      sanitizedData = validateAndSanitize(formValues);
    } catch (error) {
      dispatch(makeAlert({ alertVariant: 'danger', text: error.message}));
    }
    const { name, email, text } = sanitizedData;
    await dispatch(fetchCreate({ name, email, text }));
    dispatch(fetchGetTasks({ page, sortWord, sortDir }));
    resetForm();
  };

  return (
    <Container>
      <h2>Add Task</h2>
      <Form onSubmit={handleSubmit}>
        <Row className={styles.formRow}>
          <Col sm={12} md={4} className={`${styles.formCol}`}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter name" 
                className={`${styles.inputText}`}
                value={formValues.name}
                onChange={handleInputChange('name')}
                />
            </Form.Group>
          </Col>
          <Col sm={12} md={4} className={`${styles.formCol}`}> 
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter email" 
                className={`${styles.inputText}`}
                value={formValues.email}
                onChange={handleInputChange('email')}
                />
            </Form.Group>
          </Col>
          <Col sm={12} md={4} className={`${styles.formCol}`}>
            <Form.Group controlId="text">
              <Form.Label>Text</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={1} 
                className={`${styles.inputText}`}
                value={formValues.text}
                onChange={handleInputChange('text')}
                />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className={styles.addTaskButton}>
          Add Task
        </Button>
      </Form>
    </Container>
  );
};

export default TaskForm;
