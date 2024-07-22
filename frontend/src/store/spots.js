import { csrfFetch } from "./csrf";


/** =======ACTION TYPE CONSTANTS: =========*/
const SPOT_SEARCH = "spot/search";
const SPOT_CURRENT_USER = "spot/currentUser";
const SPOT_BY_ID = "spot/spotById";
const CREATE_SPOT = "spot/createSpot";
const UPDATE_SPOT = "spot/updateSpot";
const DELETED_SPOT = "spot/deletedSpot";

/** =======ACTION CREATORS: =========*/
const spotsSearch = (spots) => {
  console.log('SPOTSSEARCH RAN - SPOTS', spots);
  return {
    type: SPOT_SEARCH,
    payload: spots
  };
};


const spotsCurrentUser = (currentUserSpots) => {
  console.log('SPOTSCURRENTUSER RAN - SPOTS', currentUserSpots);
  return {
    type: SPOT_CURRENT_USER,
    payload: currentUserSpots
  };
};

const spotById = (spot) => {
  // console.log('SPOTBYID RAN - SPOTS', spot);
  return {
    type: SPOT_BY_ID,
    payload: spot
  };
};

const newCreatedSpot = (spot) => {
  console.log('NEWCREATEDSPOT RAN - SPOTS', spot);
  return {
    type: CREATE_SPOT,
    payload: spot
  };
};

const updateSpot = (spot) => {
  console.log('UPDATEDSPOT RAN - SPOTS', spot);
  return {
    type: UPDATE_SPOT,
    payload: spot
  };
};

const deletedSpot = (spot) => {
  console.log('DELETEDSPOT RAN - SPOTS', spot);
  return {
    type: DELETED_SPOT,
    payload: spot
  };
};


/** =======THUNKS: =========*/

/** GET SPOTS */
export const search = (/*search*/) => async (dispatch) => {

  const response = await fetch("/api/spots");
  const data = await response.json();
  const spots = data.Spots;
  console.log('THUNK SEARCH RAN DATA: ', spots);

  return dispatch(spotsSearch(spots))
};


/** GET CURRENT USER SPOTS*/
export const getCurrentUserSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`);
  const data = await response.json();
  const currentUserSpots = data.Spots;
  // console.log('THUNK GETCURRENTUSERSPOTS RAN DATA: ', currentUserSpots);
  return dispatch(spotsCurrentUser(currentUserSpots));
};


/** GET DETAILS OF A SPOT FROM AN ID */
export const getSpotDetailsById = (spotId) => async (dispatch) => {
  console.log('SPOTID FORM SPOTDETAILS SPOTS 89', spotId)
  const response = await fetch(`/api/spots/${spotId}`);
  const data = await response.json();
  console.log('THUNK GETSPOTBYID RAN DATA: ', data );

  return dispatch(spotById(data));
};


/** POST SPOTS */

export const createSpot = (newSpot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newSpot)
  });

  const data = await response.json();
  console.log('THUNK CREATESPOT RAN DATA: ', data );

  return dispatch(newCreatedSpot(data));
};


/** PUT SPOTS */

export const editSpot = (editedSpot) => async (dispatch) => {
  const { spotId, updatedSpot } = editedSpot;
  console.log('UPDATED SPOT FROM SPOTS EDIT SPOT', updatedSpot);

  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedSpot)
  });

  const data = await response.json();
  console.log('THUNK EDITSPOT RAN DATA: ', data );

  return dispatch(updateSpot(data));
};

/** DELETE SPOTS */

export const deleteSpot = (spot) => async (dispatch) => {
  const spotId = spot.id;
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  // const data = await response.json();
  console.log('THUNK DELETESPOT RAN: ', response );
  return dispatch(deletedSpot(spot));
};




/** =======INITIAL STATE: =========*/
const initialState = {}

/** =======REDUCER: =========*/
const spotsReducer = (state = initialState, action) => {
  // console.log('SPOTS REDUCER RAN - STATE AND ACTION', state, action)

  switch (action.type) {

    case SPOT_SEARCH:
      // console.log("SPOTSREDUCER RAN SPOT_SEARCH CASE RETURNING: ", {...state, spots: action.payload})
      return {...state, allSpots: action.payload}

    case SPOT_CURRENT_USER:
      console.log("SPOTSREDUCER RAN SPOTS_CURRENT_USER CASE RETURNING: ", {...state, spotsCurrentUser: action.payload})
      return {...state, spotsCurrentUser: action.payload}

    case SPOT_BY_ID:
      // console.log("SPOTSREDUCER RAN SPOT_BY_ID CASE RETURNING: ", {...state, spot: action.payload})
      return {...state, spotDetail: action.payload};

    case CREATE_SPOT:
      console.log("SPOTSREDUCER RAN CREATE_SPOT CASE RETURNING: ")
      return {...state, NewSpot: action.payload};


    case UPDATE_SPOT:
      console.log("SPOTSREDUCER RAN UPDATE_SPOT CASE RETURNING: ")
      return {...state, EditedSpot: action.payload};

    case DELETED_SPOT:
      console.log("SPOTSREDUCER RAN DELETED_SPOT CASE RETURNING: ")
      return {...state, DeletedSpot: action.payload};

    default:
      // console.log('SPOTSREDUCER RAN DEFAULT')
      return state;
  }
}

export default spotsReducer;
