import React, { Component } from 'react';

class SideNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeNav: false
    }
    this.showNav = this.showNav.bind(this)
  }
  showNav(){
    this.state.activeNav ? this.setState({activeNav:false}) :  this.setState({activeNav:true})
  }

  render(){
    const {newStyles, activeNav} = this.state

    return (
        <div className={activeNav ? "reactapp-side-nav side-nav-active" : "reactapp-side-nav side-nav-closed"}>
        <div className="reactapp-side-nav--container">
           <div className="reactapp-side-nav--btn">
              <button title="More styles" onClick={this.showNav}><i className="fa fa-bars"></i> </button>
           </div>
           <p className="reactapp-side-nav--title"> Other styles: </p>
           <div className="reactapp-side-nav--blocks">
              {this.props.children}

           </div>

         </div>
        </div>

    )
  }
}

export default SideNav;
