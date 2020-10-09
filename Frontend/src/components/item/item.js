import React, { Component } from 'react';
import './item.css';
import { Glyphicon } from 'react-bootstrap'

class Item extends Component {

    constructor(props) {
        super(props);

        this.state = {
            favorited: false
        };

        this.onBookmarkClicked = this.onBookmarkClicked.bind(this);
    }

    onBookmarkClicked(event) {
        let currentValue = this.state.favorited;
        this.setState({ favorited: !currentValue });
        if(this.state.favorited){ // removes favourites 
            let removedData = {   
                userID: this.props.userID,
                itemID: this.props.theItem[0].itemID
            }
            this.props.remFav(removedData)
        }else{ // adds favourites 
            let favouriteData = {  //stores the users ID in 
                userID: this.props.userID,
                itemID: this.props.theItem[0].itemID
            }
            this.props.addFav(favouriteData)
            
        }
    }
    render() {

        let favouriteIcon;

        if (this.state.favorited) { //check state of favourite false will remove favourites true will add
            favouriteIcon = <button className="favedButton" ><Glyphicon glyph="heart" /></button>
        } else {
            favouriteIcon = <button className="favButton" ><Glyphicon glyph="heart" /></button>
        }

        return (
            <div className="itemView">
                <span className="itemName">{this.props.theItem[0].title}</span>
                <img className="itemImage" src={this.props.theItem[0].image} alt="laptop" />

                <div className="description">
                    <p>{this.props.theItem[0].description}</p>
                </div>

                <div className="itemDetail">
                    <ul>
                        <li>Location: {this.props.theItem[0].location}</li>
                        <li>Condition: {this.props.theItem[0].item_condition}</li>
                        <li>Mobile: {this.props.theItem[0].mobile}</li>
                        <li className="itemPrice">Price: £{this.props.theItem[0].price}</li>
                    </ul>
                    <span onClick={this.onBookmarkClicked}>
                        {favouriteIcon}
                    </span>
                </div>
            </div>

        );
    }
}
export default Item;