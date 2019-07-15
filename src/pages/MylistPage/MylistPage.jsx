import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { getMyListItems } from '../../services/api'


class MyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          food: []
        };
      }

      componentDidMount() {
        var self = this;
        getMyListItems().then(user => {
          self.setState({
            name: user.name,
            food: user.food.filter(f => f.inList === true)
          })
        // console.log(this.state)
        }

        )}
      render() {
        let foodInFreezer = 
            this.state.food.map((f, idx) => 
                f.storage === 'Freezer' ? 
                <div key={idx}>
                  <div>{f.inListQty}</div>
                  <Link to={{pathname: `/item/${f._id}`, state:{page: 'mylist'}}}>{f.name}</Link>
                </div>
                : 
                <div></div>
              )

        let foodInFridge = 
            this.state.food.map((f, idx) => 
                f.storage === 'Fridge' ? 
                <div key={idx}>
                  <div>{f.inListQty}</div>
                  <Link to={{pathname: `/item/${f._id}`, state:{page: 'mylist'}}}>{f.name}</Link>
                </div>
                : 
                <div></div>
              )

        let foodInPantry = 
            this.state.food.map((f, idx) => 
                f.storage === 'Pantry' ? 
                <div key={idx}>
                  <div>{f.inListQty}</div>
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
          </div>
        );
      }
    }



export default MyList;