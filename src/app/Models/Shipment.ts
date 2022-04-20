export class shipment{

    shipDate : string;
    estimatedDeliveryDate : string;
    pricingOption : string;
    service : string;
    declaredValue : string;
    specialServices : string;
    transactionId : string;
    packageWeight : string;
    shipmentDetailId: string;
    packageType: string;

    constructor() {
        this.shipDate = '';
        this.estimatedDeliveryDate ='';
        this.pricingOption = '';
        this.service ='';
        this.declaredValue = '0.00';
        this.specialServices ='None Specified';
        this.transactionId = '0';
        this.packageWeight ='1';
        this.shipmentDetailId = ''
        this.packageType = '';
    }

}