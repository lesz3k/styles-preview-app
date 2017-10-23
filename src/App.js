import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {store} from './store/store';
import {addCompName, addItemPath, changeSingleView, changeListView} from './store/actionCreators'
import './styles.css';
import ItemsList from './Views/ItemsList'
import SingleItem from './Views/SingleItem'
import StyleChangePopUp from './components/StyleChangePopUp'
import LoadingIcon from './components/LoadingIcon'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showTiles : true,
      multipleItems : true,
      singleItem : false
    }
    this.hideTiles = this.hideTiles.bind(this)
    this.showMultiple = this.showMultiple.bind(this)
    this.showSingle = this.showSingle.bind(this)
  }
  getChildContext(){
    return {
      store: this.props.store
    }
  }
  componentWillReceiveProps(nextProps) {
    //this.setState({ isActive: nextProps.isActive });
  }
  componentWillMount(){
    this.unsubscribe = store.subscribe(
      () => this.forceUpdate()
    )

    //console.log(this.props.compName)
    store.dispatch(addCompName(this.props.compName))
    store.dispatch(addItemPath(this.props.itemPath))
    store.dispatch(changeSingleView({...this.props}))
    store.dispatch(changeListView({...this.props}))
  }
  hideTiles() {
    let {node} = this.props
    document.getElementById('overlay').classList.remove("active")
    node.classList.remove("active")
    ReactDOM.unmountComponentAtNode(node)
  }
  showMultiple(){
    this.setState({multipleItems:true})
    this.setState({singleItem:false})
  }
  showSingle(){
    this.setState({multipleItems:false})
    this.setState({singleItem:true})
  }

  render() {
    const {showTiles, multipleItems, singleItem} = this.state
    let hideItems = null
    if(showTiles){
      hideItems = <div className="hide-items"><button onClick={this.hideTiles}>X</button></div>
    }

    return (
      <div className="react-subcontainer">
        {hideItems}
        {store.getState().showLoadingIcon ? <LoadingIcon /> : null}

        <div className="react-subcontainer--nav">
          <ul>
            <li className={multipleItems ? 'active' : null}><a onClick={this.showMultiple} href="#">Multiple items</a></li>
            <li className={singleItem ? 'active' : null}><a onClick={this.showSingle} href="#">Single item</a></li>
          </ul>
        </div>
        <StyleChangePopUp />
        <ItemsList {...this.props} isActive={multipleItems ? true : false} />
        <SingleItem {...this.props} isActive={singleItem ? true : false} />


      </div>

    )
  }
}

App.childContextTypes = {
  store: PropTypes.object.isRequired
}

export default App;
