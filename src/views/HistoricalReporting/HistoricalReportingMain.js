import React, { Component, lazy, Suspense } from 'react';

class HistoricalReportingMain extends Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }
  render() {
    return (
      <div className="animated fadeIn">
        
      </div>
    );
  }
}

export default HistoricalReportingMain;
