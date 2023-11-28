import React, { useState } from 'react';

const UniversityCard = ({ university, closeModal }) => {
  const { name, web_pages: webPages, country } = university;
  const [writeReview, setWriteReview] = useState(false);

  const handleReview = () => {
    setWriteReview(!writeReview);
  };

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
        <div>
          <textarea type="text" placeholder="Write a review..." className="write-review" />
          <div className="review-buttons">
            <button type="button" className="cancel-button" onClick={() => handleReview()}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </div>
        )}
    </div>
  );
};

export default UniversityCard;
