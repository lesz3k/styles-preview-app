import React, {Component} from 'react';
import StylesDropdown from './StylesDropdown';
import stylesJSON from './compStyles/compStyles';
import {store} from '../store/store';
import PropTypes from 'prop-types';



class AllStylesCombined extends React.Component {
  onChange = (arr, e) => {
    this.props.onChange(arr, e);
  }
  render() {
    let compName = store.getState().compType
    let styles = stylesJSON[compName]

    const {exclude} = this.props
    return (
      <div className="reactapp--all-styles-combined">

        {Object.keys(styles).map( key => {
        return key != exclude ? <StylesDropdown key={key} title={key} arr={styles[key]} onChange={(e) => this.onChange(styles[key], e)}/> : false
        })}

      </div>
    )
  }
}

AllStylesCombined.propTypes = {
  store: PropTypes.object
}

export default AllStylesCombined
