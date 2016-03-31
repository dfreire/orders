import { State } from "./state";
import * as actions from "./actions";

const newState: State = {
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

export function app(state: State = newState, action: actions.Action): State {
    switch (action.type) {
        case actions.PUT_IN_CURRENT_ORDER:
            return putInCurrentOrder(state, action);
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

function putInCurrentOrder(state: State, action: actions.Action): State {
    let found = false;

    const currentOrderItems = _.map(state.currentOrderItems, (item) => {
        if (item.sellableItemId === action.sellableItemId) {
            found = true;
            return {
                sellableItemId: item.sellableItemId,
                quantity: item.quantity + action.quantity
            };
        }
        return item;
    });

    if (!found) {
        currentOrderItems.push({
            sellableItemId: action.sellableItemId,
            quantity: action.quantity
        })
    }

    return _.assign({}, state, { currentOrderItems: currentOrderItems }) as State;
}
