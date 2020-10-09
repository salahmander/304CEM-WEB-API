import React, { Component } from 'react';
import './dropdown.css'

import { ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap' //import bootstrap

class TheDropDown extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        this.handleFavourites =this.handleFavourites.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleMyItems = this.handleMyItems.bind(this);
    }

    //Allows logout request 
    handleLogout = event => {
        event.preventDefault(); 
        this.props.onLogoutClick() // function call to header to parent
    }
    // Allows users to see their favourites
    handleFavourites = event => {
        event.preventDefault();
        this.props.onFavourite(); // function call to header to parent
    }

    //Allows your to upload items
    handleUpload = event => {
        event.preventDefault();
        this.props.onUpload(); // function call to header to parent
    }

    //Allows users to see their items
    handleMyItems = event => {
        event.preventDefault();
        this.props.onItems();

    }

    render() {

        return (
            <div className="dropDown">
                <ButtonToolbar>
                    <DropdownButton title="My classified" id="dropdown-size-medium">
                        <MenuItem onClick={this.handleUpload}>Upload Item</MenuItem>
                        <MenuItem onClick={this.handleMyItems}>View Uploads</MenuItem>
                        <MenuItem onClick={this.handleFavourites}>Favourites</MenuItem>
                        <MenuItem divider />
                        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                    </DropdownButton>
                </ButtonToolbar>

            </div>
        );
    }
}
export default TheDropDown;