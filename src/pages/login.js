import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner,
} from "reactstrap";
// import Aut context
import { AuthContext } from "../Context/AuthContext";
//import axios to make login request
import axios from "axios";

const Login = (props) => {
  let history = useHistory();
  const [, setAuth] = useContext(AuthContext);
  const initialerror = {
    Email: "",
    Password: "",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [formerrors, setFormErrors] = useState(initialerror);


  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = formerrors;
    const emailRegx = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    switch (name) {
      case "Email":
        errors.Email =
          emailRegx.test(value) && value.length > 0
            ? ""
            : "Invalid Email address format";
        setEmail(value);
        break;
      case "Password":
        errors.Password =
          value.length < 6 && value.length > 0
            ? "password must be at least 6 characters long"
            : "";
        setPassword(value);
        break;
      default:
        break;
    }

    setFormErrors(errors, { [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // send a request to API using axios
    console.log("sending request to endpoint for :" + email + password)
    axios
      .post("http://localhost:62319/api/Authorize/Login", {
        Username: email,
        Password: password,
      })
      .then(
        (response) => {
          console.log(response)
          var user = response.data.user;
          const role = response.data.userRole;
          setLoading(false);

          const updatedstate = {
            IsAuthenticated: true,
            User: {
              FirstName: user.firstName,
              LastName: user.lastName,
              Email: user.email,
              AuthToken: response.data.token,
              Role: response.data.userRole,
            },
          };

          //update the Auth context
          setAuth(updatedstate);

          //redirect to dashboard
          if (role === "Admin") {
            history.push("/admin/index");
          } else if (role === "Developer") {
            history.push("/developer/index");
          } else if (role === "Subscriber") {
            history.push("/client/index");
          }
        },
        (error) => {
          setLoading(false);
          setFormErrors("Invalid Email or Password");
          console.log(error);
        }
      );
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Book Dashboard</small>
            </div>
            <div className="btn-wrapper text-center">Login</div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    name="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={handleChange}
                  />
                </InputGroup>
                {formerrors.Email.length > 0 && (
                  <span style={{ color: "red" }}>{formerrors.Email}</span>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="Password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handleChange}
                  />
                </InputGroup>
                {formerrors.Password.length > 0 && (
                  <span style={{ color: "red" }}>{formerrors.Password}</span>
                )}
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary">
                  {isLoading ? (
                    <Spinner style={{ width: "2rem", height: "2rem" }} />
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
