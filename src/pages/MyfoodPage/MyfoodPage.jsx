import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { getMyFoodItems } from '../../services/api'


class MyFood extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          food: [],
          list: []
        };
      }

      componentDidMount() {
        var self = this;
        getMyFoodItems().then(user => self.setState({
          name: user.name,
          list: user.list,
          food: user.food
        })

        )}
      render() {
        return (
          <div>
            <h1>My Food Page</h1>
            <Link to='/create'>
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
              <div>
                <h3>Freezer</h3>
                {this.state.food ?
                 this.state.food.map((f, idx) => 
                    f.storage === 'Freezer' ? 
                    <div key={idx}>
                      <div>{f.quantity}</div>
                      <Link to={`/item/${f._id}/edit`}>
                      {f.name}
                      </Link>
                    </div>
                    : 
                    <div></div>)
                  :
                  <div></div>
                }
              </div>
              <div>
                <h3>Fridge</h3>
                {this.state.food ? this.state.food.map((f, idx) => 
                    f.storage === 'Fridge' ? 
                    <div key={idx}>
                      <div>{f.quantity}</div>
                      <Link to={`/item/${f._id}/edit`}>
                      {f.name}
                      </Link>
                    </div>
                    : 
                    <div></div>)
                  :
                  <div></div>
                }
              </div>
              <div>
                <h3>Pantry</h3>
                {this.state.food ? this.state.food.map((f, idx) => 
                    f.storage === 'Pantry' ? 
                    <div key={idx}>
                      <div>{f.quantity}</div>
                      <Link to={`/item/${f._id}/edit`}>
                      {f.name}
                      </Link>
                    </div>
                    : 
                    <div></div>)
                  :
                  <div></div>
                }
              </div>
            </div>
          </div>
        );
      }
    }

export default MyFood;