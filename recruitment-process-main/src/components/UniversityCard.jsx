import React, { useState } from 'react';

const UniversityCard = ({ university, closeModal }) => {
  const { name, web_pages: webPages, country } = university;
  const [writeReview, setWriteReview] = useState(false);
  const [reviewContent, setReviewContent] = useState("");

  const handleReview = () => {
    setWriteReview(!writeReview);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(reviewContent.trim());
  }

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
