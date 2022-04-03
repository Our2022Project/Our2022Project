const Backend_Base_URL = 'http://ec2-52-2-35-11.compute-1.amazonaws.com:8080';


export const environment = {

    production: true,

    login: Backend_Base_URL + '/authenticate',
    register: Backend_Base_URL + '/register',
    forgotPassword: Backend_Base_URL + '/forgot-password',
    rate: Backend_Base_URL + '/api/rates/fetchrates',
    addressDetalis: Backend_Base_URL + '/transaction',
    activateUser: Backend_Base_URL + '/activate-user',
    resetPassword: Backend_Base_URL + '/reset-password',
    payment: Backend_Base_URL +'/payment',
    shipment: Backend_Base_URL + '/shipment',
};

