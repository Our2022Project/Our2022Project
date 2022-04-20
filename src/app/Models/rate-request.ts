import { Address } from "./Address";

export class RateRequest {

    fromAddress = new Address();
    toAddress = new Address();
    shipDate: any;
    declaredValue: string;
    packageWeight: string;
    serviceType: string;
    packageType: string;
    noOfPackages: string;
    dimension?: string;

    constructor() {
        this.shipDate = '';
        this.declaredValue = '0.00';
        this.packageWeight = '';
        this.serviceType = '';
        this.packageType = '';
        this.noOfPackages = '';
    }
}