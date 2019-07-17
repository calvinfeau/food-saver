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
                <div key={idx} className={`d-flex flex-column row-lg ${idx%2 ? 'bckg-color1' : 'bckg-color2'}`}>
                  <div className='d-flex main-color txt-md' > 
                    <div className='p-1 flex-grow-1 bd-highlight right-txt'>{f.inFoodQty}</div>
                    <Link className='f-item p-1 flex-grow-1 main-color' to={{pathname: `/item/${f._id}`, state:{page: 'myfood'}}}>{f.name}</Link>
                  </div>
                    {!f.inList ? <a className='add-to-list d-flex justify-content-center p-1 d-flex second-color txt-sm' href="#" style={{'textDecoration':'underline', 'fontStyle':'italic', 'fontWeight':'bold'}} onClick={() => this.handleAddToList(f._id)}>Add to list</a> : <div></div>}
                </div>
                : 
                <div></div>
              )

        let foodInFridge = 
            this.state.food.map((f, idx) => 
                f.storage === 'Fridge' ? 
                <div key={idx} className={`d-flex flex-column row-lg ${idx%2 ? 'bckg-color1' : 'bckg-color2'}`}>
                  <div className='d-flex main-color txt-md' > 
                    <div className='p-1 flex-grow-1 bd-highlight right-txt'>{f.inFoodQty}</div>
                    <Link className='f-item p-1 flex-grow-1 main-color' to={{pathname: `/item/${f._id}`, state:{page: 'myfood'}}}>{f.name}</Link>
                  </div>
                    {!f.inList ? <a className='add-to-list d-flex justify-content-center p-1 d-flex second-color txt-sm' href="#" style={{'textDecoration':'underline', 'fontStyle':'italic', 'fontWeight':'bold'}} onClick={() => this.handleAddToList(f._id)}>Add to list</a> : <div></div>}
                </div>
                : 
                <div></div>
              )

        let foodInPantry = 
            this.state.food.map((f, idx) => 
                f.storage === 'Pantry' ? 
                <div key={idx} className={`d-flex row-lg align-items-center justify-content-around ${idx%2 ? 'bckg-color1' : 'bckg-color2'}`}>
                  <div className='d-flex main-color col-8' > 
                    <div className='p-1 flex-grow-1 bd-highlight right-txt'>{f.inFoodQty}</div>
                    <Link className='f-item p-1 flex-grow-1 main-color' to={{pathname: `/item/${f._id}`, state:{page: 'myfood'}}}>{f.name}</Link>
                  </div>
                    {!f.inList ? <a className='add-to-list d-flex justify-content-center p-1 d-flex second-color' href="#" style={{'textDecoration':'underline', 'fontStyle':'italic', 'fontWeight':'bold'}} onClick={() => this.handleAddToList(f._id)}>Add to list</a> : <div></div>}
                </div>
                : 
                <div></div>
              )

        return (
          <div className='container-fluid'>
            <div className='row-md d-flex bd-highlight align-items-center header'>
              <span className='p-2 flex-grow-1 bd-highlight txt-lg light-txt'>My Food Page</span>
              <Link className='p-2 bd-highlight btn btn-success btn-lg margin-sides' to={{ pathname: '/create', state:{inFood: true, inList: false, page: 'myfood'}}}>Add Item</Link>
              <Link className='p-2 bd-highlight btn btn-success btn-lg margin-sides' to='/mylist'>My List</Link>
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
              <Link to={{ pathname: '/create', state:{inFood: true, inList: false, page: 'myfood'}}}>Add Item</Link>
            </div>
            }
        </div>
      )
    }
  }

export default MyFood;