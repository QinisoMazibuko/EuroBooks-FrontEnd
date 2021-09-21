import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Alert,
  Button,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { ChatContext } from "../../Context/ChatContext";

export default function ActiveTickets() {
  const [Auth] = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  let history = useHistory();
  const [, , updateChat] = useContext(ChatContext);

  const token = Auth.User.AuthToken;
  axios.defaults.baseURL = "http://localhost:5000/api/";
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    function fetchTickets() {
      axios
        .get("/Ticket/ActiveTickets")
        .then(function (response) {
          setTickets(response.data);
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          setError("Error fetching data :( ");
        })
        .then(function () {});
    }

      fetchTickets();

  }, []);

  function GoChat(id) {
    updateChat(id);

    setTimeout(function () {
      if (id != null) {
        history.push("/client/chat");
      }
    }, 2000);
  }

  return (
    <Container
      className="mt--7"
      fluid
      style={{
        alignContent: "Center",
      }}
    >
      <Col className="mb-5 mb-xl-0" xl="12">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">Active TICKETS</h3>
              </div>
              <div className="col text-right">....</div>
            </Row>
          </CardHeader>
          <div
            style={{
              alignContent: "Center",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {error.length > 1 ? (
              <Alert style={{ backgroundColor: "grey" }}>
                You Have no active tickets
              </Alert>
            ) : (
              <Table
                striped
                className="align-items-center table-flush"
                responsive
                style={{ alignContent: "center" }}
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Subject</th>
                    <th scope="col">Date Opened</th>
                    <th scope="col">Status </th>
                    <th scope="col">Severity</th>
                    <th scope="col">Ticket No</th>
                    {Auth.User.Role !== "Admin" ? (
                      <th scope="col">Actions</th>
                    ) : (
                      ""
                    )}
                  </tr>
                </thead>

                <tbody
                  style={{
                    alignContent: "Center",
                    maxHeight: "400px",
                    overflowY: "auto",
                  }}
                >
                  {tickets.map((ticket, index) => (
                    <tr key={index}>
                      <th scope="row">{ticket.subject}</th>
                      <td>{ticket.open_Date}</td>
                      <td>{ticket.status}</td>
                      <td>{ticket.severity}</td>
                      <td>{ticket.ticketID}</td>
                      {Auth.User.Role !== "Admin" ? (
                        <Button
                          className="btn ntn-success"
                          color="danger"
                          onClick={() => GoChat(ticket.ticketID)}
                        >
                          {" "}
                          <i className="fa fa-comment">Message</i>
                        </Button>
                      ) : (
                        ""
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Card>
      </Col>
    </Container>
  );
}
