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
    isResidential: boolean;

    constructor() {
        this.shipDate = '';
        this.declaredValue = '';
        this.packageWeight = '';
        this.serviceType = '';
        this.packageType = '';
        this.noOfPackages = '';
        this.isResidential = false;
    }
}