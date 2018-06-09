import React from 'react';

class DashboardMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div id="dashboardMapContainer">
        <img src="/locationPics/fortNite-s4map.jpg" alt-src="Full Map" height="100%" width="100%" />
      </div>
    );
  }
}

export default DashboardMap;