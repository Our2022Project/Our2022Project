export class Payment{
    [x: string]: any;

    billTo : string;
    creditCardType : string;
    creditCardNumber : string;
    cvvNumber : string;
    expirationMonth : string;
    expirationYear : string;
    firstName : string;
    middleName : string;
    lastName : string;
    company : string;
    email : string;
    isCreditAddSameAsShipAdd : boolean;
    Verifyemail : string;


    constructor(){

        this.billTo = '';
        this.creditCardType ='';
        this.creditCardNumber = '';
        this.cvvNumber ='';
        this.expirationMonth = '';
        this.expirationYear ='';
        this.firstName = '';
        this.middleName ='';
        this.lastName = '';
        this.company ='';
        this.email = '';
        this.isCreditAddSameAsShipAdd = true;
        this.Verifyemail = '';
    }
}

export class PaymentAddressRequest{

    country : string;
    addressLine1 : string;
    addressLine2 : string;
    city : string;
    state : string;
    zipCode : string;
    phone : string;
    extension : string;
    transactionId: string;
    

constructor(){


    this.country = 'US';
    this.addressLine1 ='';
    this.addressLine2 = '';
    this.city ='';
    this.state = '';
    this.zipCode ='';
    this.phone = '';
    this.extension ='';
    this.transactionId ='0';
    
}



}