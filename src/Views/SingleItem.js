import React, { Component } from 'react';
import ContentTile from '../components/ContentTile';
import AllStylesCombined from '../components/AllStylesCombined';
import SideNav from '../components/SideNav';
import PropTypes from 'prop-types';
import {store} from '../store/store';
import {changeSingleView, setNewAEMstyle} from '../store/actionCreators'


class SingleItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: this.props.isActive
    }
    this.onChange = this.onChange.bind(this)
    this.setAEMstyles = this.setAEMstyles.bind(this)
  }
  getChildContext(){
    return {
      store: this.props.store
    }
  }
  onChange(arr, val){
    store.dispatch(changeSingleView({isEmpty:true}, arr, val))
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ isActive: nextProps.isActive });
  }
  setAEMstyles(classNames){
    store.dispatch(setNewAEMstyle(classNames))
  }
  render() {
    const initialView = store.getState().singleView
    const itemPath = store.getState().itemPath
    const classNames = initialView.classNames.join(' ')
    const {isActive} = this.state

    const showList = isActive ? "react-subcontainer--single-item active" : "react-subcontainer--single-item"

    return (
      <div className={showList}>
        <SideNav>
          <AllStylesCombined onChange={this.onChange} />
        </SideNav>
          <div className="react-subcontainer--single-item-dropdowns">
            <p>Click the menu icon to start </p>

          </div>
          <div className="react-subcontainer--single-item-result">
            {itemPath !== null ? <button className="react-app--set-new-style" onClick={()=>store.dispatch(setNewAEMstyle(classNames))}>Set new component style +</button> : null}

            <ContentTile {...initialView} classNames={classNames} />
          </div>

      </div>
    );
  }
}

SingleItem.childContextTypes = {
  store: PropTypes.object.isRequired
}

export default SingleItem;
