import React, { Component } from 'react';
import './advancedSearch.css';
import homeImage from './images/home.jpg'

// post code regular expression
const postCodeRegex = RegExp(/^[a-zA-Z]{1,2}([0-9]{1,2}|[0-9][a-zA-Z])\s*[0-9][a-zA-Z]{2}$/);

const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => { // check if theres a form error present 
        if (val.length > 0) {
            valid = false
        }
    });
    return valid
}


class AdvancedSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemName: null,
            location: null,
            condition: null,
            minPrice: null,
            maxPrice: null,
            formErrors: {
                itemName: " ",
                location: " ",
                condition: " ",
                minPrice: " ",
                maxPrice: " "
            }
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        //if the form is valid sumbit
        if (formValid(this.state.formErrors)) {
            this.props.onClick(this.state.itemName, this.state.location, this.state.condition, this.state.minPrice, this.state.maxPrice); 

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
            case 'location':
                formErrors.location = postCodeRegex.test(value) ? "" : 'Please enter a U.K post code'; // check to see if post code meets post code expression
                break;
            case 'condition':
                formErrors.condition = value === "Condition" ? 'Enter condition' : ""; //Checks if condition is selected instead of default
                break;
            case 'minPrice':
                formErrors.minPrice = value > event.maxPrice ? "Minimum has to be less thanMaximum"  : ""; // checks if the min price is greater than max price
                break;
            case 'maxPrice':
                formErrors.maxPrice = value < event.minPrice ? " Maximum has to be greater than Minimum" : ""; // checks if max price is less min price
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });
    }

    render() {

        const { formErrors } = this.state;


        return (
            <div>
                <img className ="homeImage" src={homeImage} alt="home" />
                <div className="aSearch">
                    <h1>Advanced Search</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="itemName">
                            <input placeholder="Looking for..." type="text" name="itemName" noValidate onChange={this.handleChange} />
                            <span>{formErrors.itemName}</span>
                        </div>
                        <div className="surname">
                            <input placeholder="Post code" type="text" name="location" noValidate onChange={this.handleChange} />
                            <span>{formErrors.location}</span>
                        </div>
                        <div className="condition">
                            <select className="selectCon" name="condition" noValidate onChange={this.handleChange}>
                                <option name="condition"> Condition</option>
                                <option name="new"> New</option>
                                <option name="used"> Used </option>
                                <option name="spare"> Spare</option>
                            </select>
                            <span>{formErrors.condition}</span>
                        </div>
                        <div className="priceRange">
                            <input placeholder="Minimum Price" type="number" name="minPrice" noValidate onChange={this.handleChange} />
                            <input placeholder="Maximum Price" type="number" name="maxPrice" noValidate onChange={this.handleChange} />
                        </div>
                        <span>{formErrors.minPrice}</span>
                        <span>{formErrors.maxPrice}</span>
                        <div className="advancedSearch">
                            <button type="submit">Search</button>
                        </div>
                    </form>


                </div>
            </div>

        );
    }
}
export default AdvancedSearch;