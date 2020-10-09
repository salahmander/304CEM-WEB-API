import React, { Component } from 'react';
import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.handleAllItems = this.handleAllItems.bind(this);
    }

    handleAllItems = event => {
        event.preventDefault();
        this.props.onAllItems();

    }

    render() {
        return (
            <div>
                <div className="profile">
                    <div>
                        <h1>Admin</h1>
                        <p>Hello, you're now logged in as an admin. To view all item please click the button below.</p>
                        <button onClick={this.handleAllItems}>All items</button>
                    </div>

                </div>
            </div>

        );
    }
}
export default Profile;