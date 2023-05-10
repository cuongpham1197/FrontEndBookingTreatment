import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
// Import css files
import './SpaFacility.scss';
import { getAllShop } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class SpaFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataShops: []
        }
    }

    async componentDidMount() {
        let res = await getAllShop();

        if (res && res.errCode === 0) {
            this.setState({
                dataShops: res.data ? res.data : []
            })
        }
    }


    handleViewDetailShop = (shop) => {
        if (this.props.history) {
            this.props.history.push(`/detail-shop/${shop.id}`)
        }
    }
    render() {
        let { dataShops } = this.state;
        return (
            <div className='section-share section-spa-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="banner.good-spa-facility" /></span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataShops && dataShops.length > 0 &&
                                dataShops.map((item, index) => {
                                    return (
                                        <div className='section-customize shop-child'
                                            key={index}
                                            onClick={() => this.handleViewDetailShop(item)}
                                        >
                                            <div className='bg-image section-spa-facility'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className='shop-name'>
                                                {item.name}
                                            </div>
                                        </div>

                                    )
                                })
                            }
                        </Slider>
                    </div>

                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpaFacility));
