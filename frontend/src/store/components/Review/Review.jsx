import './Review.css';

function Review({prop}) {
    const review = {
        "id": 1,
        "userId": 1,
        "spotId": 1,
        "review": "This was an awesome spot!",
        "stars": 5,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36" ,
        "User": {
          "id": 1,
          "firstName": "John",
          "lastName": "Smith"
        },
        "ReviewImages": [
          {
            "id": 1,
            "url": "image url"
          }
        ],
    }

// stars-------------------------------------------------------------

// const starDisplay;

// for (let i = 0; i <= +review.stars; i++) {

// }

// date-------------------------------------------------------------
    const year = review.createdAt.substring(0,5);
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
    console.log('date===================== ', date);

// return-------------------------------------------------------------

    return (

        <main id="reviewMain">
            <h3 id="reviewFirstName">{review.User.firstName}</h3>
            <h4 id="reviewDate">{date.month} {date.year}</h4>
            <p id="reviewReview">{review.review}</p>
        </main>

    )
}

export default Review;
