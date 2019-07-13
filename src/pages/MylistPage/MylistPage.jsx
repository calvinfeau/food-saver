import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { getMyListItems } from '../../services/api'


class MyList extends Component {
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
        getMyListItems().then(user => self.setState({
          name: user.name,
          list: user.list,
          food: user.food
        })

        )}
      render() {
        return (
          <div>
            <h1>My List Page</h1>
            <Link to='/item/create'>
            Add Item
            </Link>
            <br/>
            <Link className="navLink" to="/" onClick={this.props.handleLogOut}>
              Logout
            </Link>
            <br/>
            <Link to='/myfood'>
            My Food
            </Link>
            <h3>Hi {this.state.name}</h3>
            <div>
              <div>
                <h3>Freezer</h3>
                {this.state.list ?
                 this.state.list.map((f, idx) => 
                    f.storage === 'Freezer' ? 
                    <div key={idx}>
                      <div>{f.quantity}</div>
                      <div>{f.name}</div>
                    </div>
                    : 
                    <div></div>)
                  :
                  <div></div>
                }
              </div>
              <div>
                <h3>Fridge</h3>
                {this.state.list ? this.state.list.map((f, idx) => 
                    f.storage === 'Fridge' ? 
                    <div key={idx}>
                      <div>{f.quantity}</div>
                      <div>{f.name}</div>
                    </div>
                    : 
                    <div></div>)
                  :
                  <div></div>
                }
              </div>
              <div>
                <h3>Pantry</h3>
                {this.state.list ? this.state.list.map((f, idx) => 
                    f.storage === 'Pantry' ? 
                    <div key={idx}>
                      <div>{f.quantity}</div>
                      <div>{f.name}</div>
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



export default MyList;