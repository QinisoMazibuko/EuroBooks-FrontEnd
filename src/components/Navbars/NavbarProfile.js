import React, {useContext} from 'react';
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media
  } from "reactstrap";
  import { Link } from "react-router-dom";
  import {AuthContext} from "../../Context/AuthContext";

  import Profileimg from "../../assets/img/theme/Profile-default.png";  

export default function NavbarProfile() {
    const [User,setUser] = useContext(AuthContext);
    const user = User.User;

    function Logout (e){
        e.preventDefault();

        const initialstate = {
            IsAuthenticated :false,
            User:{
                FirstName:"",
                LastName:"",
                Email:"",
                AuthToken: "",
                Role:""
            }
            
        };
        
        setUser(initialstate)
    }

    return (
        <UncontrolledDropdown nav>
        <DropdownToggle className="pr-0" nav>
          <Media className="align-items-center">
            <span className="avatar avatar-sm rounded-circle">
              <img
                alt="..."
                src={Profileimg}
              />
            </span>
            <Media className="ml-2 d-none d-lg-block">
              <span className="mb-0 text-sm font-weight-bold">
               {user.FirstName +" "+ user.LastName}
              </span>
            </Media>
          </Media>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
          <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Welcome!</h6>
          </DropdownItem>
          <DropdownItem to="/admin/user-profile" tag={Link}>
            <i className="ni ni-single-02" />
            <span>{user.Email}</span>
          </DropdownItem>
  
          <DropdownItem href="#pablo" onClick={Logout}>
            <i className="ni ni-user-run" />
            <span>Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
   
    )
}
