import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { getMyFoodItems, addToList } from '../../services/api'


class MyFood extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          food: []
        };
      }

      componentDidMount() {
        var self = this;
        getMyFoodItems().then(user => {
          self.setState({
            name: user.name,
            food: user.food.filter(f => f.inFood === true)
          })
        // console.log(this.state)
        }
      )}

      handleAddToList = (itemId) => {
        var self=this;
        console.log('itemId passed: ', itemId)
        addToList(itemId)
        .then(() => getMyFoodItems())
        .then(user => self.setState({
          name: user.name,
          food: user.food.filter(f => f.inFood === true)
        }))
      };
        
      
      render() {
        let foodInFreezer = 
            this.state.food.map((f, idx) => 
                f.storage === 'Freezer' ? 
                <div key={idx}>
                  <div>{f.inFoodQty}</div>
                  <Link to={{pathname: `/item/${f._id}`, state:{page: 'myfood'}}}>{f.name}</Link>
                  {!f.inList ? <a href="#" style={{'fontSize':8+'px'}} onClick={() => this.handleAddToList(f._id)}>Add to list</a> : <div></div>}
                </div>
                : 
                <div></div>
              )

        let foodInFridge = 
            this.state.food.map((f, idx) => 
                f.storage === 'Fridge' ? 
                <div key={idx}>
                  <div>{f.inFoodQty}</div>
                  <Link to={{pathname: `/item/${f._id}`, state:{page: 'myfood'}}}>{f.name}</Link>
                  {!f.inList ? <a href="#" style={{'fontSize':8+'px'}} onClick={() => this.handleAddToList(f._id)}>Add to list</a> : <div></div>}
                </div>
                : 
                <div></div>
              )

        let foodInPantry = 
            this.state.food.map((f, idx) => 
                f.storage === 'Pantry' ? 
                <div key={idx}>
                  <div>{f.inFoodQty}</div>
                  <Link to={{pathname: `/item/${f._id}`, state:{page: 'myfood'}}}>{f.name}</Link>
                  {!f.inList ? <a href="#" style={{'fontSize':8+'px'}} onClick={() => this.handleAddToList(f._id)}>Add to list</a> : <div></div>}
                </div>
                : 
                <div></div>
              )

        return (
          <div>
            <h1>My Food Page</h1>
            <Link to={{ pathname: '/create', state:{inFood: true, inList: false, page: 'myfood'}}}>Add Item</Link>
            <br/>
            <Link to="/" onClick={this.props.handleLogOut}>Logout</Link>
            <br/>
            <Link to='/mylist'>My List</Link>
            <h3>Hi {this.state.name}</h3>
              {this.state.food.length > 0 ? 
              <div>
                <div><h3>Freezer</h3>{foodInFreezer}</div>
                <div><h3>Fridge</h3>{foodInFridge}</div>
                <div><h3>Pantry</h3>{foodInPantry}</div>
              </div>
              :
              <div>
                <Link to={{ pathname: '/create', state:{inFood: true, inList: false, page: 'myfood'}}}>Add Item</Link>
              </div>
              }
        </div>
      )
    }
  }

export default MyFood;