import React, { useState } from "react";

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
import { useHistory } from "react-router-dom";
//import axios to make Register request
import axios from "axios";
import swal from "sweetalert";

function Register() {
  let history = useHistory();
  const initialerror = {
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  };
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfrirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [formerrors, setFormErrors] = useState(initialerror);

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Sending request for:" + FirstName + " " + LastName + "" + Email + "" + Password);
    axios
      .post("http://localhost:62319/api/Authorize/Register", {
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        UserName: Email,
        Password: Password,
      })
      .then((response) => {
        setLoading(false);
        //let the user know registration was succesfull
        console.log(response);

        swal("Great! " + FirstName, "Login to get started :)", "success");

        //redirect to previous page
        history.goBack();
      })
      .catch(function (error) {
        setLoading(false);
        setFormErrors("Couldn't create account");
        console.log(error);
      });
  };

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = formerrors;
    const emailRegx = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    switch (name) {
      case "FirstName":
        errors.FirstName =
          value.length < 3 && value.length > 0
            ? "First Name must be at least 3 characters long"
            : "";
        setFirstName(value);
        break;
      case "LastName":
        errors.LastName =
          value.length < 3 && value.length > 0
            ? "last Name must be at least 3 characters long"
            : "";
        setLastName(value);
        break;
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

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Book Dashboard</small>
            </div>
            <div className="text-center">Create A New Account</div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleRegister}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="First Name"
                    name="FirstName"
                    type="text"
                    value={FirstName}
                    onChange={handleChange}
                  />
              
                </InputGroup>
                {formerrors.FirstName.length > 0 && (
                    <span style={{ color: "red" }}>{formerrors.FirstName}</span>
                  )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Last Name"
                    name="LastName"
                    type="text"
                    value={LastName}
                    onChange={handleChange}
                  />
            
                </InputGroup>
                {formerrors.LastName.length > 0 && (
                    <span style={{ color: "red" }}>{formerrors.LastName}</span>
                  )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
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
                    value={Email}
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
                    name="Password"
                    type="password"
                    autoComplete="new-password"
                    value={Password}
                    onChange={handleChange}
                  />{" "}

                </InputGroup>
                {formerrors.Password.length > 0 && (
                    <span style={{ color: "red" }}>{formerrors.Password}</span>
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
                    placeholder="Confirm Password"
                    name="ConfirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={ConfirmPassword}
                    onChange={(e) => setConfrirmPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>

              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary">
                  {isLoading ? (
                    <Spinner style={{ width: "2rem", height: "2rem" }} />
                  ) : (
                    "Create account"
                  )}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default Register;
