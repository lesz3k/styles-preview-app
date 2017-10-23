import React, { Component } from 'react';

const TileContainer = ({ifSubtitle, title, text, img, tileLink, ifHasBookCover}) => {
  return(
      <a href={tileLink}>
        <picture>
          <img className={ifHasBookCover} src={img} />
        </picture>
        <figcaption>
          <h2>{title}</h2>
          {ifSubtitle}
          <div className="content-tile-text" dangerouslySetInnerHTML={{__html: text}} >
          </div>
        </figcaption>
      </a>
  )
}


class ContentTile extends Component {
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
    const {classNames, title, subtitle, text, img, tileLink} = this.props
    let ifSubtitle = null
    subtitle!==false ? ifSubtitle = <p className="content-tile-subtitle">{subtitle}</p> : true
    let ifHasBookCover = (classNames.indexOf("content-tile-book-box") > -1 && classNames.indexOf("content-tile-book-box-simple") == -1) ? 'book-cover' : null


    return (
        <div className={classNames}>
          <div className="content-tile-container">

            {
              tileLink ? <figure className={this.state.darkBg ? 'dark-background' : null} ref="figureBg">
                            <TileContainer ifHasBookCover={ifHasBookCover} {...this.props}/>
                          </figure>
               :
               <figure className={this.state.darkBg ? 'dark-background' : null} ref="figureBg">
                 <picture>
                   <img className={ifHasBookCover} src={img} />
                 </picture>
                 <figcaption>
                   <h2>{title}</h2>
                   {ifSubtitle}
                   <div className="content-tile-text" dangerouslySetInnerHTML={{__html: text}} >
                   </div>
                 </figcaption>
            </figure>
            }



         </div>
        </div>

    )
  }
}

export default ContentTile;
