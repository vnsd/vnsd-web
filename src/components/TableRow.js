import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const bizUrl = process.env.BIZ_URL || 'http://localhost:5000/startup/';

class TableRow extends Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete() {
        axios.delete(bizUrl + 'remove/' + this.props.obj.code)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.code}
                </td>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.description}
                </td>
                <td>
                    {this.props.obj.phone}
                </td>
                <td>
                    <Link to={"/edit/" + this.props.obj.code} className="btn btn-primary">Edit</Link>
                </td>
                <td>
                    <button onClick={this.delete} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
}

export default TableRow;