import React, { Component } from 'react';
import './Header.css';

import TheDropDown from './dropdown'
import { ButtonToolbar, Button } from 'react-bootstrap'

const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => { // checks  theres is something inside form errors
        if (val.length > 0) {
            valid = false
        }
    });
    return valid
}

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemName: null,
            formErrors: {
                itemName: " ",
            }
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleMyItems = this.handleMyItems.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleFavourites = this.handleFavourites.bind(this);
    }

    handleSearchSubmit = event => {
        event.preventDefault();
        //if the form is valid sumbit
        if (formValid(this.state.formErrors)) {
            this.props.onSearch(this.state.itemName)
        }

    };

    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;

        let formErrors = this.state.formErrors;

        switch (name) { //validation for all inputs 
            case 'itemName':
                formErrors.itemName = value.length === 0 ? 'Enter item name' : ""; // checks if something has been entered
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });
    }

    
    handleHome = event => {  //handles event to allow users to go to home page
        event.preventDefault();
        this.props.onHome();
    }

    
    handleLogin = event => { //handles event to allow users to go to login page
        event.preventDefault();
        this.props.onClick();
    }
    
    handleLogout() { // handles event logouts 
        this.props.onLogoutClick()
    }
 
    handleFavourites() {   // calls funcion on parent to render user favourites
        this.props.onFavourite();
    }

    handleUpload() {      //handles event to allow users to go to upload page
        this.props.onUpload();
    }

    handleMyItems() {      // calls function on parent to render user listed items.
        this.props.onItems();
    }

    render() {
        let login;
        let logout
        if (this.props.signedIn) { // If users has successfully logged in button will display profile seclection
            logout = <TheDropDown onLogoutClick={this.handleLogout} onItems={this.handleMyItems} onFavourite={this.handleFavourites} onUpload={this.handleUpload} />
        } else {
            login = <ButtonToolbar><Button className="loginButton" bsSize="small">Login</Button></ButtonToolbar>
        }

        return (

            <div className="theHeader">
                <div className="header">
                    <header className="MainHeader"><h1 align="center"><button className="Home" type="Home" onClick={this.handleHome}><b><span className="NameBlack">My Stuff:</span><span className="NameWhite">Classified Ads Web App</span> </b></button></h1></header>
                    <div className="header-right">
                        <div className="search-container">
                            <form onClick={this.handleSearchSubmit} noValidate>
                                <input placeholder="Looking for..." type="text" name="itemName" noValidate onChange={this.handleChange} />
                                <button type="submit">Search</button>
                            </form>
                        </div>
                        <span onClick={this.handleLogin}>
                            {login}
                        </span>
                    </div>
                </div>
                <span>
                    {logout}
                </span>
            </div>

        );
    }
}
export default Header;