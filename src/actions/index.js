import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";
export const SET_ERROR = "SET_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const access = (userInfo, callback, type) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    axios
      .post(`http://localhost:8080/api/auth/${type}`, userInfo)
      .then((res) => {
        dispatch(loginSuccess(res.data));
        callback ? callback() : null;
      })
      .catch((err) => dispatch(fetchError(err.response.data.message)));
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

export const fetchError = (errorMessage) => {
  return {
    type: FETCH_ERROR,
    payload: errorMessage,
  };
};

export const setError = (errorMessage) => {
  return {
    type: SET_ERROR,
    payload: errorMessage,
  };
};
