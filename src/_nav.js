export default {
  items: [
    {
      name: "Dashboard",
      url: "/home",
      icon: "icon-speedometer"
    },
    {
      title: true,
      name: "Historical Reporting",
      wrapper: {
        element: "",
        attributes: {}
      },
      class: ""
    },

    {
      name: "Calls Summary",
      url: "/historicalReporting/callsSummary",
      icon: "icon-book-open"
    },
    {
      name: "Calls Detail",
      url: "/historicalReporting/CallsDetailsReport",
      icon: "icon-book-open"
    },
    {
      name: "Agents Performance",
      url: "/historicalReporting/AgentsPerformanceReport",
      icon: "icon-book-open"
    },
    {
      name: "Survey Report",
      url: "/historicalReporting/SurveyReport",
      icon: "icon-book-open"
    }
  ]
};
