import * as mocha from "mocha";
import { assert } from "chai";
import { spy } from "sinon";
import * as _ from "lodash";

import { ShoppingCart } from "../src/index";
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
            assert.equal(shoppingCart.getCustomerId(), data.customers[0].id);
        });
    });

    suite("when we add products to it", () => {
        setup(() => {
            shoppingCart.addItem(data.sellableItems[0].id, 3);
            shoppingCart.addItem(data.sellableItems[2].id, 2);
        });

        test("the products should be there", () => {
            const items = shoppingCart.getItems();
            assert.isArray(items);
            assert.equal(items.length, 2);

            const item1 = _(items).find((item: any) => item.id === data.sellableItems[0].id);
            assert.isObject(item1);
            assert.equal(item1.quantity, 3);

            const item2 = _(items).find((item: any) => item.id === data.sellableItems[2].id);
            assert.isObject(item2);
            assert.equal(item2.quantity, 2);
        });
    });

    suite("when we checkout", () => {

    });
});
