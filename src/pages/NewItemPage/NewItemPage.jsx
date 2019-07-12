import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {createItem} from '../../services/api';


class NewItemPage extends Component {

    constructor() {
        super();
        this.state = {
            name:'test',
            category: 'Dry & Packaged Food',
            storage: 'Pantry',
            quantity: 1
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        createItem(this.state).then((json) =>
        console.log('createIten fecthed'))
        // window.location = '/myfood';
    }

    handleName = () => {

    }
    handleCategory = () => {

    }
    handleStorage = () => {

    }
    handleQuantity = () => {

    }


    render() {
        return(
            <div>
                <h1>New Item</h1>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <label>Name:</label>
                    <input value={this.state.name} onChange={this.handleName}/>
                    <label>What kind of food is it ?</label>
                    <select value={this.state.category} onChange={this.handleCategory}>
                        <option value='Meats & Seafood'>Meats & Seafood</option>
                        <option value='Fruits & Vegetables'>Fruits & Vegetables</option>
                        <option value='Spices & Condiments'>Spices & Condiments</option>
                        <option value='Dry & Packaged Food'>Dry & Packaged Food</option>
                    </select>
                    <label>Where do you keep it ?</label>
                    <select value={this.state.storage} onChange={this.handleStorage}>
                        <option value='Fridge'>Fridge</option>
                        <option value='Freezer'>Freezer</option>
                        <option value='Pantry'>Pantry</option>
                    </select>
                    <label>How many ?</label>
                    <input type="number" value={this.state.name} onChange={this.handleQuantity}/>
                    <input type="submit" value='Add Item!'/>
                </form>
                <Link to='/myfood'></Link>
            </div>
        )
    }
}

export default NewItemPage;