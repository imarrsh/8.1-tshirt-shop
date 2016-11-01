var React = require('react');

var ContainerRow = require('./layouts/layouts.jsx').ContainerRow;
var NavBar = require('./layouts/layouts.jsx').NavBar;


// header
// catalog body || cart body

var CatalogListItem = React.createClass({
  getInitialState: function(){
    return {
      qty: '',
      size: ''
    };
  },
  handleQtyUpdate: function(e){
    this.setState({qty: e.target.value})
  },
  handleSizeChange: function(e){
    this.setState({size: e.target.value})
  },
  render: function(){
    var self = this;
    var product = this.props.product;
    var sizes = ['', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
    // attach state qty and size to product for form submission
    product.qty = this.state.qty;
    product.size = this.state.size;

    return(
      <div className="col-md-4">
        <figure className="product-card">
          <img src={product.img} alt={product.title} />
          <figCaption>{product.title}</figCaption>
        </figure>

        <div className="card-controls">
          <form action="" onSubmit={ function(e){ self.props.addToCart(e, product) } }>
            <input type="number" onChange={this.handleQtyUpdate} value={this.state.qty}
               name="quantity" placeholder="quantity" required 
            />
            <select name="size" id="size" onChange={this.handleSizeChange} required>
              { sizes.map(function(size){ 
                  return(
                    <option key={size} value={size}>{size}</option>
                  );
                }) 
              }
            </select>
            <input type="submit" className="btn btn-primary" value="Add to Cart" />
          </form>
        </div>

      </div>
    );
  }
})

var CatalogListing =  React.createClass({
  render: function(){
    var self = this;

    var products = this.props.products.map(function(product){
      return(
        <CatalogListItem key={product.title} product={product} addToCart={self.props.addToCart}/> 
      );
    });

    return(
      <section id="catalog">
        <ContainerRow>
          {products}
        </ContainerRow>
      </section>
    );
  }
});


var CatalogComponent = React.createClass({
  getInitialState: function(){
    var cartItems = [];

    return {
      cartItems : cartItems
    };
  },
  getDefaultProps: function(){
    var tshirts = [
      {
        title: 'Cookie Diving',
        img: 'https://d3gqasl9vmjfd8.cloudfront.net/55ed2456-7024-488b-9338-a8d1cebe8812.png',
        url: 'http://shirt.woot.com/offers/cookie-diving?ref=sh_cnt_top20_dngr_2_img'
      },
      {
        title: 'I Haz the Dumb',
        img: 'https://d3gqasl9vmjfd8.cloudfront.net/42615083-4646-41d1-9d3b-6cab523c35ef.png',
        url: 'http://shirt.woot.com/offers/i-haz-the-dumb?ref=sh_cnt_top20_13_img'
      },
      {
        title: 'Yippee ki-yay',
        img: 'https://d3gqasl9vmjfd8.cloudfront.net/0b6b31b0-e6a9-4366-8ee5-c8d450680b49.png',
        url: 'http://shirt.woot.com/offers/yippee-ki-yay-2?ref=sh_cnt_top20_14_img'
      },
    ]

    return {
      tshirts: tshirts
    }; 
  },
  addToCart: function(e, product){
    e.preventDefault();
    product.time = Date.now();
    product.expire = product.time + ((60*1000)*10);
    
    var cartItems = this.state.cartItems;
    cartItems.push(product);

    this.setState({cartItems: cartItems});
    localStorage.setItem('cart', JSON.stringify(cartItems) );
  },
  render: function(){
    return(
      <div className="wrapper">
        <NavBar />
        <CatalogListing products={this.props.tshirts} addToCart={this.addToCart}/>
      </div>
    );
  }
});

module.exports = {
  CatalogComponent: CatalogComponent
}
