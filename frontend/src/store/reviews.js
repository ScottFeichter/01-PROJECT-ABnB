import { csrfFetch } from "./csrf";

/** =======ACTION TYPE CONSTANTS: =========*/
const REVIEWS_CURRENT = "reviews/current";
const REVIEWS_BY_SPOTID = "reviews/reviewBySpotId";
const CREATE_REVIEW = "review/createReview";
const UPDATE_REVIEW = "review/updateReview";
const DELETED_REVIEW = "review/deletedReview";

/** =======ACTION CREATORS: =========*/
const reviewsByCurrent = (reviews) => {
  // console.log('REVIEWSBYCURRENT RAN - REVIEWS', reviews);
  return {
    type: REVIEWS_CURRENT,
    payload: reviews
  };
};

const reviewsBySpotId = (reviews) => {
  // console.log('REVIEWBYID RAN - REVIEWS', reviews);
  return {
    type: REVIEWS_BY_SPOTID,
    payload: reviews
  };
};

const newCreatedReview = (review) => {
  // console.log('NEWCREATEDREVIEW RAN - REVIEWS', review);
  return {
    type: CREATE_REVIEW,
    payload: review
  };
};

const updatedReview = (review) => {
  // console.log('UPDATEDREVIEW RAN - REVIEWS', review);
  return {
    type: UPDATE_REVIEW,
    payload: review
  };
};

const deletedReview = (review) => {
  // console.log('DELETEDREVIEW RAN - REVIEWS', review);
  return {
    type: DELETED_REVIEW,
    payload: review
  };
};


/** =======THUNKS: =========*/

/** GET REVIEWS */
export const getReviewsByCurrent = (currentUserId) => async (dispatch) => {

  const response = await fetch(`/api/reviews/${currentUserId}`);
  const data = await response.json();
  // console.log('THUNK GET REVIEWS BY CURRENT RAN DATA: ', data );
  return dispatch(reviewsByCurrent(data.Reviews));
};

/** GET DETAILS OF A REVIEW FROM AN ID */
export const getReviewsBySpotId = (spotId) => async (dispatch) => {
  // console.log('SPOTID 66 INSIDE REVIEWS.JS', spotId)
  const response = await fetch(`/api/spots/${spotId}/reviews`);
  const data = await response.json();
  // console.log('THUNK GET REVIEW BY SPOT ID RAN DATA: ', data);
  return dispatch(reviewsBySpotId(data));
};


/** POST REVIEWS */

export const createReview = (newReview) => async (dispatch) => {
  const {review, stars, spotId} = newReview;
  // console.log('SPOTID!!!!!!!!!', spotId);

  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({review, stars})
  });

  const data = await response.json();
  // console.log('THUNK CREATEREVIEW RAN DATA: ', data );
  dispatch(newCreatedReview(data));
  return data
};


/** PUT REVIEWS */

export const editReview = (editedReview) => async (dispatch) => {
  const { reviewId } = editedReview;
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedReview)
  });

  const data = await response.json();
  // console.log('THUNK EDITREVIEW RAN DATA: ', data );
  dispatch(updatedReview(data));
  return data
};

/** DELETE REVIEWS */

export const deleteReview = (reviewToDelete) => async (dispatch) => {
  const reviewId = reviewToDelete.id;
  // console.log('REVIEWID FROM REVIEWS 117', reviewId)
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  // const data = await response.json();
  // console.log('THUNK DELETEREVIEW RAN: ', response );
  return dispatch(deletedReview(reviewToDelete));
};




/** =======INITIAL STATE: =========*/
const initialState = {}

/** =======REDUCER: =========*/
const reviewsReducer = (state = initialState, action) => {
  // console.log('REVIEWS REDUCER RAN - STATE AND ACTION', state, action)
  switch (action.type) {

    case REVIEWS_CURRENT:
      // console.log("REVIEWSREDUCER RAN REVIEWS_CURRENT CASE RETURNING: ", {...state, reviews: action.payload})
      return {...state, currentUserReviews: action.payload};

    case REVIEWS_BY_SPOTID:
      // console.log("REVIEWSREDUCER RAN REVIEWS_BY_SPOTID CASE RETURNING: ", {...state, reviews: action.payload})
      return {...state, reviews: action.payload};

    case CREATE_REVIEW:
      // console.log("REVIEWSREDUCER RAN CREATE_REVIEW CASE RETURNING: ", {...state, review: action.payload})
      return {...state, newReview: action.payload};

    case UPDATE_REVIEW:
      // console.log("REVIEWSREDUCER RAN UPDATE_REVIEW CASE RETURNING: ", {...state, review: action.payload})
      return {...state, review: action.payload};

    case DELETED_REVIEW:
      // console.log("REVIEWSREDUCER RAN DELETED_REVIEW CASE RETURNING: ", {...state, review: action.payload})
      return {...state, deletedReview: action.payload};

    default:
      return state;
  }
}

export default reviewsReducer;
