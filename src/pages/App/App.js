import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import userService from "../../utils/userService";
// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RemainingItemsPage from '../RemainingItemsPage/RemainingItemsPage'
import LogInPage from '../LogInPage/LogInPage';
import MyFoodPage from '../MyFoodPage/MyFoodPage';
import MyListPage from '../MyListPage/MyListPage';
import NewItemPage from '../NewItemPage/NewItemPage';
import EditItemPage from '../EditItemPage/EditItemPage';
import ItemsAddedPage from '../ItemsAddedPage/ItemsAddedPage'
import SignUpPage from '../SignUpPage/SignUpPage';

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
      <div className="container-fluid">
        <Route 
          exact path="/"
          render={() => (
            <div className='container-fluid'>
              <div className='row row-md align-items-end'>
                <div className='col-12 txt-lg main-color'>FOOD SAVER</div>
              </div>
              <div className='row row-lg align-items-center'>
                <div className='col right-txt'><Link className="btn btn-success btn-lg" to='/login'>Log In</Link></div>
                <div className='col-1' />
                <div className='col'><Link className='btn btn-success btn-lg' to='/signup'>Sign Up</Link></div>
              </div>
              <div className='row row-md align-items-start'>
                <div className='col-12 text-md main-color'>
                  Welcome to the Food Saver App! <br/><span className='txt-sm second-color'>To continue please login.</span> 
                </div>
              </div>
            </div>
          )}
        />
        <Switch>
        <Route
          exact path="/signup"
          render={props => (
              <SignUpPage
                {...props}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
          )}
          />
          <Route
            exact path="/login"
            render={props => (
                <LogInPage
                  {...props}
                  handleSignupOrLogin={this.handleSignupOrLogin}
                />
            )}
          />
          {this.state.user ?
          <div>
            <Route 
              exact path='/myfood'
              render={props => (
                <MyFoodPage             
                {...props}
                handleLogOut={this.handleLogOut}
                />
              )}
            />
  
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
           : <div></div>
}

        </Switch>
      </div>
    );
  }
}



export default App;
