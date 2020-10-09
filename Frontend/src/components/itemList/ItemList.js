import React, { Component } from 'react';
import './ItemList.css';



class ItemList extends Component {

    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(event) {  //pass the selected items ID to be rendered
        event.preventDefault();
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <div className="ItemList">
                <img src={this.props.image} alt={this.props.imgAlt} />
                <div className="container">
                    <button onClick={this.onClickHandler} className="linkButton"><h4><b>{this.props.title}</b></h4></button>
                    <p>{this.props.description.substr(0, 200)}<b> >>></b></p> {/*description character limit 300 */}
                    <ul>
                        <li>Location: {this.props.location}</li>
                        <li>Condition: {this.props.condition}</li>
                        <li>Mobile: {this.props.mobile.substr(0, 3)}<b>********</b></li> {/*displays only the first three digits of the phone*/}
                        <li>Price: £{this.props.price}</li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default ItemList;