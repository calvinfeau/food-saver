import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class ItemsAddedPage extends Component {
    render() {
        return (
        <div className='container-fluid'> 
            <div className="row row-md align-items-center justify-content-center header light-txt txt-lg">Item Added!</div>
            <div className="pd-lg d-flex justify-content-between">    
                <Link className='col-3 btn btn-success btn-lg' to='/mylist'>My List</Link>
                <Link className='col-3 btn btn-success btn-lg' to='/myfood'>My Food</Link>
            </div>
        </div>
        
        )
    }
}

export default ItemsAddedPage;