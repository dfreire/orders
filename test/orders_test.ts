/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

import { expect } from "chai";
import * as _ from "lodash";

import { ShoppingCart } from "../src/orders";

describe("Given a list of products", () => {
    let products: any;

    beforeEach(() => {
        products = [
            { id: "redoma-2006-0.75" },
            { id: "charme-2010-0.75" },
            { id: "tiara-2014-1.5" },
            { id: "lbv-2009-0.375" }
        ];
    });

    describe("and a shopping cart", () => {
        let shoppingCart: ShoppingCart;

        beforeEach(() => {
            shoppingCart = new ShoppingCart();
        });

        it("it should be possible to add products to the shopping cart", (done) => {
            shoppingCart.add(products[0].id, 3);
            shoppingCart.add(products[2].id, 2);

            const items = shoppingCart.getItems();
            expect(items).to.have.length(2);

            const item1 = _(items).find((item) => item.productId === products[0].id);
            expect(item1).to.have.property("quantity").equal(3);

            const item2 = _(items).find((item) => item.productId === products[2].id);
            expect(item2).to.have.property("quantity").equal(2);

            done();
        });

    });
});
