var React = require('react');

var ContainerRow = function(props){
  return(
    <div className="container">
      <div className="row">
        {props.children}
      </div>
    </div>
  );
}

var NavBar = React.createClass({
  render: function(){
    return(
      <header>
        <ContainerRow>
          <nav>
            <ul className="nav nav-tabs">
              <li className="active"><a href="#">Shirts</a></li>
              <li><a href="#cart/">Cart</a></li>
            </ul>
          </nav>
        </ContainerRow>
      </header>
    );
  }
});

module.exports = {
  ContainerRow: ContainerRow,
  NavBar: NavBar
}