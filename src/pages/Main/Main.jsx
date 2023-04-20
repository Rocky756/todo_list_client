import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Container, Table, Pagination  } from 'react-bootstrap';
import { ArrowDownUp } from 'react-bootstrap-icons';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskRow from '../../components/TaskRow/TaskRow';
import styles from './Main.module.css';
import { fetchGetTasks, fetchEditText } from '../../store/reducers/TaskReducer/ActionCreator';
import { setPage, setSortWord, setSortDir } from '../../store/reducers/TaskReducer/TaskSlice';
import EditTaskModal from '../../components/EditTaskModal/EditTaskModal';

const Main = () => {
  const dispatch = useDispatch();
  const taskState = useSelector(state => state.TaskReducer);
  const { tasks, numOfPages, count, page, sortWord, sortDir, isAuth } = taskState;
  
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState({});

  const handleShowModal = () => {
    setShowModal(true);
  };

  const openModal = (task) => {
    setEditTask(task);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setEditTask({});
    setShowModal(false);
  };

  const handleSaveChanges = (id, text) => {
    dispatch(fetchEditText({ id, text, isEditByAdmin: true }));
    setEditTask({});
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(fetchGetTasks({page, sortWord, sortDir}));
  }, [page, sortWord, sortDir]);

  const sortFunc = (word) => {
    const prevWord = sortWord;
    if (prevWord !== word) {
      dispatch(setSortWord(word));
      dispatch(setSortDir('up'));
    } else {
      if (sortDir === 'up') {
        dispatch(setSortDir('down'));
      } else if (sortDir === 'down') {
        dispatch(setSortWord(null));
        dispatch(setSortDir(null));
      }
    }
  }

  const changePage = (pageNum) => {
    dispatch(setPage(pageNum));
  };

  let paginationItems = [];
  for (let i = 1; i <= numOfPages; i++) {
    paginationItems.push(
      <Pagination.Item key={i} active={i === page} onClick={() => changePage(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <TaskForm />
      <EditTaskModal
        show={showModal}
        onHide={handleCloseModal}
        task={editTask}
        onSave={handleSaveChanges}
      />
      <Container>
        <h2>Tasks</h2>
        <div className={styles.tableContainer}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  Name
                  <ArrowDownUp className={styles.sortIcon} onClick={() => sortFunc('name')}/>
                </th>
                <th>
                  Email
                  <ArrowDownUp className={styles.sortIcon} onClick={() => sortFunc('email')}/>
                </th>
                <th>Text</th>
                <th>
                  Is Done
                  <ArrowDownUp className={styles.sortIcon} onClick={() => sortFunc('isDone')}/>
                </th>
                <th>Edited by Admin</th>
                {isAuth ?
                <th>Action</th>
                : null
                }
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task) => (
                <TaskRow key={task.id} task={task} openModal={openModal}/>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.First onClick={() => changePage(1)} />
            <Pagination.Prev onClick={() => changePage(page > 1 ? page - 1 : 1)} />
            {paginationItems}
            <Pagination.Next onClick={() => changePage(page < numOfPages ? page + 1 : numOfPages)} />
            <Pagination.Last onClick={() => changePage(numOfPages)} />
          </Pagination>
        </div>
      </Container>
    </div>
  );
};

export default Main;