interface User {
    id: string;
    basket: ShoppingBasket;
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

interface UserEndpoint {
}

class UserEndpointJQuery implements UserEndpoint {
}

interface OrderEndpoint {
}

class OrderEndpointJQuery implements OrderEndpoint {
}

class User {
    constructor(userEndpoint: UserEndpoint) {
    }
    signup() {
    }
    signin() {
    }
    resetPassword() {
    }
    signout() {
    }
    changeEmail() {
    }
    changePassword() {
    }
    updateProfile() {
    }
    addAddress(address: Address) {
    }
    removeAddress(addressId: string) {
    }
    getDefaultBillingAddress(): BillingAddress {
        return null;
    }
    getDefaultShippingAddress(): BillingAddress {
        return null;
    }
    getShoppingBasket(): ShoppingBasket {
        return null;
    }
}

class ShoppingBasket {
    putItem(itemId: string, quantity: number) {
    }
    removeItem(itemId: string, quantity: number) {
    }
    checkout(): Order {
        return null;
    }
}
class Order {
    constructor(orderEndpoint: OrderEndpoint) {
    }
    setShippingAddress(shippingAddress: ShippingAddress) {
    }
    setBillingAddress(billingAddress: BillingAddress) {
    }
    confirm() {
    }
}

function setup() {
    const userEndpoint = new UserEndpointJQuery();
    const user = new User(userEndpoint);
    const orderEndpoint = new OrderEndpointJQuery();
}
