import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const EditTaskModal = ({ show, onHide, task, onSave }) => {
  const [newText, setNewText] = useState(task.text);

  useEffect(() => {
    setNewText(task.text);
  }, [task])

  const handleChange = (e) => {
    setNewText(e.target.value);
  };

  const handleSave = () => {
    console.log(newText);
    onSave(task.id, newText);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="taskText">
            <Form.Label>Task Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newText}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditTaskModal;