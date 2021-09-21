import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import axios from "axios";
import { Spinner } from "reactstrap";
import { AuthContext } from "../../Context/AuthContext";
import AddUserModal from "../../components/Modals/UserModal";

export default function Users() {
  const [Auth] = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const token = Auth.User.AuthToken;
  axios.defaults.baseURL = "http://localhost:5000/api/";
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    async function fetchUsers() {
      axios
        .get("/UserProfile/Users")
        .then(function (response) {
          setUsers(response.data);
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          setError("Error fetching data :( ")
      
        })
        .then(function () {
          // always executed
        });
    }

    fetchUsers();
  }, []);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body"></div>
        </Container>
      </div>
      {/* Main content */}
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
                  <h3 className="mb-0">System Users</h3>
                </div>
                <div className="col text-right">
                  <React.Suspense
                    fallback={<Spinner type="grow" color="info" />}
                  >
                    <AddUserModal />
                  </React.Suspense>
                </div>
              </Row>
            </CardHeader>
            <div
              style={{
                alignContent: "Center",
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
            {error ===""? 
              <Table
                striped
                className="align-items-center table-flush"
                responsive
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">UserName</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody
                  style={{
                    alignContent: "Center",
                    maxHeight: "400px",
                    overflowY: "auto",
                  }}
                >
                  <React.Suspense
                    fallback={<Spinner type="grow" color="info" />}
                  >
                    {users.map((users, index) => (
                      <tr key={index}>
                        <th scope="row">{users.userName}</th>
                        <td>{users.firstName}</td>
                        <td>{users.lastName}</td>
                        <td>{users.email}</td>
                        <td>{users.role}</td>
                        <td>
                          <Button className="btn btn-warning">
                            <i className="fa fa-pen"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </React.Suspense>
                </tbody>
              </Table>
            :<span style={{color: "red",textAlign:"center"}}>{error}</span>}
            </div>
          </Card>
        </Col>
      </Container>
    </>
  );
}
