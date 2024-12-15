import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function UserCard({ _id, first_name, last_name }) {
    const navigate = useNavigate();
    const handleViewDetails = () => {
      navigate(`/user/${_id}`); // Navigate to the user detail page
    };
  
    return (
      <Card style={{ width: '18rem' }} className="mb-3">
        <Card.Body>
          <Card.Title>{first_name} {last_name}</Card.Title>
          <Card.Text>ID: {_id}</Card.Text>
          <Button onClick={handleViewDetails} variant="outline-primary">
            View Details
          </Button>
        </Card.Body>
      </Card>
    );
  }
  
  export default UserCard;
