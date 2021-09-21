import React, { useState, useEffect, useContext } from "react";

// reactstrap components
import {  Container, Row, Col } from "reactstrap";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

function Header() {
  const [Auth] = useContext(AuthContext);

  const token = Auth.User.AuthToken;
  axios.defaults.baseURL = "http://localhost:62319/api/";
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    async function fetchData() {
      axios
        .get("/Dashbord")
        .then(function (response) {
 
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
    //fetchData();
    
  }, []);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
          
            <Row>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Header;
