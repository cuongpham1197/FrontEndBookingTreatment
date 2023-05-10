import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword }); //post request dùng try/catch
}

const getAllUsers = (inputId) => {
    //template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    console.log('check data from service: ', data)
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopStaffHomeService = (limit) => {
    return axios.get(`/api/top-staff-home?limit=${limit}`)
}

const getAllStaffs = () => {
    return axios.get(`/api/get-all-staffs`)
}

const saveDetailStaffService = (data) => {
    return axios.post(`/api/save-infor-staffs`, data)
}

const getDetailInforStaff = (inputId) => {
    return axios.get(`/api/get-detail-staff-by-id?id=${inputId}`)
}

const saveBulkScheduleStaff = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleStaffByDate = (staffId, date) => {
    return axios.get(`/api/get-schedule-staff-by-date?staffId=${staffId}&date=${date}`)
}

const getExtraInforStaffById = (staffId) => {
    return axios.get(`/api/get-extra-infor-staff-by-id?staffId=${staffId}`)
}

const getProfileStaffById = (staffId) => {
    return axios.get(`/api/get-profile-staff-by-id?staffId=${staffId}`)
}

const postCustomerBookAppointment = (data) => {
    return axios.post('/api/customer-book-appointment', data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}
const createNewTreatment = (data) => {
    return axios.post('/api/create-new-treatment', data)
}

const getAllTreatment = () => {
    return axios.get(`/api/get-treatment`)
}

const getAllDetailTreatmentById = (data) => {
    return axios.get(`/api/get-detail-treatment-by-id?id=${data.id}&location=${data.location}`)
}

const editTreatment = (inputData) => {
    return axios.put('/api/edit-treatment-by-id', inputData)
}

const postSendTreatmentDetail = (data) => {
    return axios.post('/api/send-treatment-detail', data)
}

const createNewShop = (data) => {
    return axios.post('/api/create-new-shop', data)
}

const getAllShop = () => {
    return axios.get('/api/get-shop')
}

const getAllDetailShopById = (data) => {
    return axios.get(`/api/get-detail-shop-by-id?id=${data.id}`)
}

const getAllCustomerForStaff = (data) => {
    return axios.get(`/api/get-list-customer-for-staff?staffId=${data.staffId}&date=${data.date}`)
}


export {
    handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService, getAllCodeService,

    getTopStaffHomeService, getAllStaffs, saveDetailStaffService, getDetailInforStaff,
    saveBulkScheduleStaff, getScheduleStaffByDate, getExtraInforStaffById, getProfileStaffById,

    postCustomerBookAppointment, postVerifyBookAppointment,

    createNewTreatment, getAllTreatment, getAllDetailTreatmentById, editTreatment,

    createNewShop, getAllShop, getAllDetailShopById, getAllCustomerForStaff, postSendTreatmentDetail
}