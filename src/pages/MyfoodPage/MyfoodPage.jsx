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
                <div key={idx} className={`d-flex flex-column row-lg ${idx%2 ? 'bckg-color' : ''}`}>
                  <div className='d-flex' > 
                    <div className='p-1 flex-grow-1 bd-highlight right-txt'>{f.inFoodQty}</div>
                    <Link className='p-1 flex-grow-1' to={{pathname: `/item/${f._id}`, state:{page: 'myfood'}}}>{f.name}</Link>
                  </div>
                    {!f.inList ? <a className='p-1 d-flex' href="#" style={{'fontSize':10+'px'}} onClick={() => this.handleAddToList(f._id)}>Add to list</a> : <div></div>}
                </div>
                : 
                <div></div>
              )

        return (
          <div className='container-fluid'>
            <div className='row-md d-flex bd-highlight align-items-center header'>
              <span className='p-2 flex-grow-1 bd-highlight txt-lg light-txt'>My Food Page</span>
              <Link className='p-2 bd-highlight btn btn-success margin-sides' to={{ pathname: '/create', state:{inFood: true, inList: false, page: 'myfood'}}}>Add Item</Link>
              <Link className='p-2 bd-highlight btn btn-success margin-sides' to='/mylist'>My List</Link>
              <Link className='p-2 bd-highlight btn btn-success margin-sides' to="/" onClick={this.props.handleLogOut}>Logout</Link>
            </div>

            {this.state.food.length > 0 ? 
            <div className="d-flex bd-highlight">
              <div className="p-2 flex-grow-1 bd-highlight"><div className='intro margin-bottom center-txt txt-md main-color'>Freezer</div>{foodInFreezer}</div>
              <div className="p-2 flex-grow-1 bd-highlight "><div className='intro margin-bottom center-txt txt-md main-color'>Fridge</div>{foodInFridge}</div>
              <div className=" flex-grow-1 bd-highlight"><div className='intro margin-bottom center-txt txt-md main-color'>Pantry</div>{foodInPantry}</div>
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