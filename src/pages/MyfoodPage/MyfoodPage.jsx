import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class MyFood extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <div>
                    <h3>My Food</h3>
                    <h4><Link to='/create'>Add Item</Link></h4>
                    <h4><Link to='/mylist'>My List</Link></h4>
                    <h4><a href="#" onClick=''>Log Out</a></h4>
                </div>
                <div>
                    My Food index page with a table
                </div>
            </div>
        )
    }
}


export default MyFood;