import React, { Component } from 'react';
import './itemUpload.css';

// post code regular expression
const postCodeRegex = RegExp(/^[a-zA-Z]{1,2}([0-9]{1,2}|[0-9][a-zA-Z])\s*[0-9][a-zA-Z]{2}$/);

const formValid = formErrors => {
    let valid = true;

    // check if theres as value in form error 
    Object.values(formErrors).forEach(val => {
        if (val.length > 0) {
            valid = false
        }
    });
    return valid
}

class ItemUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemTitle: null,
            description: null,
            postCode: null,
            mobile: null,
            price: null,
            condition: null,
            itemImage: null,
            displayImage: null,
            formErrors: {
                itemTitle: " ",
                description: " ",
                postCode: " ",
                condition: " ",
                mobile: " ",
                price: " ",
            }
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        if (formValid(this.state.formErrors)) {
            let itemDetials = {
                userID: this.props.userID,
                itemTitle: this.state.itemTitle,
                description: this.state.description,
                postCode: this.state.postCode,
                condition: this.state.condition,
                mobile: this.state.mobile,
                price: this.state.price,
            }
            this.props.onClick(itemDetials, this.state.itemImage)

        }
    };

    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;

        let formErrors = this.state.formErrors

        switch (name) {
            case 'itemTitle':
                formErrors.itemTitle = value.length < 2 ? 'Please enter a title for the item' : ""; //check if valie is smaller than 2 characters
                break;
            case 'description':
                formErrors.description = value.length < 15 ? 'Please enter more than 5 words' : ""; //check if valie is smaller than 5 words
                break;
            case 'postCode':
                formErrors.postCode = postCodeRegex.test(value) ? "" : 'Please enter a U.K post code'; // check to see if post code meets post code expression
                break;
            case 'mobile':
                formErrors.mobile = value.length < 11 ? 'please enter a mobile' : ""; //check if valie is smaller than 3 characters
                break;
            case 'condition':
                formErrors.condition = value === "Condition" ? 'Enter condition' : ""; //Checks if condition is selected instead of default
                break;
            case 'price':
                formErrors.price = value.length === 0 || isNaN(parseInt(value)) ? 'Please enter a price' : ""; // check to see character is equal to 0 or a string
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });
    }

    fileSelectedHandler = event => {
        this.setState({ itemImage: event.target.files[0] })
        this.setState({ displayImage: URL.createObjectURL(event.target.files[0])})
        
    }
    render() {

        const { formErrors } = this.state;

        return (
            <div className="itemUpload">
                <form onSubmit={this.handleSubmit} noValidate>

                    <input name="itemImage" type="file" onChange={this.fileSelectedHandler} />
                    <img className="displayImage" id="target" src={this.state.displayImage} alt="item"/>
        
                    <input className="itemTitle" type="text" placeholder="Item Title" name="itemTitle" onChange={this.handleChange} />
                    <span className="itemTitleError">{formErrors.itemTitle}</span>

                    <textarea className="description" placeholder="Please enter item description here." name="description" onChange={this.handleChange}></textarea>
                    <span className="descriptionError">{formErrors.description}</span>

                    <input className="postCode" type="text" placeholder="Post code" name="postCode" onChange={this.handleChange} />
                    <span className="postCodeError">{formErrors.postCode}</span>

                    <input className="mobile" type="text" placeholder="Mobile number" name="mobile" onChange={this.handleChange} />
                    <span className="mobileError">{formErrors.mobile}</span>

                    <input className="price" type="number" placeholder="Price" name="price" onChange={this.handleChange} />
                    <span className="priceError">{formErrors.price}</span>

                    <select className="Condition" name="condition" noValidate onChange={this.handleChange}>
                        <option name="condition"> Condition</option>
                        <option name="new"> New</option>
                        <option name="used"> Used </option>
                        <option name="spare"> Spare</option>
                    </select>
                    <span className="conditionError">{formErrors.condition}</span>

                    <button className="upload">Submit</button>
                </form>
            </div>
        );
    }
}

export default ItemUpload;