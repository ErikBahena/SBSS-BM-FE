import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";
export const SET_ERROR = "SET_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const access = (userInfo, successCallback, type, setErrors) => {
  return async (dispatch) => {
    dispatch(fetchStart());

    axios
      .post(`http://localhost:8080/api/auth/${type}`, userInfo)
      .then((res) => {
        dispatch(loginSuccess(res.data));

        if (successCallback) successCallback();
      })
      .catch((err) => {
        const type = err.response.data.type;
        const message = err.response.data.message;

        console.error(err.response.data);

        setErrors({ [type]: message });
        dispatch(fetchError());
      });
  };
};

export const fetchStart = () => {
  return {
    type: FETCH_START,
  };
};

export const loginSuccess = (userInfo) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userInfo,
  };
};

export const fetchSuccess = (invoices) => {
  return {
    type: FETCH_SUCCESS,
    payload: invoices,
  };
};

export const fetchError = () => {
  return {
    type: FETCH_ERROR,
  };
};

export const setError = (errorMessage) => {
  return {
    type: SET_ERROR,
    payload: errorMessage,
  };
};
