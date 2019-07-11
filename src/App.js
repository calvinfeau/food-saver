import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from "react-router-dom";
import userService from "../src/utils/userService";
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SignUpPage from '../src/pages/SignUpPage/SignUpPage';
import LogInPage from '../src/pages/LogInPage/LogInPage';
import MyFoodPage from './pages/MyFoodPage/MyFoodPage';
import MylistPage from './pages/MyListPage/MyListPage';
import NewItem from './pages/NewItemPage/NewItemPage';
import EditItem from './pages/EditItemPage/EditItemPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser()
    };
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  handleLogOut = () => {
    console.log("handlelogout called");
    userService.logout();
    console.log("logged out");
    this.setState({ user: null });
    console.log(this.state.user);
  };

  render() {
    return (
      <div className="App">
        <Route exact path="/"
        render={() => (
          <div>
          <Link to='/login'>Log In</Link>
          <Link to='/signup'>Sign Up</Link>
          </div>
        )}
        
        />
        <Switch>
        <Route
            exact
            path="/signup"
            render={props => (
              <SignUpPage
                {...props}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <LogInPage
                {...props}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
          {this.state.user ?
          <div>
            <Route exact path = '/myfood' render={props =>
              <MyFoodPage             
              {...props}
              user={this.state.user}
              handleLogOut={this.handleLogOut}
              />
            } />
  
            <Route exact path = '/mylist' render={() =>
              <MylistPage /> 
            } />
  
          <Route exact path = '/create' render={() =>
            <NewItem />
          } />
  
          <Route exact path = '/create' render={() =>
            <EditItem />
          } />
          </div>
           :
          <div>
             To Continue, please Log In.
           </div>}

        </Switch>
      </div>
    );
  }
}



export default App;
