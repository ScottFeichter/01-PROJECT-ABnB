import { csrfFetch } from "./csrf";

/** =======ACTION TYPE CONSTANTS: =========*/
const IMAGE_SEARCH = "image/search";
const IMAGE_BY_ID = "image/imageById";
const CREATE_IMAGE = "image/createImage";
const UPDATE_IMAGE = "image/updateImage";
const DELETED_IMAGE = "image/deletedImage";

/** =======ACTION CREATORS: =========*/
const imagesSearch = (images) => {
  // console.log('IMAGESSEARCH RAN - IMAGES', images);
  return {
    type: IMAGE_SEARCH,
    payload: images
  };
};

const imageById = (image) => {
  // console.log('IMAGEBYID RAN - IMAGES', image);
  return {
    type: IMAGE_BY_ID,
    payload: image
  };
};

const newCreatedImage = (image) => {
  // console.log('NEWCREATEDIMAGE RAN - IMAGES', image);
  return {
    type: CREATE_IMAGE,
    payload: image
  };
};

const updatedImage = (image) => {
  // console.log('UPDATEDIMAGE RAN - IMAGES', image);
  return {
    type: UPDATE_IMAGE,
    payload: image
  };
};

const deletedImage = (image) => {
  // console.log('DELETEDIMAGE RAN - IMAGES', image);
  return {
    type: DELETED_IMAGE,
    payload: image
  };
};


/** =======THUNKS: =========*/

/** GET IMAGES */
export const getImages = () => async (dispatch) => {

  const response = await fetch("/api/images");
  const data = await response.json();
  // console.log('THUNK GETIMAGES RAN DATA: ', data );
  dispatch(imagesSearch(data.Images));
  return data
};

/** GET DETAILS OF A IMAGE FROM AN ID */
export const getImageDetailsById = (imageId) => async (dispatch) => {
  const response = await fetch(`/api/images/${imageId}`);
  const data = await response.json();
  // console.log('THUNK GET IMAGE BY ID RAN DATA: ', data );
  dispatch(imageById(data));
  return data
};


/** POST IMAGES */

export const addImageToSpot = (imageInfo) => async (dispatch) => {
  const {spotId, url, preview} = imageInfo

  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({url, preview})
  });

  const data = await response.json();
  // console.log('THUNK ADD IMAGE TO SPOT RAN DATA: ', data );
  dispatch(newCreatedImage(data));
  return data
};


/** PUT IMAGES */

export const editImage = (editedImage) => async (dispatch) => {
  const { imageId } = editedImage;
  const response = await fetch(`/api/images/${imageId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedImage)
  });

  const data = await response.json();
  // console.log('THUNK EDITIMAGE RAN DATA: ', data );
  dispatch(updatedImage(data));
  return data
};

/** DELETE IMAGES */

export const deleteImage = (imageToDelete) => async (dispatch) => {
  const {imageId} = imageToDelete;
  const response = await fetch(`/api/images/${imageId}`, {
    method: "DELETE",
  });

  // const data = await response.json();
  // console.log('THUNK DELETEIMAGE RAN: ', response );
  dispatch(deletedImage(imageToDelete));
  return
};




/** =======INITIAL STATE: =========*/
const initialState = {}

/** =======REDUCER: =========*/
const imagesReducer = (state = initialState, action) => {
  // console.log('IMAGES REDUCER RAN - STATE AND ACTION', state, action)
  switch (action.type) {

    case IMAGE_SEARCH:
      // console.log("IMAGESREDUCER RAN IMAGE_SEARCH CASE RETURNING: ", {...state, images: action.payload})
      return {...state, images: action.payload};

    case IMAGE_BY_ID:
      // console.log("IMAGESREDUCER RAN IMAGE_BY_ID CASE RETURNING: ", {...state, image: action.payload})
      return {...state, image: action.payload};

    case CREATE_IMAGE:
      // console.log("IMAGESREDUCER RAN CREATE_IMAGE CASE RETURNING: ", {...state, image: action.payload})
      return {...state, image: action.payload};


    case UPDATE_IMAGE:
      // console.log("IMAGESREDUCER RAN UPDATE_IMAGE CASE RETURNING: ", {...state, image: action.payload})
      return {...state, image: action.payload};

    case DELETED_IMAGE:
      // console.log("IMAGESREDUCER RAN DELETED_IMAGE CASE RETURNING: ", {...state, image: action.payload})
      return {...state, image: action.payload};

    default:
      return state;
  }
}

export default imagesReducer;
