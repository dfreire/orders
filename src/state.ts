export interface State {
    user: User;
    // session: Session;
    // addresses: Address[];
    sellableItems: SellableItem[];
    sellableItemPrices: SellableItemPrice[];
    shoppingBasketItems: ShoppingBastetItems[];
    currentOrder: Order;
    currentOrderItems: OrderItem[];
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
