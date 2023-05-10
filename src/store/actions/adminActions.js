import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopStaffHomeService, getAllStaffs,
    saveDetailStaffService, getAllTreatment, getAllShop
} from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                console.log('getState: ', getState)
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error: ', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                console.log('getState: ', getState)
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionFailed error: ', e)
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})


export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                console.log('getState: ', getState)
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleFailed error: ', e)
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Created user successfully!")
                console.log('getState: ', getState)
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error: ', e)
        }
    }
}

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})


export const fetchAllUsersStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {

                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                toast.error("Fetch user error!")
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("Fetch all user error!")
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed error: ', e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})


export const DeleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Deleted user successfully!")
                console.log('getState: ', getState)
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Deleted user error!")
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Deleted user error!")
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error: ', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Updated user successfully!")
                console.log('getState: ', getState)
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Update user failed!")
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Update user failed!")
            dispatch(editUserFailed());
            console.log('EditUserFailed error: ', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

// let res1 = await getTopStaffHomeService(3);

export const fetchTopStaff = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopStaffHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_STAFFS_SUCCESS,
                    dataStaffs: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_STAFFS_FAILED
                })
            }
        } catch (e) {
            console.log('fetch top Staff failed; ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_STAFFS_FAILED
            })
        }
    }
}

export const fetchAllStaffs = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllStaffs();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_STAFFS_SUCCESS,
                    dataStaff: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_STAFFS_FAILED
                })
            }
        } catch (e) {
            console.log('fetch all Staffs failed; ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_STAFFS_FAILED
            })
        }
    }
}

export const saveDetailStaff = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailStaffService(data);
            if (res && res.errCode === 0) {
                toast.success('save Staff information succeed');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_STAFF_SUCCESS
                })
            } else {
                console.log('err res', res)
                toast.error('save Staff information error');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_STAFF_FAILED
                })
            }
        } catch (e) {
            toast.error('save Staff information error');
            console.log('save detail Staff failed; ', e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_STAFF_FAILED
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED; ', e);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}

export const getRequiredStaffInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_STAFF_INFOR_START })

            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resTreatment = await getAllTreatment(); //
            let resShop = await getAllShop();

            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resTreatment && resTreatment.errCode === 0
                && resShop && resShop.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resTreatment: resTreatment.data,
                    resShop: resShop.data
                }
                dispatch(fetchRequiredStaffInforSuccess(data))
            } else {
                dispatch(fetchRequiredStaffInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredStaffInforFailed());
            console.log('FETCH_REQUIRED_STAFF_INFOR_FAILED', e)
        }
    }
}

export const fetchRequiredStaffInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_STAFF_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredStaffInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_STAFF_INFOR_FAILED
})


export const fetchAllTreatmentsStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllTreatment();
            if (res && res.errCode === 0) {

                dispatch(fetchAllTreatmentsSuccess(res.treatments.reverse()))
            } else {
                toast.error("Fetch user error!")
                dispatch(fetchAllTreatmentsFailed());
            }
        } catch (e) {
            toast.error("Fetch all treatment error!")
            dispatch(fetchAllTreatmentsFailed());
            console.log('fetchAllTreatmentsFailed error: ', e)
        }
    }
}

export const fetchAllTreatmentsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_TREATMENTS_SUCCESS,
    users: data
})

export const fetchAllTreatmentsFailed = () => ({
    type: actionTypes.FETCH_ALL_TREATMENTS_FAILED
})