import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavScroll() { 

  return (
    <Navbar expand="lg" className="bg-black text-white">
      <Container fluid>
        <Navbar.Brand href="#" className='text-white'>Xploro</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className="bg-white" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" className='text-white'>Home</Nav.Link>
            <Nav.Link href="#action2" className='text-white'>Host</Nav.Link>
          </Nav>
          <Form className="d-flex mx-3">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light">Search</Button>
            </Form>
          <Nav.Link href="#action2" className='text-white'>{localStorage.getItem("loggedInUser")}</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;