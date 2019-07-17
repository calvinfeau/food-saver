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
        let foodInDairy = 
            this.state.food.map((f, idx) => 
                f.category === 'Dairy' ? 
                <div key={idx} className={`d-flex row-lg align-items-center justify-content-around ${idx%2 ? 'bckg-color1' : 'bckg-color2'}`}>
                    <div className='d-flex align-items-center'>
                      <a className='up-down-btn main-color d-flex pl-min center-txt align-items-center' href="#" onClick={() => this.handleAddOne(f._id)}>
                        <i className="material-icons">keyboard_arrow_up</i>
                      </a>
                      <div className='p-2 bd-highlight main-color center-txt'>{f.inListQty}</div>
                      <a className='up-down-btn main-color d-flex pl-min center-txt align-items-center' style = {{}}href="#" onClick={() => this.handleSubOne(f._id)}>
                        <i className="material-icons">keyboard_arrow_down</i>
                      </a>
                    </div>
                  <Link className='f-item main-color center-txt txt-sm' to={{pathname: `/item/${f._id}`, state:{page: 'mylist'}}}>{f.name}</Link>
                  <div className='p-2'><input type='checkbox' onChange={() => this.handleSelectItem(f._id)}/></div>
                </div>
                : 
                <div></div>
              )

        let foodInSpices = 
            this.state.food.map((f, idx) => 
                f.category === 'Spices & Condiments' ? 
                <div key={idx} className={`d-flex row-lg align-items-center justify-content-around ${idx%2 ? 'bckg-color1' : 'bckg-color2'}`}>
                    <div className='d-flex align-items-center'>
                      <a className='up-down-btn main-color d-flex pl-min center-txt align-items-center' href="#" onClick={() => this.handleAddOne(f._id)}>
                        <i className="material-icons">keyboard_arrow_up</i>
                      </a>
                      <div className='p-2 bd-highlight main-color center-txt'>{f.inListQty}</div>
                      <a className='up-down-btn main-color d-flex pl-min center-txt align-items-center' style = {{}}href="#" onClick={() => this.handleSubOne(f._id)}>
                        <i className="material-icons">keyboard_arrow_down</i>
                      </a>
                    </div>
                  <Link className='f-item main-color center-txt txt-sm' to={{pathname: `/item/${f._id}`, state:{page: 'mylist'}}}>{f.name}</Link>
                  <div className='p-2'><input type='checkbox' onChange={() => this.handleSelectItem(f._id)}/></div>
                </div>
                : 
                <div></div>
              )

        let foodInFruits = 
            this.state.food.map((f, idx) => 
                f.category === 'Fruits & Vegetables' ? 
                <div key={idx} className={`d-flex row-lg align-items-center justify-content-around ${idx%2 ? 'bckg-color1' : 'bckg-color2'}`}>
                    <div className='d-flex align-items-center'>
                      <a className='up-down-btn main-color d-flex pl-min center-txt align-items-center' href="#" onClick={() => this.handleAddOne(f._id)}>
                        <i className='material-icons'>keyboard_arrow_up</i>
                      </a>
                      <div className='p-2 bd-highlight main-color center-txt'>{f.inListQty}</div>
                      <a className='up-down-btn main-color d-flex pl-min center-txt align-items-center' style = {{}}href="#" onClick={() => this.handleSubOne(f._id)}>
                        <i className='material-icons'>keyboard_arrow_down</i>
                      </a>
                    </div>
                  <Link className='f-item main-color center-txt txt-sm' to={{pathname: `/item/${f._id}`, state:{page: 'mylist'}}}>{f.name}</Link>
                  <div className='p-2'><input type='checkbox' onChange={() => this.handleSelectItem(f._id)}/></div>
                </div>
                : 
                <div></div>
              )

        let foodInMeats = 
            this.state.food.map((f, idx) => 
                f.category === 'Meats & Seafood' ? 
                <div key={idx} className={`d-flex row-lg align-items-center justify-content-around ${idx%2 ? 'bckg-color1' : 'bckg-color2'}`}>
                    <div className='d-flex align-items-center'>
                      <a className='up-down-btn main-color d-flex pl-min center-txt align-items-center' href="#" onClick={() => this.handleAddOne(f._id)}>
                        <i className='material-icons'>keyboard_arrow_up</i>
                      </a>
                      <div className='p-2 bd-highlight main-color center-txt'>{f.inListQty}</div>
                      <a className='up-down-btn main-color d-flex pl-min center-txt align-items-center' style = {{}}href="#" onClick={() => this.handleSubOne(f._id)}>
                        <i className='material-icons'>keyboard_arrow_down</i>
                      </a>
                    </div>
                  <Link className='f-item main-color center-txt txt-sm' to={{pathname: `/item/${f._id}`, state:{page: 'mylist'}}}>{f.name}</Link>
                  <div className='p-2'><input type='checkbox' onChange={() => this.handleSelectItem(f._id)}/></div>
                </div>
                : 
                <div></div>
              )

        return (
          <div className='container-fluid'>
            <div className='row-md d-flex bd-highlight align-items-center header'>
              <span className='p-2 flex-grow-1 bd-highlight txt-lg light-txt'>My List</span>
              <Link className='p-2 bd-highlight btn btn-success btn-lg margin-sides' to='/mylist/added' onClick={this.handleAddAll}>Add All</Link>
              <Link className='p-2 bd-highlight btn btn-success btn-lg margin-sides' to='/mylist/remaining' onClick={this.handleAddSelected}>Add Selected Items</Link>
              <Link className='p-2 bd-highlight btn btn-success btn-lg margin-sides' to={{ pathname: '/create', state:{inFood: false, inList: true, page: 'mylist'}}}>Add Item</Link>
              <Link className='p-2 bd-highlight btn btn-success btn-lg margin-sides' to='/myfood'>My Food</Link>
              <Link className='p-2 bd-highlight btn btn-success margin-sides' to="/" onClick={this.props.handleLogOut}>Logout</Link>
            </div>

            {this.state.food.length > 0 ? 
            <div className="p-2 d-flex bd-highlight">
              <div className="col"><div className='intro margin-bottom center-txt up-down-btn main-color'>Meats & Seafood</div>{foodInMeats}</div>
              <div className="col"><div className='intro margin-bottom center-txt up-down-btn main-color'>Fruits & Vegetables</div>{foodInFruits}</div>
              <div className="col"><div className='intro margin-bottom center-txt up-down-btn main-color'>Spices & Condiments</div>{foodInSpices}</div>
              <div className="col"><div className='intro margin-bottom center-txt up-down-btn main-color'>Dairy</div>{foodInDairy}</div>
            </div>
            :
            <div className='center-txt'>
              <div className='main-color txt-md margin-bottom'>No Items yet !</div>
              <Link className='btn btn-success btn-lg' to={{ pathname: '/create', state:{inList: true, inFood: false, page: 'mylist'}}}>Add Item</Link>
            </div>
            }
          </div>
        );
      }
    }


export default MyList;