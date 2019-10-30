import React from "react";

const CallsSummary = React.lazy(() =>
  import("./views/HistoricalReporting/CallsSummary")
);
const LoginPage = React.lazy(() => import("./views/Pages/Login/Login"));
const HomePage = React.lazy(() => import("./views/Dashboard/Dashboard"));

const routes = [
  {
    path: "/login",
    exact: true,
    name: "Login Page",
    component: LoginPage
  },
  { path: "/home", exact: true, name: "Home",component: HomePage },
  {
    path: "/historicalReporting/callsSummary",
    exact: true,
    name: "Calls Summary Report",
    component: CallsSummary
  }
];

export default routes;
