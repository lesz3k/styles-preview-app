import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentTile from '../components/ContentTile';
import SideNav from '../components/SideNav';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import AllStylesCombined from '../components/AllStylesCombined';
import StylesDropdown from '../components/StylesDropdown';
import {store} from '../store/store';
import {changeListView} from '../store/actionCreators'


class ItemsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: this.props.isActive,
      slider: {
        slidesToShow: 4,
        slidesToScroll: 2
      }
    }
    this.onChange = this.onChange.bind(this)
    this.setSlidesToShow = this.setSlidesToShow.bind(this)
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

  onChange(arr, val){
    store.dispatch(changeListView({isEmpty:true}, arr, val))
  }
  setSlidesToShow(arr, val){
    let targetVal = val.target.value,
        slides = () => (targetVal === 'default (4)') ? 4 : targetVal

    this.setState({
      slider: {
        slidesToShow: slides(),
        slidesToScroll: this.state.slider.slidesToScroll
      }
    })
  }

  render() {
    const {isActive, slider} = this.state

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
                compName === 'contentTile' ?
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
