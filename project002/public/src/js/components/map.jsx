var React = require('react');
var GoogleMaps = require('google-map-react');

var Map = React.createClass({

    getInitialState: function() {
        return {
            google: window.google,
            location: this.props.location
        }
    },

    componentDidMount: function() {
        var self = this;
        if (this.state.location) {
          var location = this.state.location;
        } else {
          var location = {lat: -25.363, lng: 131.044};
        }
        console.log(map);
        var map = new self.state.google.maps.Map(document.getElementById('map'),
        {
          zoom: 4,
          center: location
        });
        var marker = new this.state.google.maps.Marker({
          position: location,
          map: map
        });
    },

      render: function() {
        return (
          <div id="map"></div>
        )
    }
});

module.exports = Map;
