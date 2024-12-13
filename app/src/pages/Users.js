import React, { useState } from 'react';

function Users() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        year_of_birth: '',
        job: '',
        reviews: [{ book_id: '', score: '', recommendation: '', review_date: Date.now() }], // At least one review
      });
    
      // Handle changes in form input fields
      const handleInputChange = (e) => {
        const { name, value, dataset } = e.target;
        if (name === 'reviews') {
          // Update the review fields dynamically
          const { reviewIndex } = dataset;
          const updatedReviews = [...formData.reviews];
          updatedReviews[reviewIndex][name] = value;
          setFormData({ ...formData, reviews: updatedReviews });
        } else {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
      };
    
      // Handle adding a new review
      const handleAddReview = () => {
        setFormData({
          ...formData,
          reviews: [
            ...formData.reviews,
            { book_id: '', score: '', recommendation: '', review_date: Date.now() },
          ],
        });
      };
    
      // Handle the form submission
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Ensure there's at least one review before submitting
        if (formData.reviews.some(review => review.book_id && review.score)) {
          console.log('User Data Submitted:', formData);
          setFormData({
            first_name: '',
            last_name: '',
            year_of_birth: '',
            job: '',
            reviews: [{ book_id: '', score: '', recommendation: '', review_date: Date.now() }], // At least one review
          });
        } else {
          alert('At least one review must be added.');
        }
      };
    
    return (
        <div className="container">
          <h1>Create a New User</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="year_of_birth" className="form-label">
                Year of Birth
              </label>
              <input
                type="number"
                className="form-control"
                id="year_of_birth"
                name="year_of_birth"
                value={formData.year_of_birth}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="job" className="form-label">
                Job Title
              </label>
              <input
                type="text"
                className="form-control"
                id="job"
                name="job"
                value={formData.job}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Dynamic review input fields */}
            <div className="mb-3">
              <label htmlFor="reviews" className="form-label">
                Reviews (At least one required)
              </label>
              {formData.reviews.map((review, index) => (
                <div key={index} className="border p-3 mb-3">
                  <div className="mb-2">
                    <label htmlFor={`book_id_${index}`} className="form-label">
                      Book ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`book_id_${index}`}
                      name="book_id"
                      data-review-index={index}
                      value={review.book_id}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor={`score_${index}`} className="form-label">
                      Score (1-5)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id={`score_${index}`}
                      name="score"
                      data-review-index={index}
                      value={review.score}
                      onChange={handleInputChange}
                      required
                      min="1"
                      max="5"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor={`recommendation_${index}`} className="form-label">
                      Recommendation (true/false)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`recommendation_${index}`}
                      name="recommendation"
                      data-review-index={index}
                      value={review.recommendation}
                      onChange={handleInputChange}
                    />
                  </div>
                    <div className="mb-2">
                        <input
                            type="text"
                            className="form-control"
                            id={`review_date_${index}`}
                            name="review_date"
                            data-review-index={index}
                            value={review.review_date ? new Date(review.review_date).toISOString() : ''}
                            disabled
                        />
                    </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddReview}
              >
                Add Another Review
              </button>
            </div>
    
            <button type="submit" className="btn btn-primary">
              Create User
            </button>
          </form>
        </div>
      );
}

export default Users
