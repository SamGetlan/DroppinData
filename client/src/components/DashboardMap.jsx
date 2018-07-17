import React from 'react';


class DashboardMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasSize: null,
    };
    this.updateCanvasSize = this.updateCanvasSize.bind(this);
  }

  updateCanvas() {
    const games = this.props.filteredUserGames;
    const ctx = document.getElementById('dashboardMapCanvas').getContext('2d');
    // if (ctx.test !== 'inside DashboardMap-test.js') {
      ctx.clearRect(0, 0, this.state.canvasSize, this.state.canvasSize);
      // draw lines for each game
      function canvasArrow(context, fromx, fromy, tox, toy){
        var headlen = 10;   // length of head in pixels
        var angle = Math.atan2(toy-fromy,tox-fromx);
        context.moveTo(fromx, fromy);
        context.lineTo(tox, toy);
        context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
        context.moveTo(tox, toy);
        context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
    // } // figure out how to test without this breaking
  }
    if (games) {
      for (var i = 0; i < games.length; i++) {
        if (games[i].deathCoordinates.length > 0 && games[i].deathCoordinates[0] !== 0) {
          const fromX = (Math.floor(games[i].startCoordinates[1] / 3) * (this.state.canvasSize/82));
          const fromY = (Math.floor(games[i].startCoordinates[0] / 3) * (this.state.canvasSize/82));
          const toX = (games[i].deathCoordinates[1] * (this.state.canvasSize/82));
          const toY = (games[i].deathCoordinates[0] * (this.state.canvasSize/82));
          ctx.beginPath();
          canvasArrow(ctx, fromX, fromY, toX, toY);
          ctx.strokeStyle = '#ff0000';
          ctx.stroke();
        }
      }
    }
    
  }

  updateCanvasSize(screenWidth) {
    console.log('screenWidth:', screenWidth);
    if (screenWidth > 700) {
      this.setState({
        canvasSize: (screenWidth * 0.45),
      })
    } else {
      this.setState({
        canvasSize: screenWidth,
      })
    }
  }

  componentDidUpdate() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!(this.state.canvasSize === width * 0.45 || this.state.canvasSize === width)) {
      this.updateCanvasSize(width);
    }
    this.updateCanvas();
  }

  componentDidMount() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!(this.state.canvasSize === width * 0.45 || this.state.canvasSize === width)) {
      this.updateCanvasSize(width);  
    }
    this.updateCanvas();
  }

  render() {
    return (
      <div id="dashboardMapContainer">
        <img id="dashboardMapImage" src="/locationPics/season5/season5fullMap.jpg" alt-src="Full Map" height="95.4551%" width="100%" />
        <canvas id="dashboardMapCanvas" width={this.state.canvasSize} height={this.state.canvasSize} />
      </div>
    );
  }
}

export default DashboardMap;