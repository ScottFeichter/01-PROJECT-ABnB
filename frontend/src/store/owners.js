// import { csrfFetch } from "./csrf";


/** =======ACTION TYPE CONSTANTS: =========*/
const OWNER_SEARCH = "spot/search";


/** =======ACTION CREATORS: =========*/
const ownerSearch = (owner) => {
  console.log('ownersSEARCH RAN - owners', owner);
  return {
    type: OWNER_SEARCH,
    payload: owner
  };
};


/** =======THUNKS: =========*/

/** GET owners */
export const getOwner = (ownerId) => async (dispatch) => {
  const response = fetch()
  console.log('THUNK GETOWNER RAN DATA: ', data );
  dispatch(ownersSearch(data.owners));
  return data
};

/** POST owners */

/** PUT owners */

/** DELETE owners */




/** =======INITIAL STATE: =========*/
const initialState = {}

/** =======REDUCER: =========*/
const ownersReducer = (state = initialState, action) => {
  // console.log('SESSION REDUCER RAN - STATE AND ACTION', state, action)
  switch (action.type) {
    case SPOT_SEARCH:
      console.log("ownersREDUCER RAN SPOT_SEARCH CASE RETURNING: ", {...state, owners: action.payload})
      return {...state, owners: action.payload};
    default:
      return state;
  }
}

export default ownersReducer;
