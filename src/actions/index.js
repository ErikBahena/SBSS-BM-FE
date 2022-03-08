import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";
export const SET_ERROR = "SET_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const GET_USER_CLIENTS_SUCCESS = "GET_USER_CLIENTS_SUCCESS";

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

export const updateUser = (updatedInfo, successCallback, setErrors) => {
  return async (dispatch, getState) => {
    const { user } = getState();

    dispatch(fetchStart());

    axiosWithAuth()
      .put(`/user/${user.user_id}/${user.address.user_address_id}`, updatedInfo)
      .then((res) => {
        // // if (successCallback) successCallback();

        dispatch(updateUserSuccess(res.data));
      })
      .catch((err) => console.log(err.response));
  };
};

export const getUserClients = (successCallback, setErrors) => {
  return async (dispatch, getState) => {
    const { user } = getState();

    dispatch(fetchStart());

    axiosWithAuth()
      .get(`/client/getAll/${user.user_id}`)
      .then((res) => {
        // // if (successCallback) successCallback();

        dispatch(getUserClientsSuccess(res.data));
      })
      .catch((err) => console.log(err.response));
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

export const getUserClientsSuccess = (userClients) => {
  return {
    type: GET_USER_CLIENTS_SUCCESS,
    payload: userClients,
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
