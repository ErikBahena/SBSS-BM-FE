import axios from "axios";
import { axiosWithAuth, decodeJWT } from "../utils";
import { BACKEND_URL } from "src/config";

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";
export const SET_ERROR = "SET_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

export const access = (userInfo, successCallback, type, setErrors) => {
  return async (dispatch) => {
    dispatch(fetchStart());

    axios
      .post(`${BACKEND_URL}/auth/${type}`, userInfo)
      .then((res) => {
        dispatch(loginSuccess(res.data));

        if (successCallback) successCallback();
      })
      .catch((err) => {
        const type = err.response.data.type;
        const message = err.response.data.message;

        if (setErrors) setErrors({ [type]: message });
        dispatch(fetchError());
      });
  };
};

export const reloadByToken = (token) => {
  return async (dispatch) => {
    const decodedToken = decodeJWT(token);

    axiosWithAuth()
      .post("/auth/reload", decodedToken)
      .then((res) => {
        dispatch(loginSuccess(res.data));
      });
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

export const loginSuccess = (userInfo) => {
  return {
    type: LOGIN_SUCCESS,
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
