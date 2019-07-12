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
import NewItemPage from './pages/NewItemPage/NewItemPage';
import EditItemPage from './pages/EditItemPage/EditItemPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser()
    };
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
    console.log(this.state.user)
  };

  handleLogOut = () => {
    console.log("handlelogout called");
    userService.logout();
    this.setState({ user: null });
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
              handleLogOut={this.handleLogOut}
              />
            } />
  
            <Route exact path = '/mylist' render={() =>
              <MylistPage /> 
            } />
  
          <Route exact path = '/item/create' render={() =>
            <NewItemPage />
          } />
  
          <Route exact path = '/item/:itemId' render={() =>
            <EditItemPage />
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
