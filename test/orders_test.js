"use strict";
var chai_1 = require("chai");
var _ = require("lodash");
var orders_1 = require("../src/orders");
describe("Given a list of products", function () {
    var products;
    beforeEach(function () {
        products = [
            { id: "redoma-2006-0.75" },
            { id: "charme-2010-0.75" },
            { id: "tiara-2014-1.5" },
            { id: "lbv-2009-0.375" }
        ];
    });
    describe("and a shopping cart", function () {
        var shoppingCart;
        beforeEach(function () {
            shoppingCart = new orders_1.ShoppingCart();
        });
        it("it should be possible to add products to the shopping cart", function (done) {
            shoppingCart.add(products[0].id, 3);
            shoppingCart.add(products[2].id, 2);
            var items = shoppingCart.getItems();
            chai_1.expect(items).to.have.length(2);
            var item1 = _(items).find(function (item) { return item.productId === products[0].id; });
            chai_1.expect(item1).to.have.property("quantity").equal(3);
            var item2 = _(items).find(function (item) { return item.productId === products[2].id; });
            chai_1.expect(item2).to.have.property("quantity").equal(2);
            done();
        });
    });
});
//# sourceMappingURL=orders_test.js.map