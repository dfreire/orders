export interface Action {
    type: string;
}

export interface State {
    // user: User;
    session: Session; // persisted to disk
    // addresses: Address[];
    sellableItems: SellableItem[];
    sellableItemPrices: SellableItemPrice[];
    shoppingBasketItems: ShoppingBastetItems[]; // persisted to disk
    // currentOrder: Order;
    // currentOrderItems: OrderItem[];
}

interface User {
    id: string;
    email: string;
}

interface Session {
    id: string;
}

interface Address {
    id: string;
    userId: string,
    fullName: string;
    companyName: string;
    streetLine1: string;
    streetLine2?: string;
    streetLine3?: string;
    postalCode: string;
    townOrCity: string;
    isDefaultBillingAddress: boolean;
    vatRegionId: string;
    vatNumber: string;
    isDefaultShippingAddress: boolean;
    shippingRegionId: string;
    phoneNumber: string;
}

interface SellableItem {
    id: string;
    // vatRateIds: string[]; // TODO
}

interface SellableItemPrice {
    sellableItemId: string;
    price: number;
    // vatRegionIds: string[]; // TODO
    // defaultRegionId: string; // TODO
}

interface ShoppingBastetItems {
    sellableItemId: string;
    quantity: number;
}

interface Order {
    total: number;
    items: OrderItem[]
}

interface OrderItem {
    copyOfSellableItem: SellableItem;
    copyOfSellableItemPrice: SellableItemPrice;
    quantity: number;
    subTotal: number;
}
