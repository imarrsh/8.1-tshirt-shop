var React = require('react');

var ContainerRow = require('./layouts/layouts.jsx').ContainerRow;
var NavBar = require('./layouts/layouts.jsx').NavBar;

var ShoppingCartListItem = React.createClass({
  getInitialState: function(){

    return {
      minutes: '0',
      seconds: '00',
    }
  },
  driveTimer: function(){
    var data = this.props.data;
    function getTimeRemaining(ms){
      return {
        seconds: Math.floor( (ms/1000) % 60 ),
        minutes: Math.floor( (ms/1000/60) % 60 )
      };
    }   

    this.setState({
      seconds: ('0' + getTimeRemaining(data.expire - Date.now()).seconds).slice(-2),
      minutes: (getTimeRemaining(data.expire - Date.now()).minutes)
    });
  },
  componentWillMount: function(){
    // do some checking cleanup
  },
  componentDidMount: function(){
    // we'll need something to keep track of each timer,
    // _intervalId_ for the current cart item here,
    // seems to be a convention for timers
    var intervalId = setInterval(this.driveTimer, 1000);
    this.setState({intervalId: intervalId});
  },
  componentWillUnmount: function(){
    clearInterval(this.state.intervalId);
  },
  render: function(){
    var self = this;
    var data = this.props.data
    return(
      <tr>
        <td>{data.title}</td>
        <td>{data.size}</td>
        <td>{data.qty}</td>
        <td>{this.state.minutes}:{this.state.seconds}</td>
        <td><button onClick={ function(){ self.props.userClickRemove(data) } } className="btn btn-primary">Remove</button></td>
      </tr>
    );
  }
});

var ShoppingCartList = React.createClass({
  render: function(){ 
    var self = this;
    var cartItems = this.props.cartItems.map(function(item){
      return(
        <ShoppingCartListItem 
          key={item.title} 
          data={item} 
          userClickRemove={self.props.userClickRemove}
        />
      );
    });
    
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
  getInitialState: function(){
    var cartItems = JSON.parse(localStorage.getItem('cart'));

    return {
      cartItems: cartItems
    }
  },
  componentWillMount: function(){
    // var self = this;
    // var cartItems = self.state.cartItems; // all objects in cart
    
    // var now = Date.now();
    // // hacking stuff:
    // cartItems.filter(function(item, i){
    //   if(item.expire < now){
    //     cartItems.splice(i, 1);
    //   }
    // });
    
    // localStorage.setItem('cart', JSON.stringify(cartItems) ); // update local storage
    // self.setState({ cartItems: cartItems }); // update cart state

  },
  userClickRemove: function(data){
    var cartItems = this.state.cartItems; // all objects in cart 
    // console.log(data); // data: the thing we want to remove
    // hacking stuff:
    cartItems.filter(function(item, i){
      if(item.title === data.title){
        cartItems.splice(i, 1);
        return true;
      }
    });
    
    localStorage.setItem('cart', JSON.stringify(cartItems) ); // update local storage
    this.setState({ cartItems: cartItems }); // update cart state
  },
  render: function(){
    return(
      <div className="wrapper">
        <ContainerRow>
          <NavBar />
          <ShoppingCartList 
            cartItems={this.state.cartItems}
            userClickRemove={this.userClickRemove}
          />
        </ContainerRow>
      </div>
    )
  }
});

module.exports = {
  ShoppingCartComponent: ShoppingCartComponent
}

// first stab at accessing local storage... in state method in the above
// fetch all keys from local storage - maybe overkill to have more than 1 key
// var cartItemKeys = Object.keys(localStorage); // [shirt1, shirt2, shirt3]
// // map over obj keys, parse each localStorage match
// var cartItems = cartItemKeys.map(function(item){
//   return JSON.parse(localStorage.getItem(item)); // [object, object, object]
// });