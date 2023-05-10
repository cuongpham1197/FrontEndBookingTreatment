import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import './Treatment.scss'
import { getAllTreatment } from '../../../services/userService';
import { withRouter } from 'react-router';


class Treatment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTreatment: []
        }
    }

    async componentDidMount() {
        let res = await getAllTreatment();
        if (res && res.errCode === 0) {
            this.setState({
                dataTreatment: res.data ? res.data : []
            })
        }
    }

    handleViewDetailTreatment = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-treatment/${item.id}`)
        }
    }

    render() {
        let { dataTreatment } = this.state;
        return (
            <div className='section-share section-treatment'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="homepage.treatment-popular" />
                        </span>
                        <button className='btn-section'>
                            <FormattedMessage id="homepage.more-infor" />
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataTreatment && dataTreatment.length > 0 &&
                                dataTreatment.map((item, index) => {
                                    return (
                                        <div
                                            className='section-customize treatment-child'
                                            key={index}
                                            onClick={() => this.handleViewDetailTreatment(item)}
                                        >
                                            <div
                                                className='bg-image section-treatment'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className='treatment-name'>{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Treatment));
