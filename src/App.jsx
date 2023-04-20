import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Header from './components/Header/Header';
import AppRouter from './components/AppRouter';
import {Spinner, Alert} from "react-bootstrap";
import { fetchAuthCheck } from './store/reducers/TaskReducer/ActionCreator';

function App() {
  const dispatch = useDispatch();
  const taskState = useSelector(state => state.TaskReducer);
  const { alert, alertCount } = taskState;
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchAuthCheck());
  }, []);

  useEffect(() => {
    if (alert.message) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  }, [alertCount]);

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Alert
        variant={alert.variant}
        show={showAlert}
        onClose={() => setShowAlert(false)}
        dismissible
      >
        {alert.message}
      </Alert>
    </BrowserRouter>
  );
}

export default App;
