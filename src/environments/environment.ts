const Backend_Base_URL = 'http://shipping-gw-demo.us-east-1.elasticbeanstalk.com:8080';


export const environment = {

    production: false,

    login: Backend_Base_URL + '/authenticate',
    register: Backend_Base_URL + '/register',
    rate: Backend_Base_URL + '/api/rates/fetchrates',

};

