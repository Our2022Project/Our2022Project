declare module Rates {

    export interface UserCredential {
        key: string;
        kassword: string;
    }

    export interface WebAuthenticationDetail {
        userCredential: UserCredential;
    }

    export interface ClientDetail {
        accountNumber: string;
        meterNumber: string;
    }

    export interface TransactionDetail {
        customerTransactionId: string;
    }

    export interface Version {
        serviceId: string;
        major: string;
        intermediate: string;
        minor: string;
    }

    export interface Address {
        city: string;
        stateOrProvinceCode: string;
        postalCode: string;
        countryCode: string;
    }

    export interface Shipper {
        address: Address;
    }

    export interface Address2 {
        city: string;
        stateOrProvinceCode: string;
        postalCode: string;
        countryCode: string;
    }

    export interface Recipient {
        address: Address2;
    }

    export interface RequestedShipment {
        shipper: Shipper;
        recipient: Recipient;
    }

    export interface RateRequest {
        webAuthenticationDetail: WebAuthenticationDetail;
        clientDetail: ClientDetail;
        transactionDetail: TransactionDetail;
        version: Version;
        requestedShipment: RequestedShipment;
    }

}

