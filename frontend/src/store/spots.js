import { csrfFetch } from "./csrf";
import getSpotsController from "./getSpotsController";

/** =======ACTION TYPE CONSTANTS: =========*/
const SPOT_SEARCH = "spot/search";


/** =======ACTION CREATORS: =========*/
const spotsSearch = (spots) => {
  console.log('SPOTSSEARCH RAN - SPOTS', spots);
  return {
    type: SPOT_SEARCH,
    payload: spots
  };
};


/** =======THUNKS: =========*/

/** GET SPOTS */
export const search = (search) => async (dispatch) => {
  const data = await getSpotsController(search);
  console.log('THUNK SEARCH RAN DATA: ', data );
  dispatch(spotsSearch(data.Spots));
  return data
};

/** POST SPOTS */

/** PUT SPOTS */

/** DELETE SPOTS */




/** =======INITIAL STATE: =========*/
const initialState = {}

/** =======REDUCER: =========*/
const spotsReducer = (state = initialState, action) => {
  // console.log('SESSION REDUCER RAN - STATE AND ACTION', state, action)
  switch (action.type) {
    case SPOT_SEARCH:
      console.log("SPOTSREDUCER RAN SPOT_SEARCH CASE RETURNING: ", {...state, spots: action.payload})
      return {...state, spots: action.payload};
    default:
      return state;
  }
}

export default spotsReducer;
