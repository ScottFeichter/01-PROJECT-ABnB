import { csrfFetch } from "./csrf";

/** Action Type Constants: */
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";


/**  Action Creators: */
const setUser = (user) => {
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


/** Thunk */
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
  dispatch(setUser(data.user));

  // console.log(">>>> login thunk ran");
  return response;
};

const initialState = {user: null}

/** Reducer: */
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    // do reducer stuff
    case SET_USER:
      return {...state, user: action.payload};
    case REMOVE_USER:
      return {...state, user: null}
    default:
      return state;
  }
}

export default sessionReducer;
