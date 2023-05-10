import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './ManageCustomer.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllCustomerForStaff, postSendTreatmentDetail } from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import TreatmentDetailModal from './TreatmentDetailModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManageCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataCustomer: [],
            isOpenTreatmentDetailModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {
        this.getDataCustomer()
    }

    getDataCustomer = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();

        let res = await getAllCustomerForStaff({
            staffId: user.id,
            date: formattedDate
        })

        if (res && res.errCode === 0) {
            this.setState({
                dataCustomer: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataCustomer()
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            staffId: item.staffId,
            customerId: item.customerId,
            email: item.customerData.email,
            timeType: item.timeType,
            customerName: item.customerData.firstName
        }

        this.setState({
            isOpenTreatmentDetailModal: true,
            dataModal: data
        })
    }

    closeTreatmentDetailModal = () => {
        this.setState({
            isOpenTreatmentDetailModal: false,
            dataModal: {}
        })
    }

    sendTreatmentDetail = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })

        let res = await postSendTreatmentDetail({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            staffId: dataModal.staffId,
            customerId: dataModal.customerId,
            timeType: dataModal.timeType,
            language: this.props.language,
            customerName: dataModal.customerName
        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send TreatmentDetail successfully');
            this.closeTreatmentDetailModal();
            await this.getDataCustomer();
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Send TreatmentDetail error')
            console.log('error send TreatmentDetail, ', res)
        }
    }

    render() {
        let { dataCustomer, isOpenTreatmentDetailModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className="manage-customer-container">
                        <div className="m-p-title">
                            Quản lý lịch hẹn khách hàng
                        </div>
                        <div className="manage-customer-body row">
                            <div className="col-4 form-group">
                                <label>Chọn ngày hẹn khách hàng</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>

                            <div className="col-12 table-manage-customer">
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ và tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Giới tính</th>
                                            <th>Actions</th>
                                        </tr>
                                        {dataCustomer && dataCustomer.length > 0 ?
                                            dataCustomer.map((item, index) => {
                                                let time = language === LANGUAGES.VI ?
                                                    item.timeTypeDataCustomer.valueVi : item.timeTypeDataCustomer.valueEn;
                                                let gender = language === LANGUAGES.VI ?
                                                    item.customerData.genderData.valueVi : item.customerData.genderData.valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.customerData.firstName}</td>
                                                        <td>{item.customerData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button className="mp-btn-confirm"
                                                                onClick={() => this.handleBtnConfirm(item)}>
                                                                Xác nhận
                                                            </button>

                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: "center" }}>No data</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <TreatmentDetailModal
                        isOpenModal={isOpenTreatmentDetailModal}
                        dataModal={dataModal}
                        closeTreatmentDetailModal={this.closeTreatmentDetailModal}
                        sendTreatmentDetail={this.sendTreatmentDetail}
                    />
                </LoadingOverlay>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomer);