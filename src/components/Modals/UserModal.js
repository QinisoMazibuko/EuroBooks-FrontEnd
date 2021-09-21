import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Spinner
} from "reactstrap";
import axios from "axios";
import swal from "sweetalert";
import { AuthContext } from "../../Context/AuthContext";

const AddUserModal = (props) => {
  const [Auth] = useContext(AuthContext);
  const { className } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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
  //
  const token = Auth.User.AuthToken;
  axios.defaults.baseURL = "http://localhost:5000/api/";
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

  //handle input changes
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = formerrors;
    const emailRegx = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

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

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    // send a request to API

    axios
      .post("Dashbord/AddDeveloper", {
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        UserName: Email,
        Password: Password,
      })
      .then(
        (response) => {
          setLoading(false);
          if(response.succeeded === false){
            swal("Oops! ", "Couldn't create account:(", "error");
          }
          else{
            setModal(!modal);
            //let the user know registration was succesfull
            swal("Great! ", "User created successfully:)", "success");
          }
        },
      )
      .catch(function (error) {
        setLoading(false);
        setFormErrors("Couldn't create account");
        console.log(error);
      });
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Add Developer <i className="fa fa-user-plus fa-sm"></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Create Developer Account</ModalHeader>
        <ModalBody>
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
                />
              </InputGroup>
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
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>
            <div className="text-center">
              <Button className="mt-4" color="primary">
                {isLoading ? (
                  <Spinner style={{ width: '2rem', height: '2rem' }} />
                ) : (
                  "Create account"
                )}
              </Button>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddUserModal;
