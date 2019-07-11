import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class MyList extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <div>
                    <h3>My List</h3>
                    <h4><Link to='/create'>Add Item</Link></h4>
                    <h4><Link to='/myfood'>My Food</Link></h4>
                    <h4><a href="#" onClick=''>Log Out</a></h4>
                </div>
                <div> 
                    My List index page with a table
                </div>
            </div>
        )
    }
}


export default MyList;