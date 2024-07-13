import { csrfFetch } from "./csrf";

/** =======ACTION TYPE CONSTANTS: =========*/
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";


/** =======ACTION CREATORS: =========*/
const setUser = (user) => {
  console.log('SETUSER RAN - USER', user);
  return {
    type: SET_USER,
    payload: user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};


/** =======THUNKS: =========*/
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  console.log('THUNK LOGIN RAN - USER: ', user, 'RESPONSE:', response, 'DATA: ', data);
  dispatch(setUser(data.user));
  return response;
};




export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json()
  console.log(`RESTORE USER RAN - DATA`, data);
  dispatch(setUser(data.user));
  return response;
}



/** =======INITIAL STATE: =========*/
const initialState = {user: null}

/** =======REDUCER: =========*/
const sessionReducer = (state = initialState, action) => {
  console.log('SESSION REDUCER RAN - STATE AND ACTION', state, action)
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.payload};
    case REMOVE_USER:
      return {...state, user: null}
    default:
      return state;
  }
}

export default sessionReducer;
