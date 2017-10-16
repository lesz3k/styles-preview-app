import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ContentTile from '../components/ContentTile';
import stylesJSON from '../components/styles';
import AllStylesCombined from '../components/AllStylesCombined';
import StylesDropdown from '../components/StylesDropdown';
import SideNav from '../components/SideNav';
import PropTypes from 'prop-types';
import {store} from '../store/store';
import {changeStyle, addComponents, addCompName, changeSingleView} from '../store/actionCreators'


class SingleItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classNames : [...this.props.classNames],
      layout:null,
      isActive: this.props.isActive
    }
    this.onChange = this.onChange.bind(this)
    this.stylesReplace = this.stylesReplace.bind(this)
  }
  getChildContext(){
    return {
      store: this.props.store
    }
  }
  stylesReplace(oldArr){
    let classNameArr = [...this.state.classNames]
    const newArr = classNameArr.reduce((total, amount) => {
      if (!oldArr.includes(amount)){
        total.push(amount)
      }
      return total;
    }, []);
    return newArr
  }
  onChange(arr, val){
    const item = val.target.value
    let newArr = this.stylesReplace(arr)
    newArr.push(item)
    this.setState({classNames:newArr})

    store.dispatch(changeSingleView({isEmpty:true}, arr, val))

  }
  componentWillReceiveProps(nextProps) {
    this.setState({ isActive: nextProps.isActive });
  }
  render() {
    const initialView = store.getState().singleView
    const {layout, isActive} = this.state
    const classNames =  [...initialView.classNames].join(' ')

    console.log()

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
            <ContentTile {...initialView} classNames={classNames}  />
          </div>

      </div>
    );
  }
}

SingleItem.childContextTypes = {
  store: PropTypes.object.isRequired
}

export default SingleItem;
