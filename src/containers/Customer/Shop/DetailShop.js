import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailShop.scss';
import StaffSchedule from "../Staff/StaffSchedule";
import StaffExtraInfor from "../Staff/StaffExtraInfor";
import ProfileStaff from "../Staff/ProfileStaff";
import { getAllDetailShopById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from "../../../utils";

class DetailShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrStaffId: [],
            dataDetailShop: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailShopById({
                id: id
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrStaffId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.StaffShop;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrStaffId.push(item.staffId)
                        })
                    }
                }

                this.setState({
                    dataDetailShop: res.data,
                    arrStaffId: arrStaffId
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { arrStaffId, dataDetailShop } = this.state;
        let { language } = this.props;
        return (
            <div className="detail-treatment-container">
                <HomeHeader />
                <div className="detail-treatment-body">
                    <div className="description-treatment">
                        {dataDetailShop && !_.isEmpty(dataDetailShop)
                            &&
                            <>
                                <div>{dataDetailShop.name}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailShop.descriptionHTML }}></div>
                            </>
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailShop);