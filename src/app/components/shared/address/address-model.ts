export interface Address {
    addressId: number;
    addressTypeValueId: number;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    postalId: number;
    cityId: number;
    stateCode: string;
    countryCode: string;
    primaryInd: string;
    createDatetime: Date;
    updateDatetime: Date;
    createUserId: number;
    updateUserId: number;
}
