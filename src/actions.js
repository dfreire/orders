const PUT_IN_CURRENT_ORDER = "PUT_IN_CURRENT_ORDER";

export function putInCurrentOrder(sellableItemId: string, quantity: number) {
    return {
        type: PUT_IN_CURRENT_ORDER,
        sellableItemId: sellableItemId,
        quantity: quantity
    };
}

export function removeFromCurrentOrder(sellableItemId: string) {
}

export function setCurrentOrderShippingAddress(shippingAddressId: string) {
}

export function setCurrentOrderBillingAddress(billingAddressId: string) {
}
