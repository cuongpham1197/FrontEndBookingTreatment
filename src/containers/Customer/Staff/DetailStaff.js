import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailStaff.scss';
import { getDetailInforStaff } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import StaffSchedule from './StaffSchedule';
import StaffExtraInfor from './StaffExtraInfor';

class DetailStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailStaff: {},
            currentStaffId: -1
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentStaffId: id
            })

            let res = await getDetailInforStaff(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailStaff: res.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() { //mỗi lần setState hàm render lại chạy lại
        console.log('check state detailStaff:', this.state)
        let { language } = this.props;
        let { detailStaff } = this.state;
        let nameVi = '', nameEn = '';
        if (detailStaff && detailStaff.positionData) {
            nameVi = `${detailStaff.positionData.valueVi}, ${detailStaff.lastName} ${detailStaff.firstName}`;
            nameEn = `${detailStaff.positionData.valueEn}, ${detailStaff.firstName} ${detailStaff.lastName}`;
        }
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='staff-detail-container'>
                    <div className='intro-staff'>
                        <div
                            className='content-left'
                            style={{ backgroundImage: `url(${detailStaff && detailStaff.image ? detailStaff.image : ''})` }}>
                        </div>

                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailStaff && detailStaff.Markdown
                                    && detailStaff.Markdown.description
                                    &&
                                    <span>
                                        {detailStaff.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='schedule-staff'>
                        <div className='content-left'>
                            <StaffSchedule
                                staffIdFromParent={this.state.currentStaffId}
                            />
                        </div>
                        <div className='content-right'>
                            <StaffExtraInfor
                                staffIdFromParent={this.state.currentStaffId} />
                        </div>
                    </div>

                    <div className='detail-infor-staff'>
                        {detailStaff && detailStaff.Markdown && detailStaff.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: detailStaff.Markdown.contentHTML }}>

                            </div>
                        }
                    </div>

                    <div className='comment-staff'>

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailStaff);
