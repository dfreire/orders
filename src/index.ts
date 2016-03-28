interface Customer {
    id: string;
    basket: Basket;
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

interface Basket {
    customerId: string;
    items: BasketItem[];
}

interface BasketItem {
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

enum OrderStatus { PendingPayment, Payed, PendingShipping, Shipped }

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

function addCustomerAddress(address: Address) {
    // TODO
}

function removeCustomerAddress(addressId: string) {
    // TODO
}

function getDefaultCustomerBillingAddress(): BillingAddress {
    // TODO
    return null;
}

function getDefaultCustomerShippingAddress(): ShippingAddress {
    // TODO
    return null;
}

function getCustomerBillingAddresses(): BillingAddress[] {
    // TODO
    return null
}

function getCustomerShippingAddresses(): ShippingAddress[] {
    // TODO
    return null
}

function putInBasket(itemId: string, quantity: number) {
    // TODO
}

function removeFromBasket(itemId: string, quantity: number) {
    // TODO
}

function checkout(): Order {
    // TODO
    return null;
}

function setOrderShippingAddress(shippingAddress: ShippingAddress) {
    // TODO
}

function setOrderBillingAddress(billingAddress: BillingAddress) {
    // TODO
}

function confirmCheckout() {
    // TODO
}
