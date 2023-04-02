//mainNav layout a little off
//should have a padding so it will be in the center when no hamburger menu
//but i dont like css

import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import Link from "next/link";
import NavDropdown from "react-bootstrap/NavDropdown";
import { readToken, removeToken } from "@/lib/authenticate";
import { addToHistory } from "@/lib/userData";

export default function MainNav() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [isExpanded, setIsExpanded] = useState(false);
  const { register, handleSubmit } = useForm({
    searchText: "",
  });
  let token = readToken();

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/");
  }

  var navToggle = () => {
    setIsExpanded(!isExpanded);
  };

  var navCollapse = () => {
    setIsExpanded(false);
  };

  async function submitForm(data) {
    navCollapse();
    var queryString = `title=true&q=${data.searchField}`;
    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?${queryString}`);
  }
  return (
    <>
      {/* bg-dark because bg-primary makes it light blue instead of like example */}
      <Navbar
        className="fixed-top navbar-dark bg-dark"
        expand="lg"
        expanded={isExpanded}
      >
        <Container fluid>
          <Navbar.Brand>Stephen Suresh</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={navToggle} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto my-2 my-lg-0">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={navCollapse}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  {/* <Nav.Link href="/about">About</Nav.Link> */}
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={navCollapse}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            {token && (
                <Form className="d-flex" onSubmit={handleSubmit(submitForm)}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    {...register("searchField")}
                  />
                  <Button variant="outline-success" type="submit">
                    Search
                  </Button>
                </Form>
            )}
            {token && (
              <Nav>
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === "/favourites"}
                      onClick={navCollapse}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === "/history"}
                      onClick={navCollapse}
                    >
                      History
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {!token && (
              <>
                <Nav>
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link
                      active={router.pathname === "/"}
                      onClick={navCollapse}
                    >
                      Register
                    </Nav.Link>
                  </Link>
                </Nav>

                <Nav>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link
                      active={router.pathname === "/"}
                      onClick={navCollapse}
                    >
                      Login
                    </Nav.Link>
                  </Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
