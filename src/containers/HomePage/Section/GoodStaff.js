import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class GoodStaff extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrStaffs: []
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topStaffsRedux !== this.props.topStaffsRedux) {
            this.setState({
                arrStaffs: this.props.topStaffsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopStaffs();
    }

    handleViewDetailStaff = (Staff) => {
        console.log('view infor: ', Staff)
        if (this.props.history) {
            this.props.history.push(`/detail-staff/${Staff.id}`)
        }
    }

    render() {


        let arrStaffs = this.state.arrStaffs;
        let { language } = this.props;
        // arrStaffs = arrStaffs.concat(arrStaffs).concat(arrStaffs);
        console.log('channel: ', arrStaffs);
        return (
            <div className='section-share section-good-staff'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="homepage.good-staff" />
                        </span>
                        <button className='btn-section'>
                            <FormattedMessage id="homepage.more-infor" />
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrStaffs && arrStaffs.length > 0 &&
                                arrStaffs.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailStaff(item)}>
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-good-staff'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    />
                                                </div>

                                                <div className='position text-center'>
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Trị tàn nhang</div>
                                                </div>
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
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topStaffsRedux: state.admin.topStaffs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopStaffs: () => dispatch(actions.fetchTopStaff())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoodStaff));
