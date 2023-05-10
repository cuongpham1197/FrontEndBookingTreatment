import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { connect } from 'react-redux';
import './StaffExtraInfor.scss';
import NumberFormat from 'react-number-format';
import { getExtraInforStaffById } from '../../../services/userService';
import { getScheduleStaffByDate } from '../../../services/userService';

class StaffExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: []
        }
    }

    async componentDidMount() {
        if (this.props.staffIdFromParent) {
            let res = await getExtraInforStaffById(this.props.staffIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.staffIdFromParent !== prevProps.staffIdFromParent) {
            let res = await getExtraInforStaffById(this.props.staffIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;
        console.log('StaffExtraInfor check state: ', this.state)
        return (
            <div className='staff-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id="customer.extra-infor-staff.text-address" />
                    </div>
                    <div className='name-shop'>
                        {extraInfor && extraInfor.nameShop ? extraInfor.nameShop : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressShop ? extraInfor.addressShop : ''}
                    </div>
                </div>

                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            <FormattedMessage id="customer.extra-infor-staff.price" />
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            }

                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            }
                            <span className='detail' onClick={() => this.showHideDetailInfor(true)}>
                                <FormattedMessage id="customer.extra-infor-staff.detail" />
                            </span>
                        </div>
                    }

                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>
                                <FormattedMessage id="customer.extra-infor-staff.price" />
                            </div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>
                                        <FormattedMessage id="customer.extra-infor-staff.price" />
                                    </span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                            &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfor.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }

                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                            &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfor.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        }
                                    </span>
                                </div>

                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className='payment'>
                                <FormattedMessage id="customer.extra-infor-staff.payment" />
                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
                                    ? extraInfor.paymentTypeData.valueVi : ''}

                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN
                                    ? extraInfor.paymentTypeData.valueEn : ''}
                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfor(false)}>
                                    <FormattedMessage id="customer.extra-infor-staff.hide-price" />
                                </span>
                            </div>
                        </>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffExtraInfor);