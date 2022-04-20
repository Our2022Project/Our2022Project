import { Address } from "./Address";

export class CommonAddressRequest {
    fromAddress: Address;
    toAddress: Address;
    shipDate: any;
    declaredValue: string;
    packageWeight: string;
    packageType: string;
    dropoffType: string;
    serviceType: string;

    constructor() {
        this.fromAddress = new Address();
        this.toAddress = new Address();
        this.shipDate = '';
        this.declaredValue = '';
        this.packageWeight = '';
        this.packageType = '';
        this.dropoffType = '';
        this.serviceType = '';
    }
}