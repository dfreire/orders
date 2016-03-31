import { State } from "./state";
import * as actions from "./actions";

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

export function app(state: State = newState, action: actions.Action): State {
    switch (action.type) {
        case actions.PUT_IN_SHOPPING_BASKET:
            return putInShoppingBasket(state, action as actions.PutInShoppingBasketAction);
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

function putInShoppingBasket(state: State, action: actions.PutInShoppingBasketAction): State {
    let found = false;

    const shoppingBasketItems = _.map(state.shoppingBasketItems, (item) => {
        if (item.sellableItemId === action.sellableItemId) {
            found = true;
            return {
                sellableItemId: item.sellableItemId,
                quantity: item.quantity + action.quantity
            };
        } else {
            return item;
        }
    });

    if (!found) {
        shoppingBasketItems.push({
            sellableItemId: action.sellableItemId,
            quantity: action.quantity
        })
    }

    return _.assign({}, state, { shoppingBasketItems: shoppingBasketItems }) as State;
}
