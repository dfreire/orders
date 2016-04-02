import { Action, State } from "./types";

export const REMOVE_FROM_SHOPPING_BASKET = "REMOVE_FROM_SHOPPING_BASKET";

export interface RemoveFromShoppingBasketAction extends Action {
    sellableItemId: string;
}

export function removeFromCurrentOrder(sellableItemId: string): RemoveFromShoppingBasketAction {
    return {
        type: REMOVE_FROM_SHOPPING_BASKET,
        sellableItemId: sellableItemId
    };
}

export function onRemoveFromShoppingBasket(state: State, action: RemoveFromShoppingBasketAction): State {
    // TODO
    return null;
}
