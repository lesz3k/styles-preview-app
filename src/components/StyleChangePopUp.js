import React from 'react';
import {store} from '../store/store';
import PropTypes from 'prop-types';
import {setAEMresponse} from '../store/actionCreators'

class StyleChangePopUp extends React.Component {
    componentWillUnmount() {
      store.dispatch(setAEMresponse('reset'))
    }
    onChange = () => {
        //this.props.onChange(e);
    }
    render() {
      let succcess = store.getState().styleChangeAEMresponse.succcess,
          error = store.getState().styleChangeAEMresponse.error
          return (

            <div className={succcess ? "reactapp--aem-response-pop-up active" : error ? "reactapp--aem-response-pop-up active" : "reactapp--aem-response-pop-up"}>
              <div className="reactapp--aem-response-pop-up-container">
                <div className="reactapp--aem-response-pop-up--close"><button onClick={() => store.dispatch(setAEMresponse('reset'))}>X</button></div>
                  {
                    succcess ?
                    <div><p>Setting new styles successfull.</p> <p>Please refresh the page to see the final result.</p> </div>
                    :
                    <p>Error setting new styles</p>
                  }
                  <p><a href="#" onClick={() => store.dispatch(setAEMresponse('reset'))}>Dismiss</a> </p>
                </div>
              </div>

        )
    }
}

StyleChangePopUp.propTypes = {
  store: PropTypes.object
}

export default StyleChangePopUp
