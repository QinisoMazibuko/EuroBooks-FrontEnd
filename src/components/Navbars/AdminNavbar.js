import React from "react";
// reactstrap components
import {
  Navbar,
  Nav,
  Container
} from "reactstrap";

import NavbarProfile from "./NavbarProfile";

class AdminNavbar extends React.Component {


    render() {
      return (
        <>
          <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
            <Container fluid>
              <span
                className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                
              >
                {this.props.brandText}
              </span>
   
              <Nav className="align-items-center d-none d-md-flex" navbar>
              <NavbarProfile/>
             </Nav>
            </Container>
          </Navbar>
        </>
      );
    }
  }
  
  export default AdminNavbar;
