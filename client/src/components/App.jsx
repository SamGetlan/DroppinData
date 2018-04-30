import React from 'react';
import axios from 'axios';
import Navbar from './Navbar.jsx';
import Body from './Body.jsx';
import UserForm from './UserForm.jsx';
import FilterLocations from './FilterLocations.jsx';
import locations from '../data.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: '',
      locations,
      filteredLocations: locations.slice(),
      userFormActive: true,
      filterLocationsActive: false,
      signUpForm: false,
      loggedIn: false,
      active: false,
      activeIndex: false,
      userGames: null,
      submitButtonState: true,
    };
    this.handleUserFormClick = this.handleUserFormClick.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.loginUserFormOption = this.loginUserFormOption.bind(this);
    this.signUpUserFormOption = this.signUpUserFormOption.bind(this);
    this.handleAccountSignUp = this.handleAccountSignUp.bind(this);
    this.handleAccountSignIn = this.handleAccountSignIn.bind(this);
    this.filterOut = this.filterOut.bind(this);
    this.filterIn = this.filterIn.bind(this);
    this.handleGameSubmit = this.handleGameSubmit.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
  }

  handleUserFormClick() {
    this.setState({
      userFormActive: !this.state.userFormActive,
    });
  }

  handleFilterClick() {
    this.setState({
      filterLocationsActive: !this.state.filterLocationsActive,
    });
  }

  handleActionClick() {
    const { filteredLocations } = this.state;
    const index = Math.floor(Math.random() * filteredLocations.length);
    console.log(filteredLocations[index].camelCase);
    this.setState({
      active: filteredLocations[index].camelCase,
      activeIndex: index,
    });
  }

  loginUserFormOption() {
    this.setState({
      signUpForm: false,
    });
  }

  signUpUserFormOption() {
    this.setState({
      signUpForm: true,
    });
  }

  handleAccountSignUp(username, password) {
    const context = this;
    axios.post('/api/signup', {
      username,
      password,
      createdAt: new Date(),
    })
      .then((data) => {
        console.log('signUp successful:', data.config.data);
        const user = JSON.parse(data.config.data).username;
        context.setState({
          loggedIn: user,
          userFormActive: false,
        });
        axios.get('/api/games')
          .then((data) => {
            console.log('data received -->', data);
            context.setState({
              userGames: data.data,
            });
          });
      })
      .catch((err) => {
        console.log('There was an error:', err);
      });
  }

  handleAccountSignIn(username, password) {
    const context = this;
    axios.post('/api/login', {
      username,
      password,
    })
      .then((data) => {
        if (data.data.username) {
          console.log('Login successful:', data);
          const user = (data.data.username);
          context.setState({
            loggedIn: user,
            userFormActive: false,
          });
          axios.get('/api/games')
            .then((data) => {
              console.log('data received -->', data);
              context.setState({
                userGames: data.data,
              });
            });
        } else {
          console.log('Login failed:', data.data);
        }
      })
      .catch((err) => {
        console.log('There was an error:', err);
      });
  }


  filterIn(location) {
    console.log(this.state.filteredLocations);
    this.state.filteredLocations.push(location);
    const filteredLocations = this.state.filteredLocations;
    this.setState({ filteredLocations });
  }

  filterOut(location) {
    console.log(this.state.filteredLocations);
    const index = this.state.filteredLocations.indexOf(location);
    this.state.filteredLocations.splice(index, 1);
    const filteredLocations = this.state.filteredLocations;
    this.setState({ filteredLocations });
  }

  handleGameSubmit(place, kills, loot, gameType) {
    const context = this;
    this.setState({
      submitButtonState: false,
    })
    console.log('Inside the handleSubmit function');
    console.log(`place --> ${place}`);
    console.log(`kills --> ${kills}`);
    console.log('loot -->', loot);
    console.log(`Game Type --> ${gameType}`);
    if (place >= 1 && place <= 100 && kills <= 100 && kills >= 0 && gameType && this.state.loggedIn) {
      axios.post('/api/games', {
        user: this.state.loggedIn,
        date: new Date(),
        location: this.state.filteredLocations[this.state.activeIndex].name,
        place,
        kills,
        loot,
        gameType,
      })
        .then((data) => {
          console.log('We have received Data -->', data);
          context.setState({
            userGames: data.data,
          });
          const $confirm = document.createElement('p');
          $confirm.innerHTML = 'Game was successfully submitted';
          document.getElementsByClassName('statBox')[0].appendChild($confirm);
          setTimeout(() => {
            $confirm.remove();
          }, 4000);
        })
        .catch((err) => {
          console.log('There was an Error -->', err);
        });
    } else {
      let suggestion;
      if (place < 1 || place > 100 || place === undefined) {
        suggestion = 'Your place needs to be between 1 and 100.';
      } else if (kills < 0 || kills > 100 || kills === undefined) {
        suggestion = 'Your kills need to be between 0 and 100.';
      } else if (loot < 1 || loot > 10) {
        suggestion = 'Loot rating must be between 1 and 10.';
      } else if (!gameType) {
        suggestion = 'A game type must be selected.';
      } else if (!this.state.loggedIn) {
        suggestion = 'You must log in to submit a game.';
      }
      const $denied = document.createElement('p');
      $denied.innerHTML = `There was an error submitting your game. ${suggestion}`;
      document.getElementsByClassName('statBox')[0].appendChild($denied);
      setTimeout(() => {
        context.setState({
          submitButtonState: true,
        })
      }, 1000);
      setTimeout(() => {
        $denied.remove();
      }, 4000);
    }
  }

  handleTileClick(location) {
    console.log('inside handleTileClick:', location);
    const index = this.state.filteredLocations.findIndex(element => (element.camelCase === location.camelCase));
    console.log('active Location -->', location);
    console.log('active index -->', index);
    this.setState({
      active: location.camelCase,
      activeIndex: index,
    });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For everything else
  }

  render() {
    return (
      <div id="app">
        <Navbar
          navButtons={['Home', 'Games', 'Filter Locations', 'Sign Up or Login']}
          classes={['home', 'games', 'filter', 'login']}
          handleUserFormClick={this.handleUserFormClick}
          handleFilterClick={this.handleFilterClick}
          loggedIn={this.state.loggedIn}
        />
        <Body
          filteredLocations={this.state.filteredLocations}
          activeIndex={this.state.activeIndex}
          handleSubmit={this.handleGameSubmit}
          active={this.state.active}
          handleActionClick={this.handleActionClick}
          userGames={this.state.userGames}
          handleTileClick={this.handleTileClick}
          submitButtonState={this.state.submitButtonState}
        />
        {this.state.userFormActive &&
        <UserForm
          handleUserFormClick={this.handleUserFormClick}
          signUpForm={this.state.signUpForm}
          loginUserFormOption={this.loginUserFormOption}
          signUpUserFormOption={this.signUpUserFormOption}
          handleAccountSignIn={this.handleAccountSignIn}
          handleAccountSignUp={this.handleAccountSignUp}
        />}
        {this.state.filterLocationsActive &&
        <FilterLocations
          locations={this.state.locations}
          filteredLocations={this.state.filteredLocations}
          filterOut={this.filterOut}
          filterIn={this.filterIn}
          handleFilterClick={this.handleFilterClick}
        />}
      </div>
    );
  }
}

export default App;
