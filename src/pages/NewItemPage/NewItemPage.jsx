import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {createItem} from '../../services/api';

let isInFood;
let isInList;
// let fromPage;
let quantity;

class NewItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            category: 'Dry & Packaged Food',
            storage: 'Pantry',
            inFoodQty: 1,
            inListQty: 1,
            inFood: isInFood,
            inList: isInList
        }
    }

    componentDidMount() {
        isInFood = this.props.location.state.inFood;
        isInList = this.props.location.state.inList;
        // fromPage = this.props.location.state.page;
        console.log('is In food:', isInFood)
        console.log('is in list:', isInList)
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
        this.setState((state) => {return{...state, inFoodQty: e.target.value}}) : this.setState((state) => {return{...state}});
        this.state.inList ? 
        this.setState((state) => {return{...state, inListQty: e.target.value}}) : this.setState((state) => {return{...state}});
    }
    
    handleInFood = (e) => {
        // isInFood = e.target.checked;
        let checked = e.target.checked;
        this.setState((state) => {return{...state, inFood: checked, inFoodQty: quantity}})        
        // console.log('inFood: ', this.state.inFood)
    }
    
    handleInList = (e) => {
        let checked = e.target.checked;
        // isInList = e.target.checked;
        this.setState((state) => {return{...state, inList: checked, inListQty: quantity}})        
        // console.log('inList: ', this.state.inList)
    }

    render() {
        return(
            <div>
                <h1>New Item</h1>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <label>Name:
                        <input type='text' value={this.state.name} onChange={this.handleName}/>
                    </label>
                    <label>What kind of food is it ?
                    <select value={this.state.category} onChange={this.handleCategory}>
                        <option value='Meats & Seafood'>Meats & Seafood</option>
                        <option value='Fruits & Vegetables'>Fruits & Vegetables</option>
                        <option value='Spices & Condiments'>Spices & Condiments</option>
                        <option value='Dry & Packaged Food'>Dry & Packaged Food</option>
                        <option value='Beverages'>Beverages</option>
                        <option value='Dairy'>Dairy</option>
                    </select>
                    </label>
                    <label>Where do you keep it ?
                    <select value={this.state.storage} onChange={this.handleStorage}>
                        <option value='Fridge'>Fridge</option>
                        <option value='Freezer'>Freezer</option>
                        <option value='Pantry'>Pantry</option>
                    </select>
                    </label>
                    <label>How many ?
                    <input type="number" value={quantity} onChange={this.handleQuantity} />
                    </label>
                    <label>My Food
                        <input type="checkbox" value={this.state.inFood} onChange={this.handleInFood} />
                    </label>
                    <label>My List
                        <input type="checkbox" value={this.state.inList} onChange={this.handleInList} />
                    </label>
                    <input type="submit" value='Add Item!'/>
                </form>
                <Link to={`/${this.props.location.state.page}`}>Cancel</Link>
            </div>
        )
    }
}

export default NewItemPage;