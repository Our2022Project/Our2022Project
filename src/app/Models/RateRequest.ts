import { Address } from "./Address";

export class RateRequest {

    fromAddress = new Address();
    toAddress = new Address();
    shipDate: any;
    declaredValue: string;
    packageWeight: string;
    service: string;
    packaging: string;
    noOfPackages: string;
    dimension?: string;

    constructor() {
        this.shipDate = '';
        this.declaredValue = '0.00';
        this.packageWeight = '';
        this.service = '';
        this.packaging = '';
        this.noOfPackages = '';
    }
}