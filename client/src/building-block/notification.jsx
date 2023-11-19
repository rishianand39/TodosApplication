import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import { clearMessage } from '../redux/notificationSlice';

const Notification = () => {
  const state = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearMessage());
  };

  return state?.message ? (
    <Alert
      severity={state?.notificationType} // (info, success, error, warning)
      onClose={handleClose}
      sx={{ position: 'fixed', right: 40, bottom : 35, zIndex: 9999 }}
    >
      {state?.message}
    </Alert>
  ): null;
};

export default Notification;
