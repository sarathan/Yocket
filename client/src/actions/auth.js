import api from '../utils/api';
import { setAlert } from './alert';


// Register User
export const register = formData => async dispatch => {
  try {
    const res = await api.post('/users', formData);

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: "REGISTER_FAIL"
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const body = { email, password };

  try {
    const res = await api.post('/auth', body);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data
    });
  
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: "LOGIN_FAIL"
    });
  }
};

// Logout
export const logout = () => ({ type: "LOGOUT" });
