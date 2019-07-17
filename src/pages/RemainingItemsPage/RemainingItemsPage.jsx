import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { saveItems } from '../../services/api';

class RemainingItemsPage extends Component {
    handleSaveItems = (choice) => {
        saveItems(choice);
    }

    render() {
        return (
        <div className='container-fluid'> 
            <div className="row row-md align-items-center justify-content-center header light-txt txt-lg">Save Remaining Item ?</div>
            <div className="pd-lg d-flex justify-content-between">
                <Link className='col-3 btn btn-success btn-lg' to = '/mylist/added' onClick={() => this.handleSaveItems('yes')}>Yes</Link>
                <Link className='col-3 btn btn-outline-dark btn-lg' to = '/mylist/added' onClick={() => this.handleSaveItems('no')}>No</Link>
            </div>
        </div>
        )
    }
}

export default RemainingItemsPage;