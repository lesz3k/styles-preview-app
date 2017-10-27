import React, { Component } from 'react';


class Text extends Component {
  constructor(props) {
    super(props)
    this.state = {
      darkBg:false
    }
    this.fontColorChange = this.fontColorChange.bind(this)
  }
  fontColorChange(){
    let figBg = this.refs.figureBg,
        bgColor = window.getComputedStyle(figBg).getPropertyValue('background-color')
    //setting font color
    if (!(bgColor === 'rgba(0, 0, 0, 0)')) {
        var rgb = /rgb\((\d+), (\d+), (\d+)\)/.exec(bgColor);
        var r = rgb[1],
            g = rgb[2],
            b = rgb[3];
        //if bg is dark - set font color to white
         (r * 0.299 + g * 0.587 + b * 0.114) < 186 ? this.setState({darkBg:true}) : this.setState({darkBg:false})
    }
  }
  componentWillReceiveProps(nextProps) {
    //this.setState({ classNode: this.stylesReplace(nextProps.classNames) +' '+nextProps.classNode });
    //this.fontColorChange()
  }
  componentDidMount(){
    this.fontColorChange()
  }
  componentDidUpdate(prevProps, prevState) {
  // only update chart if the data has changed
    if (prevProps.classNames !== this.props.classNames) {
      this.fontColorChange()
    }
  }
  render(){
    //const {title, text, subtitle, img, classNode} = this.state
    const {classNames, text} = this.props

    return (
        <div className={this.state.darkBg ? ('dark-background'+' '+classNames) : classNames} ref="figureBg" dangerouslySetInnerHTML={{__html: text}}>

        </div>

    )
  }
}

export default Text;
