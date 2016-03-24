"use strict";
var ShoppingCart = (function () {
    function ShoppingCart() {
        this.items = [];
    }
    ShoppingCart.prototype.add = function (productId, quantity) {
        this.items.push({ productId: productId, quantity: quantity });
    };
    ShoppingCart.prototype.getItems = function () {
        return this.items;
    };
    return ShoppingCart;
}());
exports.ShoppingCart = ShoppingCart;
//# sourceMappingURL=orders.js.map