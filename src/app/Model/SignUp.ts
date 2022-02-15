export class RegisterData {
 
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    emailId: string;
    phoneNumber: string;
    userAddressRequestList: Array<userAddressRequestList>;
    roles: Array<string>;
  Phonecode: any;

    constructor() {
        this.userName = '';
        this.password = '';
        this.firstName = '';
        this.lastName = '';
        this.emailId = '';
        this.phoneNumber = '';
        this.roles = [];
        this.userAddressRequestList = [];
    }

}

export class userAddressRequestList {

    addressLine1: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    addressType: string;

    constructor() {
        this.addressLine1 = '';
        this.city = '';
        this.state = '';
        this.zipCode = '';
        this.country = '';
        this.addressType = '';
    }

}
