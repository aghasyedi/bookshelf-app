import { useEffect, useState, useCallback } from "react";
import ReviewForm from "../components/ReviewForm";
import { Link, useParams } from "react-router-dom";
import { getBookDetails } from "../api/index";

const BookDetail = () => {
  const { id: bookId } = useParams();
  const [book, setBook] = useState(null);

  const fetchBook = useCallback(async () => {
    try {
      const data = await getBookDetails(bookId);
      // console.log(data);
      setBook(data);
    } catch (error) {
      console.error(error);
    }
  }, [bookId]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  return (
    <div className="book-detail-container">
      {book ? (
        <>
          <div className="book-content">
            <img src={book.thumbnail} alt={`${book.title} cover`} />
            <div className="book-info">
              <h2>{book.title}</h2>
              <p>
                Author:{" "}
                {book.authors.length > 0 ? book.authors.join(", ") : "Unknown"}
              </p>
              <p>Average Rating: {book.averageRating.toFixed(2)}</p>
              <div>
                <Link to="/">Search Books</Link>
                <Link to="/mybookshelf">My Bookshelf</Link>
              </div>
            </div>
          </div>

          <div className="review-section">
            <h3>Reviews:</h3>
            {book.reviews.length > 0 ? (
              book.reviews.map((review) => (
                <div key={review._id}>
                  <p>
                    <strong>{review.userId?.username || "Unknown User"}</strong>
                    : {review.text} <br />
                    <span>
                      <b>Rated: </b>
                      {review.rating}/5
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <p>No reviews yet</p>
            )}
          </div>

          {/* Add Review Form */}
          <div className="review-form">
            <ReviewForm bookId={bookId} refreshBook={fetchBook} />
          </div>
        </>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetail;
