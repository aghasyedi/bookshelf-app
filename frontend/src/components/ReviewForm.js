import { useState } from "react";
import { submitReview } from "../api/index";

const ReviewForm = ({ bookId, refreshBook }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(1);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      text,
      rating,
    };

    try {
      await submitReview(bookId, reviewData); 
      setText(""); 
      setRating(1); 
      refreshBook();
    } catch (error) {
      console.error("Error adding review:", error);
      setError("Could not submit review");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review..."
        required
      />
      <div>
        <span style={{marginRight: 5}}>Select Rating</span>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <button type="submit">Submit Review</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default ReviewForm;
