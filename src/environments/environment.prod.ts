const Backend_Base_URL = 'http://shipping-gw-demo.us-east-1.elasticbeanstalk.com:8080';


export const environment = {

    production: true,

    login: Backend_Base_URL + '/authenticate',
    register: Backend_Base_URL + '/register',
    forgotPassword: Backend_Base_URL + '/forgot-password',
    rate: Backend_Base_URL + '/api/rates/fetchrates',

};

