export interface Action {
    type: string;
}

export const PUT_IN_SHOPPING_BASKET = "PUT_IN_SHOPPING_BASKET";
export class PutInShoppingBasketAction implements Action {
    type: string = PUT_IN_SHOPPING_BASKET;
    sellableItemId: string;
    quantity: number;
    constructor(sellableItemId: string, quantity: number) { }
}

export const REMOVE_FROM_CURRENT_ORDER = "REMOVE_FROM_CURRENT_ORDER";

export function removeFromCurrentOrder(sellableItemId: string): Action {
    return {
        type: REMOVE_FROM_CURRENT_ORDER,
        sellableItemId: sellableItemId
    } as Action;
}

export const SET_CURRENT_ORDER_SHIPPING_ADDRESS = "SET_CURRENT_ORDER_SHIPPING_ADDRESS";

export function setCurrentOrderShippingAddress(shippingAddressId: string) {
    return {
        type: SET_CURRENT_ORDER_SHIPPING_ADDRESS,
        shippingAddressId: shippingAddressId
    } as Action;
}

export const SET_CURRENT_ORDER_BILLING_ADDRESS = "SET_CURRENT_ORDER_BILLING_ADDRESS";

export function setCurrentOrderBillingAddress(billingAddressId: string) {
    return {
        type: SET_CURRENT_ORDER_BILLING_ADDRESS,
        billingAddressId: billingAddressId
    } as Action;
}
