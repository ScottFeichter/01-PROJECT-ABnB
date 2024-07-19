
/** =======ACTION TYPE CONSTANTS: =========*/
const BOOKING_SEARCH = "booking/search";
const BOOKING_BY_ID = "booking/bookingById";
const CREATE_BOOKING = "booking/createBooking";
const UPDATE_BOOKING = "booking/updateBooking";
const DELETED_BOOKING = "booking/deletedBooking";

/** =======ACTION CREATORS: =========*/
const bookingsSearch = (bookings) => {
  console.log('BOOKINGSSEARCH RAN - BOOKINGS', bookings);
  return {
    type: BOOKING_SEARCH,
    payload: bookings
  };
};

const bookingById = (booking) => {
  console.log('BOOKINGBYID RAN - BOOKINGS', booking);
  return {
    type: BOOKING_BY_ID,
    payload: booking
  };
};

const newCreatedBooking = (booking) => {
  console.log('NEWCREATEDBOOKING RAN - BOOKINGS', booking);
  return {
    type: CREATE_BOOKING,
    payload: booking
  };
};

const updatedBooking = (booking) => {
  console.log('UPDATEDBOOKING RAN - BOOKINGS', booking);
  return {
    type: UPDATE_BOOKING,
    payload: booking
  };
};

const deletedBooking = (booking) => {
  console.log('DELETEDBOOKING RAN - BOOKINGS', booking);
  return {
    type: DELETED_BOOKING,
    payload: booking
  };
};


/** =======THUNKS: =========*/

/** GET BOOKINGS */
export const getBookings = () => async (dispatch) => {

  const response = await fetch("/api/bookings");
  const data = await response.json();
  console.log('THUNK GETBOOKINGS RAN DATA: ', data );
  dispatch(bookingsSearch(data.Bookings));
  return data
};

/** GET DETAILS OF A BOOKING FROM AN ID */
export const getBookingDetailsById = (bookingId) => async (dispatch) => {
  const response = await fetch(`/api/bookings/${bookingId}`);
  const data = await response.json();
  console.log('THUNK GET BOOKING BY ID RAN DATA: ', data );
  dispatch(bookingById(data));
  return data
};


/** POST BOOKINGS */

export const createBooking = (newBooking) => async (dispatch) => {
  const response = await fetch(`/api/bookings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newBooking)
  });

  const data = await response.json();
  console.log('THUNK CREATEBOOKING RAN DATA: ', data );
  dispatch(newCreatedBooking(data));
  return data
};


/** PUT BOOKINGS */

export const editBooking = (editedBooking) => async (dispatch) => {
  const { bookingId } = editedBooking;
  const response = await fetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedBooking)
  });

  const data = await response.json();
  console.log('THUNK EDITBOOKING RAN DATA: ', data );
  dispatch(updatedBooking(data));
  return data
};

/** DELETE BOOKINGS */

export const deleteBooking = (bookingToDelete) => async (dispatch) => {
  const {bookingId} = bookingToDelete;
  const response = await fetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  // const data = await response.json();
  console.log('THUNK DELETEBOOKING RAN: ', response );
  dispatch(deletedBooking(bookingToDelete));
  return
};




/** =======INITIAL STATE: =========*/
const initialState = {}

/** =======REDUCER: =========*/
const bookingsReducer = (state = initialState, action) => {
  console.log('SESSION REDUCER RAN - STATE AND ACTION', state, action)
  switch (action.type) {

    case BOOKING_SEARCH:
      console.log("BOOKINGSREDUCER RAN BOOKING_SEARCH CASE RETURNING: ", {...state, bookings: action.payload})
      return {...state, bookings: action.payload};

    case BOOKING_BY_ID:
      console.log("BOOKINGSREDUCER RAN BOOKING_BY_ID CASE RETURNING: ", {...state, booking: action.payload})
      return {...state, booking: action.payload};

    case CREATE_BOOKING:
      console.log("BOOKINGSREDUCER RAN CREATE_BOOKING CASE RETURNING: ", {...state, booking: action.payload})
      return {...state, booking: action.payload};


    case UPDATE_BOOKING:
      console.log("BOOKINGSREDUCER RAN UPDATE_BOOKING CASE RETURNING: ", {...state, booking: action.payload})
      return {...state, booking: action.payload};

    case DELETED_BOOKING:
      console.log("BOOKINGSREDUCER RAN DELETED_BOOKING CASE RETURNING: ", {...state, booking: action.payload})
      return {...state, booking: action.payload};

    default:
      return state;
  }
}

export default bookingsReducer;
