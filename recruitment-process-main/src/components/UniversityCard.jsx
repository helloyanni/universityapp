import React, { useEffect, useState } from 'react';
import { universityApiReviewsURL } from '../CONSTANTS';

const UniversityCard = ({ university, closeModal }) => {
  const { name, web_pages: webPages, country } = university;
  const [writeReview, setWriteReview] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const [allReviews, setAllReviews] = useState({});

  const handleReview = () => {
    setWriteReview(!writeReview);
  };

  const getReviews = () => {
    fetch(`${universityApiReviewsURL}${name}`)
      .then((response) => response.json())
      .then((data) => {      
          setAllReviews(data);
          console.log(allReviews)
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let newReview = {
      universityName: name,
      review: [reviewContent.trim()]
    }

    console.log(newReview)
    fetch(`${universityApiReviewsURL}${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message)
        newReview = {};
      })
  }

  useEffect(()=> {
    getReviews();
  },[allReviews]);

  return (
    <div className="university-card">
      <button className="close-button" type="button" onClick={() => closeModal()}>X</button>
      <p>
        <b>{name}</b>
      </p>
      <p>
        Country:
        {country}
      </p>
      <p>
        Website:
        {webPages}
      </p>
      {!writeReview
        && <button type="button" onClick={() => handleReview()}>Write a review</button>}
      {writeReview
        && (
        <form onSubmit={handleSubmit}>
          <textarea value={reviewContent} onChange={(e) => setReviewContent(e.target.value)} type="text" placeholder="Write a review..." className="write-review" />
          <div className="review-buttons">
            <button type="button" className="cancel-button" onClick={() => handleReview()}>Cancel</button>
            <button disabled={reviewContent != ""? false : true} type="submit">Submit</button>
          </div>
        </form>
        )}
    </div>
  );
};

export default UniversityCard;
