import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { getMyFoodItems } from '../../services/api'


class MyFood extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          food: [],
          // list: []
        };
      }

      componentDidMount() {
        var self = this;
        getMyFoodItems().then(user => {
          self.setState({
            name: user.name,
            // list: user.list,
            food: user.food.filter(f => f.inFood === true)
          })
        }

        )}
      render() {
        let foodInFreezer = <div>
            <h3>Frezzer</h3>
            {this.state.food.map((f, idx) => 
                f.storage === 'Freezer' ? 
                <div key={idx}>
                  <div>{f.quantity}</div>
                  <Link to={{pathname: `/item/${f._id}`, state:{inFood: true, page: 'myfood'}}}>{f.name}</Link>
                </div>
                : 
                <div></div>
              )}
          </div>

        let foodInFridge = <div>
            <h3>Fridge</h3>
            {this.state.food.map((f, idx) => 
                f.storage === 'Fridge' ? 
                <div key={idx}>
                  <div>{f.quantity}</div>
                  <Link to={{pathname: `/item/${f._id}`, state:{inFood: true, page: 'myfood'}}}>{f.name}</Link>
                </div>
                : 
                <div></div>
              )}
          </div>

        let foodInPantry = <div>
            <h3>Pantry</h3>
            {this.state.food.map((f, idx) => 
                f.storage === 'Pantry' ? 
                <div key={idx}>
                  <div>{f.quantity}</div>
                  <Link to={{pathname: `/item/${f._id}`, state:{inFood: true, page: 'myfood'}}}>{f.name}</Link>
                </div>
                : 
                <div></div>
              )}
          </div>

        return (
          <div>
            <h1>My Food Page</h1>
            <Link to={{ pathname: '/create', state:{page: 'myfood'}}}>
            Add Item
            </Link>
            <br/>
            <Link to="/" onClick={this.props.handleLogOut}>
              logout
            </Link>
            <br/>
            <Link to='/mylist'>
            My List
            </Link>
            <h3>Hi {this.state.name}</h3>
            <div>
              {this.state.food.length > 0 ? (foodInPantry, foodInFreezer, foodInFridge)
              :
              <div>
                <Link to={{ pathname: '/create', state:{page: 'myfood'}}}>Add Item</Link>
              </div>
              }
            </div>
        </div>
      )
    }
  }

export default MyFood;