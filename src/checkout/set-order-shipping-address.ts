import { Action, State } from "../types";

export const SET_ORDER_SHIPPING_ADDRESS = "SET_ORDER_SHIPPING_ADDRESS";

export interface SetOrderShippingAddressAction extends Action {
    shippingAddressId: string;
}

export function setOrderShippingAddress(shippingAddressId: string): SetOrderShippingAddressAction {
    return {
        type: SET_ORDER_SHIPPING_ADDRESS,
        shippingAddressId: shippingAddressId
    };
}

export function onSetOrderShippingAddress(state: State, action: SetOrderShippingAddressAction): State {
    // TODO
    return null;
}
