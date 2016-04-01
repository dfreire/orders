import { State } from "./state";
import { Action } from "./actions";

import {ADD_TO_SHOPPING_BASKET, AddToShoppingBasketAction, onAddToShoppingBasket} from "./add-to-shopping-basket";
import {REMOVE_FROM_SHOPPING_BASKET, RemoveFromShoppingBasketAction, onRemoveFromShoppingBasket} from "./remove-from-shopping-basket";
import {SET_ORDER_BILLING_ADDRESS, SetOrderBillingAddressAction, onSetOrderBillingAddress} from "./set-order-billing-address";
import {SET_ORDER_SHIPPING_ADDRESS, SetOrderShippingAddressAction, onSetOrderShippingAddress} from "./set-order-shipping-address";

const newState: State = {
    user: {
        id: undefined
    },
    sellableItems: [],
    sellableItemPrices: [],
    shoppingBasketItems: [],
    currentOrder: undefined,
    currentOrderItems: []
};

export function app(state: State = newState, action: Action): State {
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
