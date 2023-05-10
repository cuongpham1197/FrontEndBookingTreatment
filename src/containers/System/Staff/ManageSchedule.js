import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from 'lodash';
import { saveBulkScheduleStaff } from '../../../services/userService';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listStaffs: [],
            selectedStaff: {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllStaffs();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allStaffs !== this.props.allStaffs) {
            let dataSelect = this.buildDataInputSelect(this.props.allStaffs)
            this.setState({
                listStaffs: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedStaff: selectedOption });
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedStaff, currentDate } = this.state;
        let result = [];
        if (selectedStaff && _.isEmpty(selectedStaff)) {
            toast.error("Invalid selected Staff!");
            return;
        }

        if (!currentDate) {
            toast.error("Invalid date!");
            return;
        }

        let formattedDate = new Date(currentDate).getTime();//timestamp

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let object = {};
                    object.staffId = selectedStaff.value;
                    object.date = formattedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            } else {
                toast.error("Invalid selected time");
                return;
            }
        }

        let res = await saveBulkScheduleStaff({
            arrSchedule: result,
            staffId: selectedStaff.value,
            formattedDate: formattedDate
        })

        if (res && res.errCode === 0) {
            toast.success('Save information succeed');
        } else {
            toast.error('Save information error');
            console.log('error saveBulkScheduleStaff >>>res', res)
        }

        console.log('check saveBulkScheduleStaff: ', res)

        console.log('check result: ', result)
    }

    render() {
        console.log('check state ManageSchedule: ', this.state)
        let { rangeTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-staff" /></label>
                            <Select
                                value={this.state.selectedStaff}
                                onChange={this.handleChangeSelect}
                                options={this.state.listStaffs}
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>

                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>

                                    )
                                })
                            }
                        </div>

                        <div className="col-12">
                            <button className="btn btn-primary btn-save-schedule"
                                onClick={() => this.handleSaveSchedule()}>
                                <FormattedMessage id="manage-schedule.save" />
                            </button>

                            <button className="btn btn-warning btn-save-schedule btn-edit-schedule">
                                Sửa thông tin
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allStaffs: state.admin.allStaffs,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllStaffs: () => dispatch(actions.fetchAllStaffs()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);