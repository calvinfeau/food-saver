import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class MyFood extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: props.user
        };
      }
      render() {
        return (
          <div>
            <Link className="navLink" to="/" onClick={this.props.handleLogOut}>
              logout
            </Link>
            <h1>My Food Page</h1>
            <Link>
            Add Item
            </Link>
            <h3>Hi {this.state.user.name}</h3>
          </div>
        );
      }
    }

export default MyFood;