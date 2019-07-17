import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { getItem, editItem, deleteItem } from '../../services/api';

let fromPage, quantity;

class EditItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '',
            storage: '',
            inFoodQty: 0,
            inListQty: 0,
            inFood: null,
            inList: null
        }
    }

    componentDidMount() {
        var self = this;
        var itemId = this.props.match.params.itemId;
        // console.log('location:', this.props.location.state.page)
        fromPage = this.props.location.state.page;
        getItem(itemId).then(function(item) {
            self.setState((prevState) => ({
                ...prevState,
                name: item.name,
                category: item.category,
                storage: item.storage,
                inFoodQty: item.inFoodQty,
                inListQty: item.inListQty,
                inFood: item.inFood,
                inList: item.inList
            }));
            // console.log('state mounted: ', self.state);
        });
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
        this.setState({ [e.target.name]: e.target.value})
    }
    
    handleInFood = (e) => {
        let checked = e.target.checked;
        // console.log(checked)
        this.setState((state) => {return{...state, inFood: checked, inFoodQty: quantity}})        
    }
    
    handleInList = (e) => {
        let checked = e.target.checked;
        // console.log(checked)
        this.setState((state) => {return{...state, inList: checked, inListQty: quantity}})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        editItem(this.state, this.props.match.params.itemId)
            .then(() => {
                // console.log('return by the promise: ', json);
                window.location = `/${fromPage}`
            }
        )
    }

    handleDelete = () => {
        deleteItem(this.props.match.params.itemId).then(() => window.location = `/${fromPage}`)
    }

    render() {
        return(
            <div className='container-fluid'>
                <div className="row row-md align-items-center justify-content-center header light-txt txt-lg">Edit Item</div>
                <form className='pd-lg justify-content-center' onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input className="form-control" type='text' placeholder='Name' value={this.state.name} onChange={this.handleName}/>
                    </div>
                    <hr/>
                    <div className="form-group">
                        <select className="form-control" value={this.state.category} onChange={this.handleCategory}>
                            <option value='Meats & Seafood'>Meats & Seafood</option>
                            <option value='Fruits & Vegetables'>Fruits & Vegetables</option>
                            <option value='Spices & Condiments'>Spices & Condiments</option>
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
                            {this.props.location.state.page === 'myfood' ?
                            <input className="form-control" type="number" name='inFoodQty' value={this.state.inFoodQty} onChange={this.handleQuantity} />
                            :
                            <input className="form-control" type="number" name='inListQty' value={this.state.inListQty} onChange={this.handleQuantity} />
                            }
                        </div>
                        <div className="form-group col-3">
                            <input className="form-check-input" type="checkbox" value={this.state.inFood} onChange={this.handleInFood} checked={this.state.inFood}/>
                            <label className="form-check-label">My Food</label>
                        </div>
                        <div className="form-group col-3">
                            <input className="form-check-input" type="checkbox" value={this.state.inList} onChange={this.handleInList} checked={this.state.inList} />
                            <label className="form-check-label">My List</label>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <input className="btn btn-success" type="submit" value='Edit'/>
                        <Link className="btn btn-outline-dark" to={`/${this.props.location.state.page}`}>Cancel</Link>
                        <a className="btn btn-outline-dark" href="#" onClick={this.handleDelete}>Delete</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditItemPage;