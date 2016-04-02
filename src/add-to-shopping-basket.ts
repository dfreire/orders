import { Action, State } from "./types";

export const ADD_TO_SHOPPING_BASKET = "ADD_TO_SHOPPING_BASKET";

export interface AddToShoppingBasketAction extends Action {
    sellableItemId: string;
    quantity: number;
}

export function addToShoppingBasket(sellableItemId: string, quantity: number): AddToShoppingBasketAction {
    return {
        type: ADD_TO_SHOPPING_BASKET,
        sellableItemId: sellableItemId,
        quantity: quantity
    };
}

export function onAddToShoppingBasket(state: State, action: AddToShoppingBasketAction): State {
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
