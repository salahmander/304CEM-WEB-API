import React, { Component } from 'react';
import './userFavouriteList.css';
import { Glyphicon } from 'react-bootstrap'



class UserFavouriteList extends Component {

    constructor(props) {
        super(props);

        this.onRemoveClicked = this.onRemoveClicked.bind(this);
    }

    onRemoveClicked(event) {
    event.preventDefault()   
    this.props.onClick(this.props.id);
        
    }
    
    render() {
        return (
            <div className="userFavouriteList">
                <img src={this.props.image} alt={this.props.imgAlt} />
                <div className="container">
                    <span className="linkButton"><h4><b>{this.props.title}</b></h4></span>
                    <p>{this.props.description}</p>
                    <ul>
                        <li>Location: {this.props.location}</li>
                        <li>Condition: {this.props.condition}</li>
                        <li>Mobile: {this.props.mobile}</li>
                        <li>Price: £{this.props.price}</li>
                    </ul>
                    <span onClick={this.onRemoveClicked}>
                        <button className="removedButton" ><Glyphicon glyph="remove" /></button>
                    </span>
                </div>
            </div>
        );
    }
}
export default UserFavouriteList;