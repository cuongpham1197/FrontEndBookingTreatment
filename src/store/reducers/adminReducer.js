import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topStaffs: [],
    allStaffs: [],
    allScheduleTime: [],
    allRequiredStaffInfor: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }

        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_STAFFS_SUCCESS:
            state.topStaffs = action.dataStaffs;
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_STAFFS_FAILED:
            state.topStaffs = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_STAFFS_SUCCESS:
            state.allStaffs = action.dataStaff;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_STAFFS_FAILED:
            state.allStaffs = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state
            }

        case actionTypes.FETCH_REQUIRED_STAFF_INFOR_SUCCESS:
            state.allRequiredStaffInfor = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_REQUIRED_STAFF_INFOR_FAILED:
            state.allRequiredStaffInfor = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_TREATMENTS_SUCCESS:
            state.treatments = action.treatments;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_TREATMENTS_FAILED:
            state.treatments = [];
            return {
                ...state
            }

        default:
            return state;
    }
}

export default adminReducer;