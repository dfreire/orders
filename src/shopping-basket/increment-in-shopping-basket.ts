import { Action, State } from "../types";

export const INCREMENT_IN_SHOPPING_BASKET = "INCREMENT_IN_SHOPPING_BASKET";

export interface IncrementInShoppingBasketAction extends Action {
    sellableItemId: string;
    increment: number;
}

export function incrementInShoppingBasket(sellableItemId: string, increment: number): IncrementInShoppingBasketAction {
    return {
        type: INCREMENT_IN_SHOPPING_BASKET,
        sellableItemId: sellableItemId,
        increment: increment
    };
}

export function onIncrementInShoppingBasket(state: State, action: IncrementInShoppingBasketAction): State {
    const shoppingBasketItems = _.map(state.shoppingBasketItems, (item) => {
        if (item.sellableItemId === action.sellableItemId) {
            return {
                sellableItemId: item.sellableItemId,
                increment: item.quantity + action.increment
            };
        } else {
            return item;
        }
    });

    return _.assign({}, state, { shoppingBasketItems: shoppingBasketItems }) as State;
}
