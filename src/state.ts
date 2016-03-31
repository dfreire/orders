export interface State {
    user: User;
    // session: Session;
    // addresses: Address[];
    sellableItems: SellableItem[];
    sellableItemPrices: SellableItemPrice[];
    currentOrder: CurrentOrder;
    currentOrderItems: CurrentOrderItem[];
}

interface User {
    id: string;
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

interface CurrentOrder {
    total: number;
}

interface CurrentOrderItem {
    sellableItemId: string;
    sellableItemPriceId: string;
    quantity: number;
    subTotal: number;
}
