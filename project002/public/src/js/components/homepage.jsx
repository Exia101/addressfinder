var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var GoogleMaps = require('google-map-react');
var axios = require("axios");
var Map = require("./map.jsx");

var Homepage = React.createClass({

  getInitialState: function() {
      return {
          google: window.google,
          location: ""
      }
  },

  handleClick: function() {
    localStorage.removeItem("loggedIn");
    browserHistory.push("/login")
  },

  handleMaps: function(event) {
    event.preventDefault();
    var self = this;
    console.log("clicked");
    axios.post("/post", {
      data: {
        address: this.state.address
      }
    }).then(function(response) {
      self.setState({
        location: {
          lat: response.data.latitude,
          lng: response.data.longitude
        }
      })
    }).catch(function(error) {
      console.log(error);
    })
  },

  getAddressData: function(event) {
    this.setState({
      address: event.target.value
    })
  },

  handleRefresh: function(){
    return (
      window.location.reload()
    )
  },

  render: function(){
    var map;
    if (this.state.location) {
      map = <Map location={this.state.location}/>
    } else {
      map = <div></div>
  }
    return(
      <div>
        <div className ="logout container">
          <button type="submit" onClick={this.handleClick}>Logout</button>
        </div>
        <div className="header container z-depth-5">
          <h1>Address Finder:</h1>
        </div>
        <br />
        <br />
        <div className="form container">
          <form>
            <input type="text" placeholder="Enter your address here" name="address" onChange={this.getAddressData} />
            <button type="submit" onClick={this.handleMaps}>Submit</button>
            <button type="submit" onClick={this.handleRefresh}>Click to Search again</button>
          </form>
        </div>
        {map}
      </div>
    )
  }

})

module.exports = Homepage;
