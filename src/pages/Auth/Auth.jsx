import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from 'react-bootstrap';
import { TASK_ROUTE } from '../../utils/consts';
import styles from './Auth.module.css';
import { fetchLogin } from '../../store/reducers/TaskReducer/ActionCreator';
import useForm from '../../hooks/useForm';

const initialValues = { name: '', password: '' };

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const taskState = useSelector(state => state.TaskReducer);
  const { isAuth } = taskState;

  const [value, handleInputChange] = useForm(initialValues);

  useEffect(() => {
    if (isAuth) {
      navigate(TASK_ROUTE);
    }
  })

  useForm()

  // const handeChange = (prop) => (e) => {
  //   setValue({ ...value, [prop]: e.target.value })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, password } = value;
    dispatch(fetchLogin({ name, password }))
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Authorization</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="text" className={styles.formLabel}>Login:</label>
          <input type="text" id="text" className={styles.formInput} required 
          onChange={handleInputChange('name')}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.formLabel}>Password:</label>
          <input type="password" id="password" className={styles.formInput} required 
          onChange={handleInputChange('password')}
          />
        </div>
        <div className={styles.formButtons}>
          <button type="submit" className={styles.formButton}>Войти</button>
          <button type="button" className={styles.formButton} onClick={() => navigate(TASK_ROUTE)}>Вернуться назад</button>
        </div>
      </form>
    </div>
  );
};

export default Auth;