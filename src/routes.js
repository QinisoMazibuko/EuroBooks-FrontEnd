import Register from "./pages/Register";
import Login from "./pages/login";
import Index from "./pages/Admin/index";
import clientIndex from "./pages/Client/index";
import Users from "./pages/Admin/Users";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },

  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: clientIndex,
    layout: "/client",
  },
  {
    path: "/users",
    name: "Manage Users",
    icon: "ni ni-single-02 text-primary",
    component: Users,
    layout: "/admin",
  }
  
];
export default routes;
