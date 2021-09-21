import React, { useContext, useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
// import classnames from "classnames";
import { Card, CardHeader, Table, Container, Row, Col } from "reactstrap";
import Header from "../../components/Headers/Header.js";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { Spinner } from "reactstrap";

function Index() {
  const [Auth] = useContext(AuthContext);

  const token = Auth.User.AuthToken;
  axios.defaults.baseURL = "http://localhost:62319/api/";
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">


        </Row>
      </Container>
    </>
  );
}

export default Index;
