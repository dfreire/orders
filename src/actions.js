const PUT_IN_CURRENT_ORDER = "PUT_IN_CURRENT_ORDER";

export function putInCurrentOrder(sellableItemId: string, quantity: number) {
    return {
        type: PUT_IN_CURRENT_ORDER,
        sellableItemId: sellableItemId,
        quantity: quantity
    };
}

const REMOVE_FROM_CURRENT_ORDER = "REMOVE_FROM_CURRENT_ORDER";

export function removeFromCurrentOrder(sellableItemId: string) {
    return {
        type: REMOVE_FROM_CURRENT_ORDER,
        sellableItemId: sellableItemId
    };
}

const SET_CURRENT_ORDER_SHIPPING_ADDRESS = "SET_CURRENT_ORDER_SHIPPING_ADDRESS";

export function setCurrentOrderShippingAddress(shippingAddressId: string) {
    return {
        type: SET_CURRENT_ORDER_SHIPPING_ADDRESS,
        shippingAddressId: shippingAddressId
    };
}

const SET_CURRENT_ORDER_BILLING_ADDRESS = "SET_CURRENT_ORDER_BILLING_ADDRESS";

export function setCurrentOrderBillingAddress(billingAddressId: string) {
    return {
        type: SET_CURRENT_ORDER_BILLING_ADDRESS,
        billingAddressId: billingAddressId
    };
}
