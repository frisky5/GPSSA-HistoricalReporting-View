import React from "react";

const CallsSummary = React.lazy(() =>
  import("./views/HistoricalReporting/CallsSummaryReport/CallsSummary")
);
const CallsDetailReport = React.lazy(() =>
  import("./views/HistoricalReporting/CallsDetailReport/CallsDetailsReportMain")
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
  },
  {
    path: "/historicalReporting/CallsDetailsReport",
    exact: true,
    name: "Calls Details Report",
    component: CallsDetailReport
  }
];

export default routes;
