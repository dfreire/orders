import { State } from "./state";
import { Action } from "./actions";

import {ADD_TO_SHOPPING_BASKET, AddToShoppingBasketAction, onAddToShoppingBasket} from "./add-to-shopping-basket";
import {REMOVE_FROM_SHOPPING_BASKET, RemoveFromShoppingBasketAction, onRemoveFromShoppingBasket} from "./remove-from-shopping-basket";
import {SET_ORDER_BILLING_ADDRESS, SetOrderBillingAddressAction, onSetOrderBillingAddress} from "./set-order-billing-address";
import {SET_ORDER_SHIPPING_ADDRESS, SetOrderShippingAddressAction, setOrderShippingAddress} from "./set-order-shipping-address";

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
        case actions.REMOVE_FROM_CURRENT_ORDER:
            break;
        case actions.SET_CURRENT_ORDER_SHIPPING_ADDRESS:
            break;
        case actions.SET_CURRENT_ORDER_BILLING_ADDRESS:
            break;
        default:
            return state;
    }
}
