interface State {
    user: User;
    session: Session;
    addresses: Address[];
    shoppingBasketItems: ShoppingBasketItem[];
    checkoutOrder: CheckoutOrder;
    checkoutOrderItems: CheckoutOrderItem[];
    sellableItems: SellableItem[];
    sellableItemPrices: SellableItemPrice[];
}
