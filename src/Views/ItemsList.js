import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ContentTile from '../components/ContentTile';
import SideNav from '../components/SideNav';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import stylesJSON from '../components/compStyles/compStyles';
import AllStylesCombined from '../components/AllStylesCombined';
import StylesDropdown from '../components/StylesDropdown';
import {store} from '../store/store';
import {changeStyle, addComponents, addCompName, changeSingleView, changeListView} from '../store/actionCreators'


//let styles = stylesJSON.contentTile.Layout


class ItemsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classNames : [...this.props.classNames],
      originalStyles: [...this.props.classNames],
      isActive: this.props.isActive,
      slider: {
        slidesToShow: 4,
        slidesToScroll: 2
      }
    }

    this.setNewStyles = this.setNewStyles.bind(this)
    this.onChange = this.onChange.bind(this)
    this.stylesReplace = this.stylesReplace.bind(this)
    this.setSlidesToShow = this.setSlidesToShow.bind(this)
    this.setSlidesToScroll = this.setSlidesToScroll.bind(this)
    this.resetStyles = this.resetStyles.bind(this)
  }

  setNewStyles(newArr){
    this.setState({classNames:newArr})
  }
  componentWillMount(){
    this.unsubscribe = store.subscribe(
      () => this.forceUpdate()
    )


  }
  componentWillReceiveProps(nextProps) {
    this.setState({ isActive: nextProps.isActive })
    setTimeout(() => { this.refs.slick.innerSlider.onWindowResized() }, 0);
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
    //this.setState({classNames:newArr})

    store.dispatch(changeListView({isEmpty:true}, arr, val))
  }
  setSlidesToShow(arr, val){
    let item = val.target.value
    item == 'default (4)' ? item = 4 : true
    this.setState({
      slider: {
        slidesToShow: item,
        slidesToScroll: this.state.slider.slidesToScroll
      }
    })
  }
  setSlidesToScroll(arr, val){
    let item = val.target.value
    item == 'default (2)' ? item = 2 : true
    this.setState({
        slider: {
          slidesToShow: this.state.slider.slidesToShow,
          slidesToScroll: item
      }
    })
  }
  resetStyles(){
    this.setState({classNames:this.state.originalStyles})
  }

  render() {
    const {showTiles, classNames, isActive, slider} = this.state

    const showList = isActive ? "react-subcontainer--multiple-items active" : "react-subcontainer--multiple-items"

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 200,
        rtl: true,
        slidesToShow: slider.slidesToShow,
        slidesToScroll: slider.slidesToScroll
    }
    const slidesToShowArr = ['default (4)',2,3,4,5,6,7,8]
    const slidesToScrollArr = ['default (2)',1,2,3,4,5,6,7]
    let compName = store.getState().compType,
        itemsList = store.getState().listView



    return (
      <div className={showList}>
          <SideNav>
            <AllStylesCombined onChange={this.onChange} exclude="Layout" />
          </SideNav>

          <div className="slider-options">
            <StylesDropdown title="Slides to show" arr={slidesToShowArr} onChange={(e) => this.setSlidesToShow(slidesToShowArr, e)} />
          </div>

          <div className="items-showcase">

            <Slider ref="slick" {...sliderSettings}>

              {
                compName == 'contentTile' ?
                itemsList.map((item, i)=>
                      <div key={i}>
                        <div className="styles-description">
                          <h4>Style name:</h4><p className="style-name">{item.styleName}</p>
                        </div>
                        <ContentTile {...item.component} classNames={item.component.classNames.join(' ')} key={i} />
                      </div>
                  )
                  : null
              }



            </Slider>
          </div>
      </div>
    );
  }
}

ItemsList.propTypes = {
  store: PropTypes.object
}

export default ItemsList;
