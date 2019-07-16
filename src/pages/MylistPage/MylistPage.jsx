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
                <div key={idx} className={`d-flex flex-column row-lg ${idx%2 ? 'bckg-color1' : 'bckg-color2'}`}>
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
                <div key={idx} className={`d-flex flex-column row-lg ${idx%2 ? 'bckg-color1' : 'bckg-color2'}`}>
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
                <div key={idx} className={`d-flex row-lg align-items-center justify-content-center ${idx%2 ? 'bckg-color1' : 'bckg-color2'}`}>
                    <a className='btn-success btn-sm pl-min center-txt' href="#" onClick={() => this.handleAddOne(f._id)}>+</a>
                    <div className='p-3 bd-highlight main-color center-txt'>{f.inListQty}</div>
                    <a className='btn-success btn-sm pl-min center-txt' href="#" onClick={() => this.handleSubOne(f._id)}>-</a>
                  <Link className='f-item main-color center-txt' to={{pathname: `/item/${f._id}`, state:{page: 'mylist'}}}>{f.name}</Link>
                  <div className='p-3'><input type='checkbox' onChange={() => this.handleSelectItem(f._id)}/></div>
                </div>
                : 
                <div></div>
              )
        return (
          <div className='container-fluid'>
            <div className='row-md d-flex bd-highlight align-items-center header'>
              <span className='p-2 flex-grow-1 bd-highlight txt-lg light-txt'>My List Page</span>
              <Link className='p-2 bd-highlight btn btn-success margin-sides' to={{ pathname: '/create', state:{inFood: false, inList: true, page: 'mylist'}}}>Add Item</Link>
              <Link className='p-2 bd-highlight btn btn-success margin-sides' to='/myfood'>My Food</Link>
              <Link className='p-2 bd-highlight btn btn-success margin-sides' to="/" onClick={this.props.handleLogOut}>Logout</Link>
            </div>

            {this.state.food.length > 0 ? 
            <div className="p-2 d-flex bd-highlight">
              <div className="col-4"><div className='intro margin-bottom center-txt txt-lg main-color'>Freezer</div>{foodInFreezer}</div>
              <div className="col-4"><div className='intro margin-bottom center-txt txt-lg main-color'>Fridge</div>{foodInFridge}</div>
              <div className="col-4"><div className='intro margin-bottom center-txt txt-lg main-color'>Pantry</div>{foodInPantry}</div>
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