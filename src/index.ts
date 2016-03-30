

enum OrderStatus { PendingPayment, Payed, PendingShipping, Shipped }

interface User {
    id: string;
}

interface Address {
    id: string;
    customerId: string,
    fullName: string;
    streetLine1: string;
    streetLine2?: string;
    streetLine3?: string;
    postalCode: string;
    townOrCity: string;
}

interface BillingAddress extends Address {
    companyName: string;
    vatNumber: string;
    vatRegionId: string;
    isDefaultBillingAddress: boolean;
}

interface ShippingAddress extends Address {
    shippingRegionId: string;
    phoneNumber: string;
    isDefaultShippingAddress: boolean;
}

interface ShoppingBasket {
    customerId: string;
    items: ShoppingBasketItem[];
}

interface ShoppingBasketItem {
    id: string;
    quantity: number;
}

interface Order {
    date: Date;
    status: OrderStatus;
    customerId: string;
    // copyOfShippingAddress: ShippingAddress;
    // copyOfBillingAddress: BillingAddress;
    // copyOfShippingRate: ShippingRate;
    items: OrderItem[];
    total: number;
}



interface OrderItem {
    id: string;
    // copyOfSellableItemAccountingCode: string;
    // copyOfSellableItemVatRateIds: string[];
    // copyOfSellableItemPrice: SellableItemPrice;
    // copyOfVatRate: VatRate;
    quantity: number;
    // subTotal: number;
}

interface SellableItem {
    id: string;
    accountingCode: string;
    vatRateIds: string[];
    prices: SellableItemPrice[]
}

interface SellableItemPrice {
    value: number;
    vatRegionIds: string[];
}

function signup(email: string, pasword: string, callback: Function) {

}

function changeEmail(userId: string, password: string, newEmail: string, callback: Function) {

}

function addCustomerAddress(customerId: string, address: Address, callback: Function) {

}

function updateCustomerAddress(customerId: string, address: Address, callback: Function) {

}

function removeCustomerAddress(customerId: string, addressId: string, callback: Function) {

}

function getDefaultCustomerBillingAddress(customerId: string): BillingAddress {
    return null;
}

function getDefaultCustomerShippingAddress(customerId: string): ShippingAddress {
    return null;
}

function getShoppingBasket(): ShoppingBasket {
    return null;
}

function putItemInShoppingBasket(itemId: string, quantity: number) {

}

function removeItemFromShoppingBasket(itemId: string) {

}

function checkout(): Order {
    return null;
}

function setOrderShippingAddress(orderId: Order, shippingAddress: ShippingAddress) {

}

function setOrderBillingAddress(order: Order, billingAddress: BillingAddress) {

}

function confirmOrder(order: Order, callback: Function) {

}
