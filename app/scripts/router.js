
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var CatalogComponent = require('./components/catalog.jsx').CatalogComponent;
var ShoppingCartComponent = require('./components/cart.jsx').ShoppingCartComponent;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'cart/': 'cart'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(CatalogComponent),
      document.getElementById('app')
    );
  },
  cart: function(){
    ReactDOM.render(
      React.createElement(ShoppingCartComponent),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = {
  router: router
};
