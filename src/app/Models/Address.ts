import { Contact } from '../models/Contact';
export class Address {

    addressLine1: string;
    addressLine2?: string;
    city: string;
    stateCode: string;
    zipcode: string;
    countryCode: string;
    contactRequest: Contact;
    constructor() {
        this.addressLine1 = '';
        this.addressLine2 = '';
        this.city = '';
        this.stateCode = '';
        this.zipcode = '';
        this.countryCode = 'US';
        this.contactRequest = new Contact();
    }

}