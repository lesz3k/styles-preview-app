import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {store} from './store/store';
import {addCompName, addItemPath, changeSingleView, changeListView, logAsDesigner} from './store/actionCreators'
import './styles.css';
import ItemsList from './Views/ItemsList'
import SingleItem from './Views/SingleItem'
import StyleChangePopUp from './components/StyleChangePopUp'
import LoadingIcon from './components/LoadingIcon'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showTiles : false,
      multipleItems : true,
      singleItem : false,
      wrongPassword : false
    }
    this.hideTiles = this.hideTiles.bind(this)
    this.showMultiple = this.showMultiple.bind(this)
    this.showSingle = this.showSingle.bind(this)
    this.userLogin = this.userLogin.bind(this)
    this.changeUserType = this.changeUserType.bind(this)
  }
  getChildContext(){
    return {
      store: this.props.store
    }
  }
  componentWillReceiveProps(nextProps) {
    //this.setState({ isActive: nextProps.isActive });
  }
  componentDidMount() {
    let storage = sessionStorage.getItem("designerTemplate")

    if(storage !== null){
      store.dispatch(logAsDesigner(storage))
      this.setState({showTiles:true})
      //console.log('store state: '+ store.getState().loggedAsDesigner)
      //console.log('storage: '+storage)
    }
    //console.log('store state after: '+ store.getState().loggedAsDesigner)

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
    let {node} = this.props,
        cqSideKick = document.querySelectorAll('.cq-sidekick')[0];
    document.getElementById('overlay').classList.remove("active")
    node.classList.remove("active")
    ReactDOM.unmountComponentAtNode(node)
    cqSideKick ? cqSideKick.setAttribute("style", "visibility:visible;opacity:1;") : false
  }
  showMultiple(){
    this.setState({multipleItems:true})
    this.setState({singleItem:false})
  }
  showSingle(){
    this.setState({multipleItems:false})
    this.setState({singleItem:true})
  }
  userLogin(userType){
    let password = this.refs.editorLogin.value
    if (userType === 'designer'){
      this.setState({showTiles:true})
      store.dispatch(logAsDesigner('designer'))
      store.dispatch(changeListView({...this.props}))
      sessionStorage.setItem("designerTemplate", 'designer');
    }
    if (userType === 'editor'){
      console.log(password)
      if (password === 'edit'){
        this.setState({showTiles:true})
        store.dispatch(logAsDesigner('editor'))
        store.dispatch(changeListView({...this.props}))
        sessionStorage.setItem("designerTemplate", 'editor');
      }
      else {
        this.setState({wrongPassword:true})
      }
    }
  }
  changeUserType(){
    this.setState({showTiles:false})
  }

  render() {
    const {showTiles, multipleItems, singleItem, wrongPassword} = this.state,
          closeBtn = <div className="hide-items"><button onClick={this.hideTiles}>X</button></div>
    let userType = store.getState().loggedAsDesigner ? 'Designer' : 'Editor'

    console.log('store state in render: '+ store.getState().loggedAsDesigner)
    console.log('user type: '+userType)

    return (
        <div className="react-mainsubcontainer">
        {
          showTiles ?
          <div className="react-subcontainer">
            {closeBtn}
            {store.getState().showLoadingIcon ? <LoadingIcon /> : null}
            <div className="react-subcontainer--nav">
              <ul>
                <li className={multipleItems ? 'active' : null}><a onClick={this.showMultiple} href="#">Multiple items</a></li>
                <li className={singleItem ? 'active' : null}><a onClick={this.showSingle} href="#">Single item</a></li>
                <li className="react-subcontainer--nav-change-user-type">User type: {userType}</li>
                <li><a onClick={this.changeUserType} href="#">Change user type</a></li>
              </ul>
            </div>
            <StyleChangePopUp />
            <ItemsList {...this.props} isActive={multipleItems ? true : false} />
            <SingleItem {...this.props} isActive={singleItem ? true : false} />
          </div>
          :
          <div className="react-subcontainer--login">
            {closeBtn}
            <p className="react-subcontainer--login-title">Please select your user type</p>

            <div className="react-subcontainer--login-buttons">
                <div className="react-subcontainer--login-as-designer">
                  <p>Designer</p>
                  <button onClick={()=>this.userLogin('designer')}>Designer</button>
                </div>
                <div className="react-subcontainer--login-as-editor">
                  <p>Editor</p>
                  <input type="password" ref="editorLogin" placeholder="editor password..." />
                  <button onClick={()=>this.userLogin('editor')}>Editor</button>
                  {wrongPassword ? <p className="wrong-password">Incorrect password</p> : null}
                </div>

            </div>


          </div>

        }
      </div>

    )
  }
}

App.childContextTypes = {
  store: PropTypes.object.isRequired
}

export default App;
