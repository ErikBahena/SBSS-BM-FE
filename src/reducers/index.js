import { FETCH_START, FETCH_ERROR, FETCH_SUCCESS, SET_ERROR, LOGIN_SUCCESS } from "../actions";

export const initialState = {
  isLoading: false,
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        user: { ...action.payload },
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
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
