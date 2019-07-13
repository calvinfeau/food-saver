import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { getItem, editItem, deleteItem } from '../../services/api';


class EditItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '',
            storage: '',
            quantity: 1,
            inFood: null,
            inList: null
        }
    }

    componentDidMount() {
        var itemId = this.props.match.params.itemId;
        // console.log('componentdidmount itemId: ', itemId)
        var self = this;
        getItem(itemId).then(function(item) {
            console.log('item return from promise: ', item)
            self.setState({
                name: item.name,
                category: item.category,
                storage: item.storage,
                quantity: item.quantity,
                inFood: item.inFood,
                inList: item.inList
            })
        })
        console.log('state mounted: ', this.state)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        editItem(this.state, this.props.match.params.itemId).then(json => console.log('return by the promise: ', json)
            // window.location = '/myfood'
        )
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
        this.setState({ inFood: e.target.checked })
        // console.log('inFood: ', this.state.inFood)
    }
    
    handleInList = (e) => {
        this.setState({ inList: e.target.checked})
        // console.log('inList: ', this.state.inList)
    }
    handleDelete = () => {
        deleteItem(this.props.match.params.itemId).then(() => window.location = '/myfood')
    }
    render() {
        return(
            <div>
                <h1>Edit Item</h1>
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
                    <input type="submit" value='Edit'/>
                </form>
                <Link to='/myfood'>Cancel</Link>
                <a href="#" onClick={this.handleDelete}>Delete</a>
            </div>
        )
    }
}

export default EditItemPage;