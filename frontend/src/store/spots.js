
/** =======ACTION TYPE CONSTANTS: =========*/
const SPOT_SEARCH = "spot/search";
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

const spotById = (spot) => {
  console.log('SPOTBYID RAN - SPOTS', spot);
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

const updatedSpot = (spot) => {
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
export const search = (search) => async (dispatch) => {

  const response = await fetch("/api/spots");
  const data = await response.json();
  console.log('THUNK SEARCH RAN DATA: ', data );
  dispatch(spotsSearch(data.Spots));
  return data
};

/** GET DETAILS OF A SPOT FROM AN ID */
export const getSpotDetailsById = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);
  const data = await response.json();
  console.log('THUNK SEARCH RAN DATA: ', data );
  dispatch(spotById(data));
  return data
};


/** POST SPOTS */

export const createSpot = (newSpot) => async (dispatch) => {
  const response = await fetch(`/api/spots/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newSpot)
  });

  const data = await response.json();
  console.log('THUNK CREATESPOT RAN DATA: ', data );
  dispatch(newCreatedSpot(data));
  return data
};


/** PUT SPOTS */

export const editSpot = (editedSpot) => async (dispatch) => {
  const { spotId } = editedSpot;
  const response = await fetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedSpot)
  });

  const data = await response.json();
  console.log('THUNK EDITSPOT RAN DATA: ', data );
  dispatch(updatedSpot(data));
  return data
};

/** DELETE SPOTS */

export const deleteSpot = (spotToDelete) => async (dispatch) => {
  const {spotId} = spotToDelete;
  const response = await fetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  // const data = await response.json();
  console.log('THUNK EDITSPOT RAN: ', response );
  dispatch(deletedSpot(spotToDelete));
  return
};




/** =======INITIAL STATE: =========*/
const initialState = {}

/** =======REDUCER: =========*/
const spotsReducer = (state = initialState, action) => {
  console.log('SPOTS REDUCER RAN - STATE AND ACTION', state, action)
  switch (action.type) {

    case SPOT_SEARCH:
      console.log("SPOTSREDUCER RAN SPOT_SEARCH CASE RETURNING: ", {...state, spots: action.payload})
      return {...state, spots: action.payload};

    case SPOT_BY_ID:
      console.log("SPOTSREDUCER RAN SPOT_BY_ID CASE RETURNING: ", {...state, spot: action.payload})
      return {...state, spot: action.payload};

    case CREATE_SPOT:
      console.log("SPOTSREDUCER RAN CREATE_SPOT CASE RETURNING: ", {...state, spot: action.payload})
      return {...state, spot: action.payload};


    case UPDATE_SPOT:
      console.log("SPOTSREDUCER RAN UPDATE_SPOT CASE RETURNING: ", {...state, spot: action.payload})
      return {...state, spot: action.payload};

    case DELETED_SPOT:
      console.log("SPOTSREDUCER RAN DELETED_SPOT CASE RETURNING: ", {...state, spot: action.payload})
      return {...state, spot: action.payload};

    default:
      return state;
  }
}

export default spotsReducer;
