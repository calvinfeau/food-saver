import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { getMyFoodItems } from '../../services/api'


class MyFood extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          list: [],
          food: []
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
            <Link className="navLink" to="/" onClick={this.props.handleLogOut}>
              logout
            </Link>
            <h1>My Food Page</h1>
            <Link to='/item/create'>
            Add Item
            </Link>
            <h3>Hi {this.state.name}</h3>
              <table>
                <thead>
                  <tr>
                    <td>Freezer</td>
                    <td>Fridge</td>
                    <td>Pantry</td>
                  </tr>
                </thead>
            {this.food ? this.food.map((f, idx) => 
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )
              :
              <tr>You don't have food items yet.</tr>
            }
            </table>
          </div>
        );
      }
    }

export default MyFood;