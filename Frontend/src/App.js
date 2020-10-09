//import react
import React, { Component } from 'react';
import axios from 'axios'

import './App.css';
import ItemUpload from './components/itemUpload/itemUpload'
import ItemGrids from './components/itemListGrid/itemGrids'
import Item from './components/item/item'
import Register from './components/register/register';
import Profile from './components/profile/profile';
import Header from './components/header/Header';
import AdvancedSearch from './components/advancedSearch/advancedSearch'
import UserItemGrids from './components/userItems/userItemGrids'
import UserFavouriteGrids from './components/userFavourites/userFavouriteGrids'
import Login from './components/Login/Login';

//define a new class for the App
class App extends Component {

  itemInfo = [];
  searchItems = [];
  myItemInfo = [];
  userFavourite = [];

  constructor(props) {
    super(props);

    //we setup our initial state in the constuctor
    //by default we will show Home component
    this.state = {
      currentView: "home",
      itemData: [],
      checkUser: [],
      myFavourtie: [],
      userLogedIn: null,
      loginError: false,
      signedIn: false,
      admin: false
    };

    //bind all the functions in the class so that the keyword "this"
    //will not change its context and points to another object
    this.handleThumbnailClicked = this.handleThumbnailClicked.bind(this);
    this.handleLoginClicked = this.handleLoginClicked.bind(this);
    this.handleGoToReg = this.handleGoToReg.bind(this);
    this.hanndleAdvancedSearch = this.hanndleAdvancedSearch.bind(this)
    this.handleHomeClicked = this.handleHomeClicked.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleLoginAuth = this.handleLoginAuth.bind(this)
    this.handleRegestration = this.handleRegestration.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleAddFavourite = this.handleAddFavourite.bind(this)
    this.handleRemoveFavourite = this.handleRemoveFavourite.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleGetFavourite = this.handleGetFavourite.bind(this)
    this.handleItems = this.handleItems.bind(this)
    this.handleUploadItem = this.handleUploadItem.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.favourite = this.favourite.bind(this)
    this.handleAllItems = this.handleAllItems.bind(this)
  }


//will pass this function to item component so we will handle itemID
  handleThumbnailClicked(key) {
    this.itemInfo = [] // empty the list so that there are no duplicates
    if (this.state.signedIn) {

      if (this.state.currentView !== "itemList" && this.state.currentView !== "home")
        return;

      this.setState({ currentView: "itemView" });
      let len = this.state.itemData.length;

      //loop through the items and find the one matching ID with the key that was clicked
      for (let i = 0; i < len; i++) {

        if (this.state.itemData[i].itemID === key) {
          this.itemInfo.push(this.state.itemData[i]);
        }
      }
    } else {
      this.setState({ currentView: "login" });
    }
  }

  //changes state to hoome
  handleHomeClicked() {
    this.setState({ currentView: "home" });
  }

  //take item defined and search in array of items
  handleSearch(item) {
    this.searchItems = []

    this.setState({ currentView: "itemList" });
    let len = this.state.itemData.length;

    for (let i = 0; i < len; i++) { //loop through the items and find where item title equals the item

      if (this.state.itemData[i].title === item) {
        this.searchItems.push(this.state.itemData[i])
      }
    }

  }

  //set all state related to login to false so that user will have guest privileges
  handleLogout() {
    this.setState({ signedIn: false })
    this.setState({ admin: false })
    this.setState({ currentView: "home" });
  }


  handleLoginClicked() {
    if (this.state.signedIn) { // check if the user is singed in as they cant access login if they are logged in 
      this.setState({ currentView: "home" });
    } else {
      this.setState({ currentView: "login" });
    }
  }

  handleGoToReg() {
    this.setState({ loginError: false })
    if (this.state.signedIn) {
      this.setState({ currentView: "home" });
    } else {
      this.setState({ currentView: "register" });
    }
  }

  handleUpload() {
    this.setState({ currentView: "itemUpload" })
  }

  handleUploadItem(itemUploadDetails, itemImage) {
    const itemFormData = new FormData()
    itemFormData.append('userID', itemUploadDetails.userID) //app all data from upload one by one so that they can be sent to API
    itemFormData.append('title', itemUploadDetails.itemTitle)
    itemFormData.append('description', itemUploadDetails.description)
    itemFormData.append('location', itemUploadDetails.postCode)
    itemFormData.append('condition', itemUploadDetails.condition)
    itemFormData.append('productImage', itemImage, itemImage.name)
    itemFormData.append('mobile', itemUploadDetails.mobile)
    itemFormData.append('price', itemUploadDetails.price)

    axios.post('http://localhost:8080/api/v1.0/itemUpload', itemFormData)
      .then(res => {
        console.log(res);
      });
    this.setState({ currentView: "home" });
  }

  handleItems() {
    this.myItemInfo = []
    fetch('/api/v1.0/items')
      .then(res => res.json())
      .then(itemData => this.setState({ itemData }, () => console.log(`Item fetched... `,
        itemData)))

    if (this.state.signedIn) {

      this.setState({ currentView: "userItemList" });
      let len = this.state.itemData.length;

      for (let i = 0; i < len; i++) {

        if (this.state.itemData[i].userID === this.state.userLogedIn.userID) {
          this.myItemInfo.push(this.state.itemData[i])
        }
      }
    } else {
      this.setState({ currentView: "login" });
    }

  }

  handleAllItems() {
    this.myItemInfo = []
    fetch('/api/v1.0/items')
      .then(res => res.json())
      .then(itemData => this.setState({ itemData }, () => console.log(`Item fetched... `,
        itemData)))

    this.setState({ currentView: "userItemList" });
    this.myItemInfo = this.state.itemData
  }

  hanndleAdvancedSearch(item, location, condition, minPrice, maxPrice) {
    this.itemInfo = [];
    this.searchItems = []
    if (this.state.currentView !== "home")
      return;


    this.setState({ currentView: "itemList" });
    let len = this.state.itemData.length;

    for (let i = 0; i < len; i++) {
        //check if the all the users input matches anything to his standard 
      if (this.state.itemData[i].title === item && this.state.itemData[i].location === location && this.state.itemData[i].item_condition === condition && this.state.itemData[i].price > minPrice && this.state.itemData[i].price < maxPrice) {
        this.searchItems.push(this.state.itemData[i])
      }
    }

  }

  handleGetFavourite() {
    fetch('http://localhost:8080/api/v1.0/favourite', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: this.state.userLogedIn.userID
      })
    }).then(res => res.json())
      .then(myFavourtie => this.setState({ myFavourtie }, () => this.favourite()))
  }

  favourite() {
    this.userFavourite = []
    this.setState({ currentView: "userFavouriteList" });
    let myFavourite = this.state.myFavourtie;
    let len = myFavourite.length
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < this.state.itemData.length; j++) {
        if (this.state.itemData[j].itemID === myFavourite[i].itemID) {
          this.userFavourite.push(this.state.itemData[j])
        }

      }
    }

  }

  handleAddFavourite(favData) {
    this.itemInfo = [];
    this.searchItems = []

    console.log(favData)

    fetch('http://localhost:8080/api/v1.0/favourites', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemID: favData.itemID,
        userID: favData.userID,
      })
    })

  }

  handleRemoveFavourite(itemID) {
    fetch('http://localhost:8080/api/v1.0/favourite', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemID: itemID,
        userID: this.state.userLogedIn.userID
      })
    })
    this.handleGetFavourite()


  }

  handleRemoveItem(itemID) {
    fetch('http://localhost:8080/api/v1.0/items', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemID: itemID,
      })
    })
    this.handleItems()

  }

  handleRegestration(regDetials) {
    this.itemInfo = [];
    this.searchItems = []

    this.setState({ currentView: "login" });

    fetch('http://localhost:8080/api/v1.0/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: regDetials[0].firstName,
        surname: regDetials[0].surname,
        email: regDetials[0].email,
        username: regDetials[0].username,
        password: regDetials[0].password,
        role: regDetials[0].role
      })
    })

  }

  handleLoginAuth(loginData) {
    this.itemInfo = [];
    this.searchItems = []
    axios.post('http://localhost:8080/api/v1.0/login', {
    }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + window.btoa(loginData.username + ':' + loginData.password)
        }
      }).then(res => {
        if (res.status === 200) {
          //data = res.data
          this.setState({ userLogedIn: res.data })
          this.setState({ signedIn: true }) //set the state to true so user gain access to their profile
          this.setState({ currentView: "home" }); // return back to home once successfully deemed away
          if (this.state.userLogedIn.role === "admin") { // check if user has a role of admin 
            this.setState({ admin: true })
          }
        }

      }).catch((error) => { //login component to display error in username or password
        console.log(error)
        this.setState({ loginError: true })
      });


  }

  componentDidMount() {
    // when react component start fetch both all the items and gil
    fetch('/api/v1.0/items')
      .then(res => res.json())
      .then(itemData => this.setState({ itemData }))

    fetch('/api/v1.0/users')
      .then(res => res.json())
      .then(checkUser => this.setState({ checkUser }))

  }


  render() {

    let whatToRender;
    let extraRender

    if (this.state.currentView === "home") {
      whatToRender = <AdvancedSearch onClick={this.hanndleAdvancedSearch} />
      if (this.state.admin) {
        extraRender = <Profile onAllItems={this.handleAllItems} />
      }

    }
    else if (this.state.currentView === "itemList") {
      whatToRender = <ItemGrids items={this.searchItems} onClick={this.handleThumbnailClicked} />

    }
    else if (this.state.currentView === "userItemList") {
      whatToRender = <UserItemGrids items={this.myItemInfo} onClick={this.handleRemoveItem} />

    }
    else if (this.state.currentView === "userFavouriteList") {
      whatToRender = <UserFavouriteGrids items={this.userFavourite} onClick={this.handleRemoveFavourite} />

    }
    else if (this.state.currentView === "itemView") {
      whatToRender = <Item theItem={this.itemInfo} userID={this.state.userLogedIn.userID} addFav={this.handleAddFavourite} removeFav={this.handleRemoveFavourite} />

    }
    else if (this.state.currentView === "login") {
      whatToRender = <Login onClick={this.handleGoToReg} onSumbit={this.handleLoginAuth} loginError={this.state.loginError} />

    }
    else if (this.state.currentView === "register") {
      whatToRender = <Register onClick={this.handleLoginClicked} check={this.state.checkUser} onRegister={this.handleRegestration} />

    }
    else if (this.state.currentView === "itemUpload") {
      whatToRender = <ItemUpload userID={this.state.userLogedIn.userID} onClick={this.handleUploadItem} />

    }

    return (
      <div>
        <Header onClick={this.handleLoginClicked} onHome={this.handleHomeClicked} onSearch={this.handleSearch} signedIn={this.state.signedIn} onLogoutClick={this.handleLogout} onUpload={this.handleUpload} onItems={this.handleItems} onFavourite={this.handleGetFavourite} />
        {whatToRender}
        {extraRender}
      </div>
    );
  }

}

export default App;
