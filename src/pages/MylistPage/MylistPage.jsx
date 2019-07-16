import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { getMyListItems, addOne, subOne, addAllItems, editSelectedItem, addSelectedItems} from '../../services/api'


class MyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          food: [],
          selected: []
        };
      }

      componentDidMount() {
        var self = this;
        getMyListItems().then(user => {
          self.setState({
            name: user.name,
            food: user.food.filter(f => f.inList === true),
            selected: user.food.filter(f => f.selected === true)
          })
        // console.log(this.state)
        }
      )}

      handleAddOne = (itemId) => {
        var self=this;
        addOne(itemId)
        .then(() => getMyListItems())
        .then(user => self.setState({
          name: user.name,
          food: user.food.filter(f => f.inList === true),
          selected: user.food.filter(f => f.selected === true)
        }))
      }

      handleSubOne = (itemId) => {
        var self=this;
        subOne(itemId)
        .then(() => getMyListItems())
        .then(user => self.setState({
          name: user.name,
          food: user.food.filter(f => f.inList === true),
          selected: user.food.filter(f => f.selected === true)
        }))
      }

      handleAddAll = () => {
        addAllItems();
      }
      
      handleSelectItem = (itemId) => {
        var self=this;
        editSelectedItem(itemId)
        .then(() => getMyListItems())
        .then(user => self.setState({
          name: user.name,
          food: user.food.filter(f => f.inList === true),
          selected: user.food.filter(f => f.selected === true)
        }))
      }

      handleAddSelected = () => {
        addSelectedItems();
      }

      render() {
        let foodInFreezer = 
            this.state.food.map((f, idx) => 
                f.storage === 'Freezer' ? 
                <div key={idx}>
                  <a href="#" onClick={() => this.handleAddOne(f._id)}>+</a>
                  <a href="#" onClick={() => this.handleSubOne(f._id)}>-</a>
                  <div>{f.inListQty}</div>
                  <input type='checkbox' onChange={() => this.handleSelectItem(f._id)}/>
                  <Link to={{pathname: `/item/${f._id}`, state:{page: 'mylist'}}}>{f.name}</Link>
                </div>
                : 
                <div></div>
              )

        let foodInFridge = 
            this.state.food.map((f, idx) => 
                f.storage === 'Fridge' ? 
                <div key={idx}>
                  <a href="#" onClick={() => this.handleAddOne(f._id)}>+</a>
                  <a href="#" onClick={() => this.handleSubOne(f._id)}>-</a>
                  <div>{f.inListQty}</div>
                  <input type='checkbox' onChange={() => this.handleSelectItem(f._id)}/>
                  <Link to={{pathname: `/item/${f._id}`, state:{page: 'mylist'}}}>{f.name}</Link>
                </div>
                : 
                <div></div>
              )

        let foodInPantry = 
            this.state.food.map((f, idx) => 
                f.storage === 'Pantry' ? 
                <div key={idx}>
                  <a href="#" onClick={() => this.handleAddOne(f._id)}>+</a>
                  <a href="#" onClick={() => this.handleSubOne(f._id)}>-</a>
                  <div>{f.inListQty}</div>
                  <input type='checkbox' onChange={() => this.handleSelectItem(f._id)}/>
                  <Link to={{pathname: `/item/${f._id}`, state:{page: 'mylist'}}}>{f.name}</Link>
                </div>
                : 
                <div></div>
              )
        return (
          <div>
            <h1>My List Page</h1>
            <Link to={{ pathname: '/create', state:{inList: true, inFood: false, page: 'mylist'}}}>Add Item</Link>
            <br/>
            <Link to="/" onClick={this.props.handleLogOut}>Logout</Link>
            <br/>
            <Link to='/myfood'>My Food</Link>
            <h3>Hi {this.state.name}</h3>
              {this.state.food.length > 0 ? 
              <div>
                <div><h3>Freezer</h3>{foodInFreezer}</div>
                <div><h3>Fridge</h3>{foodInFridge}</div>
                <div><h3>Pantry</h3>{foodInPantry}</div>
              </div>
              :
              <div>
                <Link to={{ pathname: '/create', state:{inList: true, inFood: false, page: 'mylist'}}}>Add Item</Link>
              </div>
              }
              <br/><br/><br/>
              <Link to='/mylist/added' onClick={this.handleAddAll}>Add All</Link>
              <Link to='/mylist/remaining' onClick={this.handleAddSelected}>Add Selected Items</Link>
          </div>
        );
      }
    }



export default MyList;