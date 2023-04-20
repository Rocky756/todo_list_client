import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, FormCheck } from 'react-bootstrap';
import styles from './TaskRow.module.css';
import { Check, Pencil } from 'react-bootstrap-icons';
import { fetchEditIsDone, fetchEditText } from '../../store/reducers/TaskReducer/ActionCreator';

const TaskRow = ({ task, openModal }) => {
  const dispatch = useDispatch();
  const taskState = useSelector(state => state.TaskReducer);
  const { isAuth } = taskState;

  const changeIsDone = (e) => {
    const { checked: isDone } = e.target;
    const { id } = task;
    dispatch(fetchEditIsDone({ id, isDone }));
  }

  return (
    <tr>
      <td>{task.name}</td>
      <td>{task.email}</td>
      <td>{task.text}</td>
      <td className={styles.narrowColumn}>
        <FormCheck
          type="checkbox"
          id={`isDone-${task.id}`}
          checked={task.isDone}
          onChange={changeIsDone}
          disabled={!isAuth}
        />
      </td>
      <td className={styles.narrowColumn}>
      <div>
        {task.isEditByAdmin ? <Check size={26}/> : null}
      </div>
      </td>
      {isAuth ?
      <td className={styles.narrowColumn}>
        <Pencil size={16} className="customPencilIcon" style={{ cursor: 'pointer' }} onClick={() => openModal(task)}/>
      </td>
      : null
      }
    </tr>
  );
};

export default TaskRow;
