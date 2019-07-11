import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SignUp from './pages/SignupPage/SignupPage';
import Login from './pages/LoginPage/LoginPage';
import MyFood from './pages/MyfoodPage/MyfoodPage';
import MyList from './pages/MylistPage/MylistPage';
import NewItem from './pages/CreateItemPage/CreateItemPage';
import EditItem from './pages/EditItemPage/EditItemPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path = '/' render={() => 
            <div>
              <Link to='/signup'>Sign Up</Link>
              <Link to='/login'>Log In</Link>
            </div>
          }/> 

          <Route exact path = '/login' render={() =>
            <Login />
          }/>

          <Route exact path = '/signup' render={() =>
            <SignUp />
          }/>

          <Route exact path = '/myfood' render={() =>
            <MyFood />
          } />

          <Route exact path = '/mylist' render={() =>
            <MyList /> 
          } />

        <Route exact path = '/create' render={() =>
          <NewItem />
        } />

        <Route exact path = '/create' render={() =>
          <EditItem />
        } />
        </Switch>
      </div>
    );
  }
}



export default App;
