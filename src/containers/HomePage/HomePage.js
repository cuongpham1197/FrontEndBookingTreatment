import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Treatment from './Section/Treatment.js';
import SpaFacility from './Section/SpaFacility';
import GoodStaff from './Section/GoodStaff';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss'
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
    // handleAfterChange = (index, dontAnimate) => {
    //     console.log('current slide: ', index)
    // }
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // slickGoTo: this.handleAfterChange
        };
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Treatment
                    settings={settings} />
                <SpaFacility
                    settings={settings} />
                <GoodStaff
                    settings={settings} />
                <About />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
