import { Action, State } from "../types";

export const SET_ORDER_BILLING_ADDRESS = "SET_ORDER_BILLING_ADDRESS";

export interface SetOrderBillingAddressAction extends Action {
    billingAddressId: string;
}

export function setOrderBillingAddress(billingAddressId: string): SetOrderBillingAddressAction {
    return {
        type: SET_ORDER_BILLING_ADDRESS,
        billingAddressId: billingAddressId
    };
}

export function onSetOrderBillingAddress(state: State, action: SetOrderBillingAddressAction): State {
    // TODO
    return null;
}
