var products = [
    { id: "redoma-2013-075", accountingCode: "001", vatRateIds: ["pt-iva-23"], prices: [
            { absoluteValue: 35, shippingRegionIds: ["pt-all"] }
        ] },
    { id: "charme-2010-075", accountingCode: "001", vatRateIds: ["pt-iva-23"], prices: [
            { absoluteValue: 55, shippingRegionIds: ["pt-all"] }
        ] }
];
var vatRates = [
    { id: "pt-iva-13", percentValue: 0.13, shippingRegionIds: ["pt-all"] },
    { id: "pt-iva-23", percentValue: 0.23, shippingRegionIds: ["pt-all"] }
];
var shippingRegions = [
    { id: "pt-all", name: "Portugal Continental", countryId: "pt" }
];
var countries = [
    { id: "pt", name: "Portugal" }
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
            vatNumber: "111 111 111", companyName: "CodingSkills", isDefaultBillingAddress: true,
            shippingRegionId: "PT", phoneNumber: "111 111 111", isDefaultShippingAddress: true
        }]
};
var shoppingCart = { items: [] };
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function addToShoppingCart(sellableItemId, quantity) {
    shoppingCart.items.push({ sellableItemId: sellableItemId, quantity: quantity });
}
addToShoppingCart("redoma-2013-075", 1);
addToShoppingCart("charme-2010-075", 2);
function getShippingRateFor(shippingAddress) {
    for (var i = 0; i <= shippingRates.length; i++) {
        var shippingRate = shippingRates[i];
        if (shippingRate.shippingRegionIds.indexOf(shippingAddress.shippingRegionId) >= 0) {
            return shippingRate;
        }
    }
    throw "no shipping rate for given address";
}
function getVatRateFor(billingAddress, sellableItem) {
    for (var i = 0; i <= sellableItem.vatRateIds.length; i++) {
        var vatRateId = sellableItem.vatRateIds[i];
        for (var j = 0; j <= vatRates.length; j++) {
            var vatRate = vatRates[j];
            if (vatRate.shippingRegionIds.indexOf(billingAddress.shippingRegionId) >= 0) {
                return vatRate;
            }
        }
    }
    return null;
}
function findSellableItem(id) {
    for (var i = 0; i <= products.length; i++) {
        if (products[i].id === id) {
            return products[i];
        }
    }
}
function checkout(shippingAddress, billingAddress) {
    var items = [];
    var order = {
        status: OrderStatus.PendingPayment,
        date: new Date(),
        customerId: customer.id,
        copyOfShippingAddress: deepCopy(shippingAddress),
        copyOfBillingAddress: deepCopy(billingAddress),
        copyOfShippingRate: deepCopy(getShippingRateFor(shippingAddress)),
        items: items
    };
    for (var i = 0; i <= shoppingCart.items.length; i++) {
        var shoppingCartItem = shoppingCart.items[i];
        var sellableItem = findSellableItem(shoppingCartItem.sellableItemId);
        order.items.push({
            copyOfSellableItem: deepCopy(sellableItem),
            copyOfVatRate: deepCopy(getVatRateFor(billingAddress, sellableItem)),
            quantity: shoppingCartItem.quantity
        });
    }
    return order;
}
//# sourceMappingURL=model.js.map