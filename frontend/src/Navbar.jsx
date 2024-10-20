// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

// function NavScroll() { 

//   return (
//     <Navbar expand="lg" className="bg-black text-white sticky-top">
//       <Container fluid>
//         <Navbar.Brand href="/home" className='text-white'>Xploro</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" className="bg-white" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//           >
//             <Nav.Link href="/home" className='text-white'>Home</Nav.Link>
//             <Nav.Link href="/host" className='text-white'>Host</Nav.Link>
//           </Nav>
//           <Form className="d-flex mx-3">
//               <Form.Control
//                 type="search"
//                 placeholder="Search"
//                 className="me-2"
//                 aria-label="Search"
//               />
//               <Button variant="outline-light">Search</Button>
//             </Form>
//           <Nav.Link href="/profile" className='text-white'>{localStorage.getItem("loggedInUser")}</Nav.Link>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavScroll;


import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NavScroll() { 
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    console.log(searchQuery);
    // If searchQuery exists, navigate to search results page
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Navbar expand="lg" className="bg-black text-white sticky-top">
      <Container fluid>
        <Navbar.Brand href="/home" className='text-white'>Xploro</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className="bg-white" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/home" className='text-white'>Home</Nav.Link>
            <Nav.Link href="/host" className='text-white'>Host</Nav.Link>
          </Nav>

          {/* Search Form */}
          <Form className="d-flex mx-3" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search by event title or tags"
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
              aria-label="Search"
            />
            <Button variant="outline-light" type="submit">Search</Button>
          </Form>

          <Nav.Link href="/profile" className='text-white'>
            {localStorage.getItem("loggedInUser")}
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;
