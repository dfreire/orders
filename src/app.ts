import { Action, State } from "./types";

import {ADD_TO_SHOPPING_BASKET, AddToShoppingBasketAction, onAddToShoppingBasket} from "./shopping-basket/add-to-shopping-basket";
import {REMOVE_FROM_SHOPPING_BASKET, RemoveFromShoppingBasketAction, onRemoveFromShoppingBasket} from "./shopping-basket/remove-from-shopping-basket";
import {SET_ORDER_BILLING_ADDRESS, SetOrderBillingAddressAction, onSetOrderBillingAddress} from "./checkout/set-order-billing-address";
import {SET_ORDER_SHIPPING_ADDRESS, SetOrderShippingAddressAction, onSetOrderShippingAddress} from "./checkout/set-order-shipping-address";

const newState: State = {
    session: {
        id: undefined
    },
    sellableItems: [],
    sellableItemPrices: [],
    shoppingBasketItems: [],
    // currentOrder: undefined,
    // currentOrderItems: []
};

function app(state: State = newState, action: Action): State {
    switch (action.type) {
        case ADD_TO_SHOPPING_BASKET:
            return onAddToShoppingBasket(state, action as AddToShoppingBasketAction);
        case REMOVE_FROM_SHOPPING_BASKET:
            return onRemoveFromShoppingBasket(state, action as RemoveFromShoppingBasketAction);
        case SET_ORDER_BILLING_ADDRESS:
            return onSetOrderBillingAddress(state, action as SetOrderBillingAddressAction);
        case SET_ORDER_SHIPPING_ADDRESS:
            return onSetOrderShippingAddress(state, action as SetOrderShippingAddressAction);
        default:
            return state;
    }
}

function init() {
    // load sellableItems from server
    // load sellableItemPrices from server
    // load session from local storage
    // load shoppingBasketItems from local storage
    // set initial state
}

function getItemPrice(sellableItemId: string): number {
    return null;
}
