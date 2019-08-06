import React, {Component} from 'react';
import axios from 'axios';

const bizUrl = process.env.BIZ_URL || 'http://localhost:5000/startup/';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            code: '',
            name: '',
            description: '',
            phone: ''
        }
    }

    componentDidMount() {
        axios.get(bizUrl + 'get/' + this.props.match.params.code)
            .then(response => {
                this.setState({
                    code: response.data.code,
                    name: response.data.name,
                    description: response.data.description,
                    phone: response.data.phone
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            code: this.state.code,
            name: this.state.name,
            description: this.state.description,
            phone: this.state.phone
        };
        axios.put(bizUrl + 'update/' + this.props.match.params.code, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/index');
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3 align="center">Update startup</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>ID: </label>
                        <input
                            readOnly={true}
                            type="text"
                            className="form-control"
                            value={this.state.code}
                        />
                    </div>
                    <div className="form-group">
                        <label>Startup Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.description}
                               onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.phone}
                               onChange={this.onChangePhone}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               value="Update startup"
                               className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}