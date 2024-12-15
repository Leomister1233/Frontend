import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Alert, Spinner, Row, Col, Card, Form } from 'react-bootstrap';

function UserDetailPage() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [userReviews, setUserReviews] = useState([]); 
  const [message, setMessage] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const [isEditing, setIsEditing] = useState(false); 
  const [updatedUser, setUpdatedUser] = useState({
    first_name: '',
    last_name: '',
    year_of_birth: '',
    job: '',
  });
const [updatedReviews, setUpdatedReviews] = useState([]);

useEffect(() => {
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userResponse = await fetch(`http://localhost:3000/api/users/getusers?page=1&limit=100`);
      if (!userResponse.ok) throw new Error('Failed to fetch user info');
      const userData = await userResponse.json();

      const user = userData.users.find((user) => user._id === parseInt(id));
      if (!user) throw new Error('User not found in /getusers response');
      setUserInfo(user);

      const reviewsResponse = await fetch(`http://localhost:3000/api/users/user/${id}`);
      const reviewsData = await reviewsResponse.json();

      if (reviewsData.message) {
        setMessage(reviewsData.message); 
      } else {
        setUserReviews(reviewsData.reviews);
        setUpdatedReviews(reviewsData.reviews); 
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchUserData();
}, [id]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setUpdatedUser((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleReviewChange = (e, index) => {
  const { name, value } = e.target;
  setUpdatedReviews((prev) => {
    const updatedReviews = [...prev];
    updatedReviews[index] = {
      ...updatedReviews[index],
      [name]: value,
    };
    return updatedReviews;
  });
};

const handleDeleteUser = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/deleteuser/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
    alert('User deleted successfully');
    setUserInfo(null);
  } catch (error) {
    setError('Error deleting user');
  }
};

const handleUpdateUser = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });
    if (!response.ok) throw new Error('Failed to update user');
    alert('User updated successfully');
    setUserInfo(updatedUser); 
    setIsEditing(false);
  } catch (error) {
    setError('Error updating user');
  }
};

if (loading) {
  return (
    <div className="text-center">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

if (error) {
  return <Alert variant="danger">{error}</Alert>;
}

if (!userInfo) {
  return <Alert variant="info">User not found</Alert>;
}

return (
  <Container>
    <h1>User Details</h1>

    {isEditing ? (
        <div>
        <h3 className="mb-4">Edit User</h3>
        <Form>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={updatedUser.first_name}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={updatedUser.last_name}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="yearOfBirth">
                <Form.Label>Year of Birth</Form.Label>
                <Form.Control
                  type="number"
                  name="year_of_birth"
                  value={updatedUser.year_of_birth}
                  onChange={handleChange}
                  placeholder="Enter year of birth"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="job">
                <Form.Label>Job</Form.Label>
                <Form.Control
                  type="text"
                  name="job"
                  value={updatedUser.job}
                  onChange={handleChange}
                  placeholder="Enter job title"
                />
              </Form.Group>
            </Col>
          </Row>
    
          <h4 className="mt-4 mb-3">Reviews</h4>
          <Row>
            {updatedReviews.map((review, index) => (
              <Col md={6} lg={4} key={index} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>Review {index + 1}</Card.Title>
                    <Form.Group controlId={`score-${index}`} className="mb-3">
                      <Form.Label>Score</Form.Label>
                      <Form.Control
                        type="number"
                        name="score"
                        value={review.score}
                        onChange={(e) => handleReviewChange(e, index)}
                      />
                    </Form.Group>
                    <Form.Group controlId={`recommendation-${index}`}>
                      <Form.Label>Recommendation</Form.Label>
                      <Form.Select
                        name="recommendation"
                        value={review.recommendation}
                        onChange={(e) => handleReviewChange(e, index)}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
    
          <div className="text-center mt-4">
            <Button variant="primary" onClick={handleUpdateUser}>
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    ) : (
      <div>
        <h3>{userInfo.first_name} {userInfo.last_name}</h3>
        <p>Year of Birth: {userInfo.year_of_birth}</p>
        <p>Job: {userInfo.job}</p>

        <div>
          <h4>Reviews</h4>
          {message && <Alert variant="info">{message}</Alert>}
          <Row>
            {userReviews.map((review, index) => (
              <Col key={index} md={4} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{review.book.title}</Card.Title>
                    <Card.Text>ISBN: {review.book.isbn}</Card.Text>
                    <Card.Text>Score: {review.score}</Card.Text>
                    <Card.Img variant="top" src={review.book.thumbnail} />
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="danger" onClick={handleDeleteUser}>Delete User</Button>
          <Button variant="primary" onClick={() => setIsEditing(true)}>Update User Info</Button>
        </div>
      </div>
    )}
  </Container>
);
}

export default UserDetailPage;