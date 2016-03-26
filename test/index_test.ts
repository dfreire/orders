import * as mocha from "mocha";
import { assert } from "chai";
import { spy } from "sinon";
import * as _ from "lodash";

import { ShoppingCart, Order } from "../src/index";
import data from "./test-data.ts";

suite("Given a ShoppingCart", () => {
    let shoppingCart: ShoppingCart;

    setup(() => {
        shoppingCart = new ShoppingCart(data.customers[0].id);
    });

    suite("the instance", () => {
        test("should exist", () => {
            assert.isObject(shoppingCart);
        });
        test("should have a customerId", () => {
            assert.equal(shoppingCart.customerId, data.customers[0].id);
        });
    });

    suite("when we add products to it", () => {
        setup(() => {
            shoppingCart.addItem(data.sellableItems[0].id, 3);
            shoppingCart.addItem(data.sellableItems[2].id, 2);
        });

        test("then the products should be there", () => {
            assert.isArray(shoppingCart.items);
            assert.equal(shoppingCart.items.length, 2);

            const item1 = _(shoppingCart.items).find((item: any) => item.id === data.sellableItems[0].id);
            assert.isObject(item1);
            assert.equal(item1.quantity, 3);

            const item2 = _(shoppingCart.items).find((item: any) => item.id === data.sellableItems[2].id);
            assert.isObject(item2);
            assert.equal(item2.quantity, 2);
        });

        suite("when we checkout", () => {
            let order: Order;

            setup(() => {
                order = shoppingCart.checkout();
            });

            test("then an order should be produced", () => {
                assert.isObject(order);
            });
            test("then the order should have the same customerId", () => {
                assert.equal(order.customerId, shoppingCart.customerId);
            });
            test("then the order should contain the shopping cart items", () => {
                assert.isArray(order.items);
                assert.equal(order.items.length, shoppingCart.items.length);
                _.each(shoppingCart.items, (shoppingCartItem) => {
                    const item = _(order.items).find((item: any) => item.id === shoppingCartItem.id);
                    assert.isObject(item);
                    assert.equal(item.quantity, shoppingCartItem.quantity);
                });
            });
        });
    });
});
