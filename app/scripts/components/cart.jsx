var React = require('react');

var ContainerRow = require('./layouts/layouts.jsx').ContainerRow;
var NavBar = require('./layouts/layouts.jsx').NavBar;

var ShoppingCartListItem = React.createClass({
  getInitialState: function(){
    // var time = this.props.data.expire - Date.now();
    return {
      minutes: 0,
      seconds: 0,
    }
  },
  componentWillMount: function(){
    var self = this;
    var data = this.props.data;
    
    function getTimeRemaining(ms){
      return {
        seconds: Math.floor( (ms/1000) % 60 ),
        minutes: Math.floor( (ms/1000/60) % 60 )
      };
    }   

    setInterval(function(){
      self.setState({
        seconds: ('0' + getTimeRemaining(data.expire - Date.now()).seconds).slice(-2),
        minutes: ('0' + getTimeRemaining(data.expire - Date.now()).minutes).slice(-1)
      });
    }, 1000);
  },
  componentWillUnmount: function(){
    clearInterval();
  },
  render: function(){
    var data = this.props.data
    return(
      <tr>
        <td>{data.title}</td>
        <td>{data.size}</td>
        <td>{data.qty}</td>
        <td>{this.state.minutes}:{this.state.seconds}</td>
        <td><button className="btn btn-primary">Remove</button></td>
      </tr>
    );
  }
});

var ShoppingCartList = React.createClass({
  render: function(){ 
    // fetch all keys from local storage
    var cartItemKeys = Object.keys(localStorage); // [shirt1, shirt2, shirt3]
    // map over obj keys, parse each localStorage match
    var cartItems = cartItemKeys.map(function(item){
      return JSON.parse(localStorage.getItem(item)); // [object, object, object]
    }).map(function(item){
      return(
        <ShoppingCartListItem key={item.title} data={item}/>
      );
    });
    console.log(cartItems);
    // return all this crap
    return(
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Shirt</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Expires</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems}
        </tbody>
      </table>
    );
  }
});


var ShoppingCartComponent = React.createClass({
  render: function(){
    return(
      <div className="wrapper">
        <ContainerRow>
          <NavBar />
          <ShoppingCartList />
        </ContainerRow>
      </div>
    )
  }
});

module.exports = {
  ShoppingCartComponent: ShoppingCartComponent
}
