import { State } from "./state";
import * as actions from "./actions";

function createNewState(): State {
    return {
        user: {
            id: undefined
        },
        sellableItems: [],
        sellableItemPrices: [],
        currentOrder: {
            total: 0
        },
        currentOrderItems: []
    };
}

export function app(state: State, action: actions.Action) {
    if (typeof state === "undefined") {
        state = createNewState();
    }
    switch (action.type) {
        case actions.PUT_IN_CURRENT_ORDER:
            break;
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
