import React from 'react';

class StylesDropdown extends React.Component {

    onChange = (e) => {
        this.props.onChange(e);
    }
    render() {
      const {title, arr, prefix} = this.props
          return (
            <div className="reactapp--style-block">
               <p>{title}:</p>
               <div className="reactapp--style-block-dropdown">
                 <select onChange={(e) => this.onChange(e)} className="reactapp--dropdown-select">
                 {arr.map((n, i) => {
                   let newVal = n
                   prefix ? newVal = prefix+n : true
                    return <option key={i} value={newVal}>
                         {newVal}
                     </option>
                   }
                   )
                 }
                 </select>
               </div>
            </div>
          )
    }
}

export default StylesDropdown
