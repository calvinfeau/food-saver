import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { saveItems } from '../../services/api';


class RemainingItemsPage extends Component {
    handleSaveItems = (choice) => {
        saveItems(choice);
    }

    render() {
        return (
        <div>
            <h1>Save Remaining Items ?</h1>
            <Link to = '/mylist/added' onClick={() => this.handleSaveItems('yes')}>Yes</Link>
            <br/>
            <Link to = '/mylist/added' onClick={() => this.handleSaveItems('no')}>No</Link>
        </div>
        )
    }
}

export default RemainingItemsPage;