import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {createItem} from '../../services/api';

let isInFood;
let isInList;
let quantity;

class NewItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            category: 'Dry & Packaged Food',
            storage: 'Pantry',
            inFood: isInFood,
            inList: isInList
        }
    }

    componentDidMount() {
        isInFood = this.props.location.state.inFood;
        isInList = this.props.location.state.inList;
        // console.log('is In food:', isInFood)
        // console.log('is in list:', isInList)
        // console.log('state mounted: ', this.state)
        // console.log(fromPage)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        createItem(this.state).then(() => {
            window.location = `/${this.props.location.state.page}`;
        })
    }

    handleName = (e) => {
        this.setState({ name: e.target.value })
    }

    handleCategory = (e) => {
        this.setState({ category: e.target.value })
    }

    handleStorage = (e) => {
        this.setState({ storage: e.target.value })
    }

    handleQuantity = (e) => {
        quantity = e.target.value;
        this.state.inFood ? 
        this.setState((state) => {return{...state, inFoodQty: quantity}}) : this.setState((state) => {return{...state}});
        this.state.inList ? 
        this.setState((state) => {return{...state, inListQty: quantity}}) : this.setState((state) => {return{...state}});
    }
    
    handleInFood = (e) => {
        let checked = e.target.checked;
        this.setState((state) => {return{...state, inFood: checked, inFoodQty: quantity}})        
        // console.log('inFood: ', this.state.inFood)
    }
    
    handleInList = (e) => {
        let checked = e.target.checked;
        this.setState((state) => {return{...state, inList: checked, inListQty: quantity}})        
        // console.log('inList: ', this.state.inList)
    }

    render() {
        return(
            <div className='container-fluid'>
                <div className="row row-md align-items-center justify-content-center header light-txt txt-lg">New Item</div>
                <form className='pd-lg justify-content-center' onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input className="form-control" placeholder='Name' type='text' value={this.state.name} onChange={this.handleName}/>
                    </div>
                    <hr/>
                    <div className="form-group">
                        <select className="form-control" value={this.state.category} onChange={this.handleCategory}>
                            <option value='Meats & Seafood'>Meats & Seafood</option>
                            <option value='Fruits & Vegetables'>Fruits & Vegetables</option>
                            <option value='Spices & Condiments'>Spices & Condiments</option>
                            <option value='Dry & Packaged Food'>Dry & Packaged Food</option>
                            <option value='Beverages'>Beverages</option>
                            <option value='Dairy'>Dairy</option>
                        </select>   
                    </div>
                    <hr/>
                    <div className="form-group">
                        <select className="form-control" value={this.state.storage} onChange={this.handleStorage}>
                            <option value='Fridge'>Fridge</option>
                            <option value='Freezer'>Freezer</option>
                            <option value='Pantry'>Pantry</option>
                        </select>
                    </div>
                    <hr/>
                    <div className='form-row align-items-center justify-content-between'>
                        <div className="form-group col-3">
                            <label>Quantity</label>
                            <input className="form-control" type="number" value={quantity} onChange={this.handleQuantity} />
                        </div>
                        <div className="form-group col-3">
                                <input className="form-check-input" type="checkbox" value={this.state.inFood} onChange={this.handleInFood} />
                                <label className="form-check-label">My Food</label>
                        </div>
                        <div className="form-group col-3">
                                <input className="form-check-input" type="checkbox" value={this.state.inList} onChange={this.handleInList} />
                                <label className="form-check-label">My List</label>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <input className="btn btn-success" type="submit" value='Add Item!'/>
                        <Link className="btn btn-outline-dark" to={`/${this.props.location.state.page}`}>Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewItemPage;