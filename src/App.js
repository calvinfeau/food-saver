import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from "react-router-dom";
import userService from "../src/utils/userService";
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SignUpPage from '../src/pages/SignUpPage/SignUpPage';
import LogInPage from '../src/pages/LogInPage/LogInPage';
import MyFoodPage from './pages/MyFoodPage/MyFoodPage';
import MyListPage from './pages/MyListPage/MyListPage';
import NewItemPage from './pages/NewItemPage/NewItemPage';
import EditItemPage from './pages/EditItemPage/EditItemPage';
import ItemsAddedPage from './pages/ItemsAddedPage/ItemsAddedPage'
import RemainingItemsPage from './pages/RemainingItemsPage/RemainingItemsPage'

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
    userService.logout();
    this.setState({ user: null });
  };

  render() {
    return (
      <div className="App container-fluid">

        <div className='row align-items-end'>
          <div className='col-12 title'>FOOD SAVER</div>
        </div>
        <Route exact path="/"
        render={() => (
          <div className='row align-items-center'>
            <div className='col-6 login'><Link className="btn btn-success btn-lg" to='/login'>Log In</Link></div>
            <div className='col-6'><Link className='btn btn-outline-success btn-lg' to='/signup'>Sign Up</Link></div>
            
            
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
  
            <Route exact path = '/mylist' render={props =>
              <MyListPage
              {...props}
              handleLogOut={this.handleLogOut} 
              /> 
            } />
  
            <Route exact path = '/create' render={(props) =>
              <NewItemPage {...props}/>
            } />
    
            <Route exact path = '/item/:itemId' render={(props) =>
              <EditItemPage {...props}/>
            } />

            <Route exact path = '/mylist/added' render={() => 
              <ItemsAddedPage />
            } />

            <Route exact path = '/mylist/remaining' render={() => 
              <RemainingItemsPage />
            } />
          </div>
           :
          <div className='col-12 intro'>
             Welcome to the Food Saver App! <br/> To continue please login.
           </div>}

        </Switch>
      </div>
    );
  }
}



export default App;
