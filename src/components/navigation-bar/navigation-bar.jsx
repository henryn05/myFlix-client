import { useState, useEffect } from "react";
import { Navbar, Container, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, handleSearchInput, handleGenreSelect, searchInput, genreSelect }) => {

  return (
    <Navbar className="my-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix
        </Navbar.Brand>
        { user && window.location.pathname === "/" && (
          <>
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchInput}
            />
            <select value={genreSelect} onChange={handleGenreSelect}>
              <option value="">All Genres</option>
              <option value="Adventure">Adventure</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Crime">Crime</option>
            </select>
          </>
        )}
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="menu-tooltip">Toggle Menu</Tooltip>}
        >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </OverlayTrigger>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}