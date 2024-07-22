import './Review.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DeleteReviewModalButton from "../DeleteReviewModalButton"
import DeleteReviewModal from '../DeleteReviewModal';

function Review({review}) {

    // console.log('PROP++++++', review);

    // const review = {
    //     "id": 1,
    //     "userId": 1,
    //     "spotId": 1,
    //     "review": "This was an awesome spot!",
    //     "stars": 5,
    //     "createdAt": "2021-11-19 20:39:36",
    //     "updatedAt": "2021-11-19 20:39:36" ,
    //     "User": {
    //       "id": 1,
    //       "firstName": "John",
    //       "lastName": "Smith"
    //     },
    //     "ReviewImages": [
    //       {
    //         "id": 1,
    //         "url": "image url"
    //       }
    //     ],
    // }

// stars-------------------------------------------------------------

// const starDisplay;

// for (let i = 0; i <= +review.stars; i++) {

// }

// date-------------------------------------------------------------
    const year = review.createdAt.substring(0,4);
    const monthNum = review.createdAt.substring(5, 7);
    const months = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }
    const month = months[monthNum];
    const date = {month: month, year: year};
    // console.log('date===================== ', date);


// check if delete review button should show --------------------------------------

const [deleteReviewButton, setDeleteReviewButton] = useState(false);
const session = useSelector(state => state.session.user);
// console.log('SESSION', !!session, review.userId, session.id, review);

let sessionBool;
if(session === null) {
    sessionBool = false;
} else {
    sessionBool = true;
}

let isSame;
if (session === null) {
    isSame = false
} else {
    isSame = review.userId === session.id;
}

// console.log(sessionBool, isSame);

useEffect(()=> {
    if(sessionBool === true && isSame === true) {
        setDeleteReviewButton(true);
    } else setDeleteReviewButton(false);



}, [])

// console.log('DELETE REVIEW BUTTON', deleteReviewButton);

// return-------------------------------------------------------------

    return (

        <main id="reviewMain">
            <div id="reviewReviewer">
                <h3 id="reviewFirstName">{review.User.firstName}</h3>
                <h4 id="reviewDate">{date.month} {date.year}</h4>
            </div>
            <p id="reviewReview">{`"${review.review}"`}</p>
            {deleteReviewButton ?
             <DeleteReviewModalButton
             buttonText={'Delete'}
             modalComponent= {<DeleteReviewModal review={review}/>}
             /> : ""
            }

        </main>

    )
}

export default Review;
