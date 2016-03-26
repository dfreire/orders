import * as mocha from "mocha";
import { assert } from "chai";
import { spy } from "sinon";
import * as _ from "lodash";

import { ShoppingCart } from "../src/index";
import data from "./test-data.ts";

suite("ShoppingCart", () => {
    let shoppingCart: ShoppingCart;

    setup(() => {
        shoppingCart = new ShoppingCart();
    });

    suite("#addItem", () => {
        test("add products to the shopping cart", () => {
            shoppingCart.addItem(data.sellableItems[0].id, 3);
            shoppingCart.addItem(data.sellableItems[2].id, 2);

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
});
