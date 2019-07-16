import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class ItemsAddedPage extends Component {
    constructor() {
        super();
    }

    render() {
        return (
        <div>
            <h1>Items Added!</h1>

            <Link to = '/mylist'>Back to My List</Link>
            <br/>
            <Link to = '/myfood'>Back to My Food</Link>

        </div>
        )
    }
}

export default ItemsAddedPage;