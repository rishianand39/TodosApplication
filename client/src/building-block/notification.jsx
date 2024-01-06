import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearMessage } from '../redux/notificationSlice';

const Notification = () => {
  const state = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearMessage());
  };

  useEffect(() => {
    if (state?.message) {
      toast[state.notificationType](state.message, {
        position: 'bottom-right',
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => {
          dispatch(clearMessage()); 
        },
      });
    }
  }, [state?.message, state.notificationType]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Notification;
