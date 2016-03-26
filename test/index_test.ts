import * as mocha from "mocha";
import { assert } from "chai";
import { spy } from "sinon";
import * as _ from "lodash";

import { ShoppingCart } from "../src/index";

suite("ShoppingCart", () => {
    let shoppingCart: ShoppingCart;
    let sellableItems: Array<any>;

    setup(() => {
        shoppingCart = new ShoppingCart();
        sellableItems = [
            { id: "redoma-2006-0.75" },
            { id: "charme-2010-0.75" },
            { id: "tiara-2014-1.5" },
            { id: "lbv-2009-0.375" }
        ];
    });

    suite("#addItem", () => {
        test("add products to the shopping cart", () => {
            shoppingCart.addItem(sellableItems[0].id, 3);
            shoppingCart.addItem(sellableItems[2].id, 2);

            const items = shoppingCart.getItems();
            assert.isArray(items);
            assert.equal(items.length, 2);

            const item1 = _(items).find((item: any) => item.id === sellableItems[0].id);
            assert.isObject(item1);
            assert.equal(item1.quantity, 3);

            const item2 = _(items).find((item: any) => item.id === sellableItems[2].id);
            assert.isObject(item2);
            assert.equal(item2.quantity, 2);
        });
    });
});
