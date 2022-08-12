import axios from "axios";
import { axiosWithAuth } from "../utils";

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";
export const SET_ERROR = "SET_ERROR";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

export const access = (userInfo, successCallback, type, setErrors) => {
  return async (dispatch) => {
    dispatch(fetchStart());

    axios
      .post(`/api/auth/${type}/`, userInfo)
      .then((res) => {
        dispatch(signInSuccess(res.data));

        if (successCallback) successCallback();
      })
      .catch((err) => {
        const name = err.response.data.name;
        const message = err.response.data.message;

        if (setErrors) setErrors({ [name]: message });
        dispatch(fetchError());
      });
  };
};

export const reloadByToken = (email) => {
  return async (dispatch) => {
    axiosWithAuth()
      .post("/auth/refresh-sign-in")
      .then((res) => {
        dispatch(signInSuccess(res.data));
      })
      .catch((err) => console.log(err));
  };
};

export const updateUser = (updatedInfo) => {
  return async (dispatch, getState) => {
    const { user } = getState();

    dispatch(fetchStart());

    axiosWithAuth()
      .put(`/user/${user.user_id}/${user.address.user_address_id}`, updatedInfo)
      .then((res) => dispatch(updateUserSuccess(res.data)))
      .catch((err) => console.log(err));
  };
};

export const fetchStart = () => {
  return {
    type: FETCH_START,
  };
};

export const signInSuccess = (userInfo) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: userInfo,
  };
};
export const updateUserSuccess = (userInfo) => {
  return {
    type: UPDATE_USER_SUCCESS,
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
