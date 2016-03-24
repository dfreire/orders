var model;
(function (model) {
    var products = [
        {
            id: "redoma-2013-075",
            accountingCode: "001",
            vatRateIds: ["pt-iva-23"],
            prices: [
                { value: 45, vatRegionIds: ["es"] },
                { value: 35.25, vatRegionIds: ["pt"] }
            ]
        },
        {
            id: "charme-2010-075",
            accountingCode: "002",
            vatRateIds: ["pt-iva-23"],
            prices: [
                { value: 55, vatRegionIds: ["pt"] }
            ]
        }
    ];
    var vatRegions = [
        { id: "pt", name: "Portugal" }
    ];
    var vatRates = [
        { id: "pt-iva-13", percentValue: 0.13, vatRegionId: "pt" },
        { id: "pt-iva-23", percentValue: 0.23, vatRegionId: "pt" }
    ];
    var shippingRegions = [
        { id: "pt-all", name: "Portugal Continental" }
    ];
    var ShippingRateStrategy;
    (function (ShippingRateStrategy) {
        ShippingRateStrategy[ShippingRateStrategy["ChooseLowerCost"] = 0] = "ChooseLowerCost";
        ShippingRateStrategy[ShippingRateStrategy["ChooseHigherCost"] = 1] = "ChooseHigherCost";
    })(ShippingRateStrategy || (ShippingRateStrategy = {}));
    ;
    var shippingRates = [{
            id: "shipping-rate-pt-flat",
            name: "Portugal",
            shippingRegionIds: ["pt-all"],
            flatValue: 10,
            strategy: ShippingRateStrategy.ChooseLowerCost
        }];
    var OrderStatus;
    (function (OrderStatus) {
        OrderStatus[OrderStatus["PendingPayment"] = 0] = "PendingPayment";
        OrderStatus[OrderStatus["Payed"] = 1] = "Payed";
        OrderStatus[OrderStatus["PendingShipping"] = 2] = "PendingShipping";
        OrderStatus[OrderStatus["Shipped"] = 3] = "Shipped";
    })(OrderStatus || (OrderStatus = {}));
    var customer = {
        id: "dfreire",
        email: "dario.freire@gmail.com",
        addresses: [{
                fullName: "Dário Freire", streetLine1: "Rua do Não Digo", postalCode: "1234", townOrCity: "Porto", countryId: "PT",
                vatRegionId: "pt", vatNumber: "111 111 111", companyName: "CodingSkills", isDefaultBillingAddress: true,
                shippingRegionId: "pt-all", phoneNumber: "111 111 111", isDefaultShippingAddress: true
            }]
    };
    var shoppingCart = { items: [] };
    function deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    function addToShoppingCart(sellableItemId, quantity) {
        shoppingCart.items.push({ sellableItemId: sellableItemId, quantity: quantity });
    }
    function getShippingRateFor(shippingAddress) {
        for (var i = 0; i < shippingRates.length; i++) {
            var shippingRate = shippingRates[i];
            if (shippingRate.shippingRegionIds.indexOf(shippingAddress.shippingRegionId) >= 0) {
                return shippingRate;
            }
        }
        throw "no shipping rate for given address";
    }
    function getVatRateFor(billingAddress, sellableItem) {
        for (var i = 0; i < sellableItem.vatRateIds.length; i++) {
            var vatRateId = sellableItem.vatRateIds[i];
            for (var j = 0; j < vatRates.length; j++) {
                var vatRate = vatRates[j];
                if (vatRateId === vatRate.id && vatRate.vatRegionId === billingAddress.vatRegionId) {
                    return vatRate;
                }
            }
        }
        return null;
    }
    function findSellableItem(id) {
        for (var i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                return products[i];
            }
        }
    }
    function getSellableItemPriceFor(sellableItem, vatRegionId) {
        for (var i = 0; i < sellableItem.prices.length; i++) {
            var price = sellableItem.prices[i];
            if (price.vatRegionIds.indexOf(vatRegionId) >= 0) {
                return price;
            }
        }
    }
    function checkout(shippingAddress, billingAddress) {
        var CURRENCY_FACTOR = 1000;
        var order = {
            status: OrderStatus.PendingPayment,
            date: new Date(),
            customerId: customer.id,
            copyOfShippingAddress: deepCopy(shippingAddress),
            copyOfBillingAddress: deepCopy(billingAddress),
            copyOfShippingRate: deepCopy(getShippingRateFor(shippingAddress)),
            items: new Array(),
            total: 0
        };
        var total = order.copyOfShippingRate.flatValue * CURRENCY_FACTOR;
        for (var i = 0; i < shoppingCart.items.length; i++) {
            var shoppingCartItem = shoppingCart.items[i];
            var sellableItem = findSellableItem(shoppingCartItem.sellableItemId);
            var item = {
                id: sellableItem.id,
                copyOfSellableItemAccountingCode: deepCopy(sellableItem.accountingCode),
                copyOfSellableItemVatRateIds: deepCopy(sellableItem.vatRateIds),
                copyOfSellableItemPrice: deepCopy(getSellableItemPriceFor(sellableItem, billingAddress.vatRegionId)),
                copyOfVatRate: deepCopy(getVatRateFor(billingAddress, sellableItem)),
                quantity: shoppingCartItem.quantity,
                subTotal: 0
            };
            var subTotal = item.copyOfSellableItemPrice.value * CURRENCY_FACTOR * (1 + item.copyOfVatRate.percentValue) * item.quantity;
            total += subTotal;
            item.subTotal = subTotal / CURRENCY_FACTOR;
            order.items.push(item);
        }
        order.total = total / CURRENCY_FACTOR;
        return order;
    }
    addToShoppingCart("redoma-2013-075", 1);
    addToShoppingCart("charme-2010-075", 2);
    console.log(JSON.stringify(checkout(customer.addresses[0], customer.addresses[0])));
})(model || (model = {}));
//# sourceMappingURL=model.js.map