import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Button } from 'react-bootstrap';
import styles from './Header.module.css';
import { LOGIN_ROUTE, TASK_ROUTE } from '../../utils/consts';
import { logout } from '../../store/reducers/TaskReducer/TaskSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const taskState = useSelector(state => state.TaskReducer);
  const { isAuth } = taskState;

  const clickBrandHandle = (e) => {
    e.preventDefault();
    navigate(TASK_ROUTE)
  }

  const logoutHandler = () => {
    dispatch(logout());
  }

  const renderButton = () => {
    if (isAuth) {
      return (
        <Button variant="outline-light" className={styles.loginButton} onClick={logoutHandler}>Logout</Button>
      )
    }
    return (
      <Button variant="outline-light" className={styles.loginButton} onClick={() => navigate(LOGIN_ROUTE)}>Login</Button>
    )
  }

  return (
    <Navbar bg="primary" variant="dark" className={styles.header}>
      <Navbar.Brand href="/" className={styles.brand} onClick={(e) => clickBrandHandle(e)}>My Tasks</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        {renderButton()}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
