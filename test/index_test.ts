import * as mocha from "mocha";
import { assert } from "chai";
import { spy } from "sinon";
import * as _ from "lodash";

import { Customer, ShoppingCart, Order } from "../src/index";
import data from "./test-data.ts";

suite("Given a Customer", () => {
    let customer: Customer;

    setup(() => {
        customer = new Customer(data.customers[0].id);
    });

    suite("the instance", () => {
        test("should exist", () => {
            assert.isObject(customer);
        });
        test("should have an id", () => {
            assert.equal(customer.id, data.customers[0].id);
        });
        test("should have a shopping cart", () => {
            assert.isObject(customer.shoppingCart);
            assert.instanceOf(customer.shoppingCart, ShoppingCart);
        });
    });

    suite("when the customer adds products to the shopping cart", () => {
        setup(() => {
            customer.shoppingCart.addItem(data.sellableItems[0].id, 3);
            customer.shoppingCart.addItem(data.sellableItems[2].id, 2);
        });

        test("then the products should be there", () => {
            assert.isArray(customer.shoppingCart.items);
            assert.equal(customer.shoppingCart.items.length, 2);

            const item1 = _(customer.shoppingCart.items).find((item: any) => item.id === data.sellableItems[0].id);
            assert.isObject(item1);
            assert.equal(item1.quantity, 3);

            const item2 = _(customer.shoppingCart.items).find((item: any) => item.id === data.sellableItems[2].id);
            assert.isObject(item2);
            assert.equal(item2.quantity, 2);
        });

        suite("when the customer checks out", () => {
            let order: Order;

            setup(() => {
                order = customer.shoppingCart.checkout();
            });

            test("then an order should be produced", () => {
                assert.isObject(order);
            });
            test("then the order should have the same customerId", () => {
                assert.equal(order.customerId, customer.shoppingCart.customerId);
            });
            test("then the order should contain the shopping cart items", () => {
                assert.isArray(order.items);
                assert.equal(order.items.length, customer.shoppingCart.items.length);
                _.each(customer.shoppingCart.items, (shoppingCartItem) => {
                    const item = _(order.items).find((item: any) => item.id === shoppingCartItem.id);
                    assert.isObject(item);
                    assert.equal(item.quantity, shoppingCartItem.quantity);
                });
            });
        });
    });
});
