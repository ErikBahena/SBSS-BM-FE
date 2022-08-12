import {
  FETCH_START,
  FETCH_ERROR,
  FETCH_SUCCESS,
  SET_ERROR,
  SIGN_IN_SUCCESS,
  UPDATE_USER_SUCCESS,
} from "../actions";

export const initialState = {
  isLoading: false,
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        user: { ...action.payload.user },
        isLoading: false,
        errorMessage: "",
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: { ...action.payload.user },
        isLoading: false,
        errorMessage: "",
      };
    case FETCH_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
      };
    case FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case SET_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message,
      };
    default:
      return state;
  }
};

export default reducer;
