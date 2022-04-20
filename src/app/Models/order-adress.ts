export class OrderAdress{

    transactionId: string;
    fromName : string;
    fromCompany : string;
    fromCountry : string;
    fromAddressLine1 : string;
    fromAddressLine2 : string;
    fromZipCode : string;
    fromCity : string;
    fromState : string;
    fromPhoneNumber : string;
    fromExtension : string;
    fromEmail : string;
    recipientName : string;
    recipientCompany : string;
    recipientCountry : string;
    recipientAddressLine1 : string;
    recipientAddressLine2 : string;
    recipientZipCode : string;
    recipientCity : string;
    recipientState : string;
    recipientPhoneNumber : string;
    recipientExtension : string;
    recipientEmail : string;
    isRecipientResidentialAddress : boolean;
    
    
  
    constructor() {
        this.transactionId = '';
        this.fromName = '';
        this.fromCompany = '';
        this.fromCountry = 'US';
        this.fromAddressLine1 = '';
        this.fromAddressLine2 = '';
        this.fromZipCode = '';
        this.fromCity = '';
        this.fromState = '';
        this.fromPhoneNumber = '';
        this.fromExtension = '';
        this.fromEmail = '';
        this.recipientName = '';
        this.recipientCompany = '';
        this.recipientCountry = 'US';
        this.recipientAddressLine1 = '';
        this.recipientAddressLine2 = '';
        this.recipientZipCode = '';
        this.recipientCity = '';
        this.recipientState = '';
        this.recipientPhoneNumber = '';
        this.recipientExtension = '';
        this.recipientEmail = '';
        this.isRecipientResidentialAddress = true;
        
    }
}