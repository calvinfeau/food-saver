import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {createItem} from '../../services/api';

let isInFood = true, isInList = true;

class NewItemPage extends Component {
    
    state = {
        name:'',
        category: 'Dry & Packaged Food',
        storage: 'Pantry',
        quantity: 1,
        inFood: isInFood,
        inList: isInList
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let fromPage = this.props.location.state.page;
        console.log(fromPage)
        createItem(this.state).then(() => {
            window.location = `/${fromPage}`;
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
        this.setState({ quantity: e.target.value })
    }
    
    handleInFood = (e) => {
        isInFood = e.target.checked;
        this.setState({ inFood: isInFood})
        console.log('inFood: ', this.state.inFood)
    }
    
    handleInList = (e) => {
        isInList = e.target.checked;
        this.setState({ inList: isInList})
        console.log('inList: ', this.state.inList)
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
                    <input type="number" value={this.state.quantity} onChange={this.handleQuantity} />
                    </label>
                    <label>My Food
                        <input type="checkbox" value={this.state.inFood} onChange={this.handleInFood}  />
                    </label>
                    <label>My List
                        <input type="checkbox" value={this.state.inList} onChange={this.handleInList}  />
                    </label>
                    <input type="submit" value='Add Item!'/>
                </form>
                <Link to='/myfood'>Cancel</Link>
            </div>
        )
    }
}

export default NewItemPage;