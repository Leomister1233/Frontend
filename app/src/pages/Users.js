import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import UserCard from '../componentes/UserCard'; // Import the UserCard component

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Memoize fetchUsers to avoid unnecessary re-renders
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/users/getusers?page=${currentPage}&limit=20`);
      const data = await response.json();
      setUsers(data.users);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching users', error);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [currentPage]); // Only rerun fetchUsers when currentPage changes

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // Add fetchUsers as a dependency

  return (
    <Container>
      <h1>User List</h1>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {users.map(user => (
          <Col key={user._id} md={4} className="mb-3">
            <UserCard
              _id={user._id}
              first_name={user.first_name}
              last_name={user.last_name}
            />
          </Col>
        ))}
      </Row>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-4">
        <Button
          disabled={currentPage === 1} // Disable if on the first page
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} // Decrement page
        >
          Previous
        </Button>
        <span className="mx-3">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage >= totalPages} // Disable if on the last page
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} // Increment page
        >
          Next
        </Button>
      </div>
    </Container>
  );
}

export default UsersPage;


