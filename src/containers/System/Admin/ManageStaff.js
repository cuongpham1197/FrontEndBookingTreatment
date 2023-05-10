import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageStaff.scss';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforStaff } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to Markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listStaffs: [],
            hasOldData: false,

            //save to Staff_Infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listShop: [],
            listTreatment: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedShop: '',
            selectedTreatment: '',

            nameShop: '',
            addressShop: '',
            note: '',
            shopId: '',
            treatmentId: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllStaffs();
        this.props.getAllRequiredStaffInfor();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }

            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }

            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }

            if (type === 'TREATMENT') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }

            if (type === 'SHOP') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }

        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allStaffs !== this.props.allStaffs) {
            let dataSelect = this.buildDataInputSelect(this.props.allStaffs, 'USERS')
            this.setState({
                listStaffs: dataSelect
            })
        }


        if (prevProps.allRequiredStaffInfor !== this.props.allRequiredStaffInfor) {
            let { resPayment, resPrice, resProvince, resTreatment, resShop } = this.props.allRequiredStaffInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectTreatment = this.buildDataInputSelect(resTreatment, 'TREATMENT');
            let dataSelectShop = this.buildDataInputSelect(resShop, 'SHOP');

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listTreatment: dataSelectTreatment,
                listShop: dataSelectShop
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allStaffs, 'USERS');
            let { resPayment, resPrice, resProvince } = this.props.allRequiredStaffInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            this.setState({
                listStaffs: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;

        this.props.saveDetailStaff({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            staffId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameShop: this.state.nameShop,
            addressShop: this.state.addressShop,
            note: this.state.note,

            shopId: this.state.selectedShop && this.state.selectedShop.value ? this.state.selectedShop.value : '',
            treatmentId: this.state.selectedTreatment.value
        })
    }

    handleChangeSelect = async (selectedOption) => {//mỗi lần thay đổi Staff
        this.setState({ selectedOption });

        let { listPayment, listPrice, listProvince, listTreatment, listShop } = this.state;

        let res = await getDetailInforStaff(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let addressShop = '', nameShop = '', note = '',
                paymentId = '', priceId = '', provinceId = '', treatmentId = '', shopId = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = '',
                selectedTreatment = '', selectedShop = '';
            if (res.data.Staff_Infor) {
                addressShop = res.data.Staff_Infor.addressShop;
                nameShop = res.data.Staff_Infor.nameShop;
                note = res.data.Staff_Infor.note;
                paymentId = res.data.Staff_Infor.paymentId;
                priceId = res.data.Staff_Infor.priceId;
                provinceId = res.data.Staff_Infor.provinceId;
                treatmentId = res.data.Staff_Infor.treatmentId;
                shopId = res.data.Staff_Infor.shopId;

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })

                selectedPrice = listPrice.find(item => {
                    return item && item.value === paymentId
                })

                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })

                selectedTreatment = listTreatment.find(item => {
                    return item && item.value === treatmentId
                })

                selectedShop = listShop.find(item => {
                    return item && item.value === shopId
                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressShop: addressShop,
                nameShop: nameShop,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedTreatment: selectedTreatment,
                selectedShop: selectedShop
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressShop: '',
                nameShop: '',
                note: '',

                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedTreatment: '',
                selectedShop: ''
            })
        }
    };

    handleOnChangeSelectStaffInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }


    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() { //mỗi lần setState hàm render lại chạy lại
        let { hasOldData } = this.state;
        console.log('check state ManageStaff.js', this.state)
        return (
            <div className='manage-staff-container'>
                <div className='manage-staff-title'>
                    <FormattedMessage id="admin.manage-staff.title" />
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-staff.select-staff" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listStaffs}
                            placeholder={<FormattedMessage id="admin.manage-staff.select-staff" />}
                        />
                    </div>

                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-staff.intro" /></label>
                        <textarea className='form-control' rows="4"
                            onChange={(event) => this.handleOnChangeText(event, "description")}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>

                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-staff.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleOnChangeSelectStaffInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-staff.intro" />}
                            name="selectedPrice"
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-staff.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleOnChangeSelectStaffInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-staff.payment" />}
                            name="selectedPayment"
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-staff.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleOnChangeSelectStaffInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-staff.province" />}
                            name="selectedProvince"
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-staff.nameShop" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameShop')}
                            value={this.state.nameShop}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-staff.addressShop" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressShop')}
                            value={this.state.addressShop}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-staff.note" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-staff.treatment" /></label>
                        <Select
                            value={this.state.selectedTreatment}
                            options={this.state.listTreatment}
                            placeholder={<FormattedMessage id="admin.manage-staff.treatment" />}
                            onChange={this.handleOnChangeSelectStaffInfor}
                            name="selectedTreatment"
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-staff.select-shop" /></label>
                        <Select
                            value={this.state.selectedShop}
                            options={this.state.listShop}
                            placeholder={<FormattedMessage id="admin.manage-staff.select-shop" />}
                            onChange={this.handleOnChangeSelectStaffInfor}
                            name="selectedShop"
                        />
                    </div>
                </div>

                <div className='manage-staff-editor'>
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>

                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-staff' : 'create-content-staff'}>
                    {hasOldData === true ?
                        <span><FormattedMessage id="admin.manage-staff.save" /></span>
                        :
                        <span><FormattedMessage id="admin.manage-staff.add" /></span>}
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allStaffs: state.admin.allStaffs,
        allRequiredStaffInfor: state.admin.allRequiredStaffInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllStaffs: () => dispatch(actions.fetchAllStaffs()),
        saveDetailStaff: (data) => dispatch(actions.saveDetailStaff(data)),
        getAllRequiredStaffInfor: () => dispatch(actions.getRequiredStaffInfor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaff);
