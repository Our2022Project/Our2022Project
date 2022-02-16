

    export interface Notification {
        severity: string;
        source: string;
        code: string;
        message: string;
        localizedMessage: string;
        messageParameters: any[];
    }

    export interface TransactionDetail {
        customerTransactionId: string;
        localization?: any;
    }

    export interface Version {
        serviceId: string;
        major: number;
        intermediate: number;
        minor: number;
    }

    export interface Name {
        type: string;
        encoding: string;
        value: string;
    }

    export interface ServiceDescription {
        serviceType: string;
        code: string;
        names: Name[];
        description: string;
        astraDescription: string;
    }

    export interface TotalBillingWeight {
        units: string;
        value: number;
    }

    export interface TotalBaseCharge {
        currency: string;
        amount: number;
    }

    export interface TotalFreightDiscounts {
        currency: string;
        amount: number;
    }

    export interface TotalNetFreight {
        currency: string;
        amount: number;
    }

    export interface TotalSurcharges {
        currency: string;
        amount: number;
    }

    export interface TotalNetFedExCharge {
        currency: string;
        amount: number;
    }

    export interface TotalTaxes {
        currency: string;
        amount: number;
    }

    export interface TotalNetCharge {
        currency: string;
        amount: number;
    }

    export interface TotalRebates {
        currency: string;
        amount: number;
    }

    export interface TotalDutiesAndTaxes {
        currency: string;
        amount: number;
    }

    export interface TotalAncillaryFeesAndTaxes {
        currency: string;
        amount: number;
    }

    export interface TotalDutiesTaxesAndFees {
        currency: string;
        amount: number;
    }

    export interface TotalNetChargeWithDutiesAndTaxes {
        currency: string;
        amount: number;
    }

    export interface Amount {
        currency: string;
        amount: number;
    }

    export interface Surcharge {
        surchargeType: string;
        level: string;
        description: string;
        amount: Amount;
    }

    export interface ShipmentRateDetail {
        rateType: string;
        rateScale: string;
        rateZone: string;
        pricingCode: string;
        ratedWeightMethod: string;
        minimumChargeType?: any;
        currencyExchangeRate?: any;
        specialRatingApplied: any[];
        dimDivisor: number;
        dimDivisorType?: any;
        fuelSurchargePercent: number;
        totalBillingWeight: TotalBillingWeight;
        totalDimWeight?: any;
        totalBaseCharge: TotalBaseCharge;
        totalFreightDiscounts: TotalFreightDiscounts;
        totalNetFreight: TotalNetFreight;
        totalSurcharges: TotalSurcharges;
        totalNetFedExCharge: TotalNetFedExCharge;
        totalTaxes: TotalTaxes;
        totalNetCharge: TotalNetCharge;
        totalRebates: TotalRebates;
        totalDutiesAndTaxes: TotalDutiesAndTaxes;
        totalAncillaryFeesAndTaxes: TotalAncillaryFeesAndTaxes;
        totalDutiesTaxesAndFees: TotalDutiesTaxesAndFees;
        totalNetChargeWithDutiesAndTaxes: TotalNetChargeWithDutiesAndTaxes;
        shipmentLegRateDetails: any[];
        freightRateDetail?: any;
        freightDiscounts: any[];
        rebates: any[];
        surcharges: Surcharge[];
        taxes: any[];
        dutiesAndTaxes: any[];
        ancillaryFeesAndTaxes: any[];
        variableHandlingCharges?: any;
        totalVariableHandlingCharges?: any;
    }

    export interface BillingWeight {
        units: string;
        value: number;
    }

    export interface BaseCharge {
        currency: string;
        amount: number;
    }

    export interface TotalFreightDiscounts2 {
        currency: string;
        amount: number;
    }

    export interface NetFreight {
        currency: string;
        amount: number;
    }

    export interface TotalSurcharges2 {
        currency: string;
        amount: number;
    }

    export interface NetFedExCharge {
        currency: string;
        amount: number;
    }

    export interface TotalTaxes2 {
        currency: string;
        amount: number;
    }

    export interface NetCharge {
        currency: string;
        amount: number;
    }

    export interface TotalRebates2 {
        currency: string;
        amount: number;
    }

    export interface Amount2 {
        currency: string;
        amount: number;
    }

    export interface Surcharge2 {
        surchargeType: string;
        level: string;
        description: string;
        amount: Amount2;
    }

    export interface PackageRateDetail {
        rateType: string;
        ratedWeightMethod: string;
        minimumChargeType?: any;
        billingWeight: BillingWeight;
        dimWeight?: any;
        oversizeWeight?: any;
        baseCharge: BaseCharge;
        totalFreightDiscounts: TotalFreightDiscounts2;
        netFreight: NetFreight;
        totalSurcharges: TotalSurcharges2;
        netFedExCharge: NetFedExCharge;
        totalTaxes: TotalTaxes2;
        netCharge: NetCharge;
        totalRebates: TotalRebates2;
        freightDiscounts: any[];
        rebates: any[];
        surcharges: Surcharge2[];
        taxes: any[];
        variableHandlingCharges?: any;
    }

    export interface RatedPackage {
        trackingIds: any[];
        groupNumber: number;
        effectiveNetDiscount?: any;
        adjustedCodCollectionAmount?: any;
        oversizeClass?: any;
        packageRateDetail: PackageRateDetail;
    }

    export interface RatedShipmentDetail {
        effectiveNetDiscount?: any;
        adjustedCodCollectionAmount?: any;
        shipmentRateDetail: ShipmentRateDetail;
        ratedPackages: RatedPackage[];
    }

    export interface RateReplyDetail {
        serviceType: string;
        serviceDescription: ServiceDescription;
        packagingType: string;
        appliedOptions: any[];
        appliedSubOptions?: any;
        deliveryStation?: any;
        deliveryDayOfWeek?: any;
        deliveryTimestamp?: any;
        commitDetails: any[];
        destinationAirportId: string;
        ineligibleForMoneyBackGuarantee: boolean;
        originServiceArea: string;
        destinationServiceArea: string;
        transitTime?: any;
        maximumTransitTime?: any;
        signatureOption: string;
        actualRateType: string;
        ratedShipmentDetails: RatedShipmentDetail[];
    }

    export interface RateReply {
        highestSeverity: string;
        notifications: Notification[];
        transactionDetail: TransactionDetail;
        version: Version;
        rateReplyDetails: RateReplyDetail[];
    }


