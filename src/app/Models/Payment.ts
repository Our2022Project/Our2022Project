export class Payment {

    billTo: string;
    creditCardType: string;
    creditCardNumber: string;
    cvvNumber: string;
    expirationMonth: string;
    expirationYear: string;
    firstName: string;
    middleName: string;
    lastName: string;
    company: string;
    email: string;
    isCreditAddSameAsShipAdd: boolean;
    Verifyemail: string;
    transactionId: string;
    paymentAddressRequest = new PaymentAddressRequest();


    constructor() {
        this.billTo = '';
        this.creditCardType = '';
        this.creditCardNumber = '';
        this.cvvNumber = '';
        this.expirationMonth = '';
        this.expirationYear = '';
        this.firstName = '';
        this.middleName = '';
        this.lastName = '';
        this.company = '';
        this.email = '';
        this.isCreditAddSameAsShipAdd = true;
        this.Verifyemail = '';
        this.transactionId = '';
    }
}

export class PaymentAddressRequest {

    country: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    extension: string;


    constructor() {

        this.country = 'US';
        this.addressLine1 = '';
        this.addressLine2 = '';
        this.city = '';
        this.state = '';
        this.zipCode = '';
        this.phone = '';
        this.extension = '+1';
    }
}