import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
// import asset styles from the template
import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
//import layouts
import AdminLayout from "./layouts/Admin.js";
import ClientLayout from "./layouts/CLient.js";
import AuthLayout from "./layouts/Auth.js";
// import authentication context
import { AuthContext } from "./Context/AuthContext";


function App() {
  const [Auth] = React.useContext(AuthContext);
  const role = Auth.User.Role[0];

  if (role === "Admin") {
    return (
      <Switch>
        <>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Redirect from="/" to="/admin/index" />
        </>
      </Switch>
    );
  } else if (role === "Client" || role === "Subscriber") {
    return (
      <Switch>
        <>
          <Route
            path="/client"
            render={(props) => <ClientLayout {...props} />}
          />
          <Redirect from="/" to="/client/index" />
        </>
      </Switch>
    );
  } else {
    return (
      <Switch>
        <>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/auth/login" />
        </>
      </Switch>
    );
  }
}

export default App;
