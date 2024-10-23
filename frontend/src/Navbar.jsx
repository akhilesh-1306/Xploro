import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file

function NavScroll() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="glass-effect" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/home" className="text-black">Xploro</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="bg-white" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="/home" className="text-black">Home</Nav.Link>
              <Nav.Link href="/host" className="text-black">Host</Nav.Link>
              <Nav.Link href="/for-you" className="text-black">For You</Nav.Link>
            </Nav>

            {/* Search Form */}
            <Form className="d-flex mx-3" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search events"
                className="me-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                aria-label="Search"
              />
              <Button variant="outline-light" type="submit" className="text-black"><i className="fa-solid fa-magnifying-glass"></i></Button>
            </Form>

            <Nav.Link href="/profile" className="text-black">
              {localStorage.getItem("loggedInUser")}
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavScroll;
