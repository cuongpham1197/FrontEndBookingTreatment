import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailTreatment.scss';
import StaffSchedule from "../Staff/StaffSchedule";
import StaffExtraInfor from "../Staff/StaffExtraInfor";
import ProfileStaff from "../Staff/ProfileStaff";
import { getAllDetailTreatmentById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from "../../../utils";

class DetailTreatment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrStaffId: [],
            dataDetailTreatment: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailTreatmentById({
                id: id,
                location: 'ALL'
            });

            let resProvince = await getAllCodeService('PROVINCE');

            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrStaffId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.StaffTreatment;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrStaffId.push(item.staffId)
                        })
                    }
                }

                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "ALL",
                        valueVi: "Toàn quốc"
                    })
                }

                this.setState({
                    dataDetailTreatment: res.data,
                    arrStaffId: arrStaffId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getAllDetailTreatmentById({
                id: id,
                location: location
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrStaffId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.StaffTreatment;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrStaffId.push(item.staffId)
                        })
                    }
                }

                this.setState({
                    dataDetailTreatment: res.data,
                    arrStaffId: arrStaffId
                })
            }
        }
    }

    render() {
        let { arrStaffId, dataDetailTreatment, listProvince } = this.state;
        let { language } = this.props;
        return (
            <div className="detail-treatment-container">
                <HomeHeader />
                <div className="detail-treatment-body">
                    <div className="description-treatment">
                        {dataDetailTreatment && !_.isEmpty(dataDetailTreatment)
                            &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailTreatment.descriptionHTML }}></div>
                        }
                    </div>

                    <div className="search-sp-staff">
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {arrStaffId && arrStaffId.length > 0 &&
                        arrStaffId.map((item, index) => {
                            return (
                                <div className="each-staff" key={index}>
                                    <div className="dt-content-left">
                                        <div className="profile-staff">
                                            <ProfileStaff
                                                staffId={item}
                                                isShowDescriptionStaff={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                    </div>

                                    <div className="dt-content-right">
                                        <div className="staff-schedule">
                                            <StaffSchedule
                                                staffIdFromParent={item}
                                            />
                                        </div>

                                        <div className="staff-extra-infor">
                                            <StaffExtraInfor
                                                staffIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailTreatment);