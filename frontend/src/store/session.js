import { csrfFetch } from "./csrf";

/** =======ACTION TYPE CONSTANTS: =========*/
const SET_USER = "session/setUser";
// const SIGNUP_USER = "session/removeUser";
const REMOVE_USER = "session/removeUser";


/** =======ACTION CREATORS: =========*/
const setUser = (user) => {
  // console.log('SETUSER RAN - USER', user);
  return {
    type: SET_USER,
    payload: user
  };
};

// const signupUser = (user) => {
//   console.log('SETUSER RAN - USER', user);
//   return {
//     type: SIGNUP_USER,
//     payload: user
//   };
// };

const removeUser = () => {
  // console.log('REMOVEUSER RAN - USER');
  return {
    type: REMOVE_USER
  };
};


/** =======THUNKS: =========*/

/** LOGIN */
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
 // console.log('THUNK LOGIN RAN - USER: ', user, 'RESPONSE:', response, 'DATA: ', data);
  dispatch(setUser(data.user));
  return response;
};


/** SIGNUP */
export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password
    })
  });
  const data = await response.json();
  // console.log('THUNK SIGNUP RAN - USER: ', user, 'RESPONSE:', response, 'DATA: ', data);
  dispatch(setUser(data.user));
  return response;
};



/** RESTORE */
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json()
  // console.log(`RESTORE USER RAN - DATA`, data);
  dispatch(setUser(data.user));
  return response;
}


/** LOGOUT */
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {method: 'DELETE'});

  // console.log(`LOGOUT RAN - RESPONSE.STATUS`, response.status);
  dispatch(removeUser());
  return response;
}



/** =======INITIAL STATE: =========*/
const initialState = {user: null}

/** =======REDUCER: =========*/
const sessionReducer = (state = initialState, action) => {
  // console.log('SESSION REDUCER RAN - STATE AND ACTION', state, action)
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
