interface SellableItem {
    id: string;
    accountingCode: string;
    vatRateIds: string[];
    prices: {
        absoluteValue: number;
        shippingRegionIds: string[];
    }[]
}

let products: SellableItem[]  = [
    { id: "redoma-2013-075", accountingCode: "001", vatRateIds: ["pt-iva-23"], prices: [
        { absoluteValue: 35, shippingRegionIds: ["pt-all"] }
    ]},
    { id: "charme-2010-075", accountingCode: "001", vatRateIds: ["pt-iva-23"], prices: [
        { absoluteValue: 55, shippingRegionIds: ["pt-all"] }
    ]}
];

// "caixa-normal-6-075": { id: "caixa-normal-6-075" },
// "caixa-madeira-1-075": { id: "caixa-nomal-1-075" },
// "caixa-madeira-2-075": { id: "caixa-nomal-2-075" }

interface SellablePack extends SellableItem {
    sellableItemIds: string;
}

interface StockableItem {
    id: string;
    availableQuantity: number;
}

interface PhysicalItem {
    id: string;
    weight: number;
}

interface PackageableItem {
    id: string;
    formatId: string;
}

interface Package {
    id: string;
    itemFormatIds: string[];
    capacity: number;
}

interface ItemFormat {
    id: string;
    name: string;
}

interface VatRate {
    id: string;
    percentValue: number;
    shippingRegionIds: string[];
}

let vatRates: VatRate[] = [
    { id: "pt-iva-13", percentValue: 0.13, shippingRegionIds: ["pt-all"] },
    { id: "pt-iva-23", percentValue: 0.23, shippingRegionIds: ["pt-all"] }
];

interface ShippingRegion {
    id: string;
    name: string;
    countryId: string;
}

let shippingRegions: ShippingRegion[] = [
    { id: "pt-all", name: "Portugal Continental", countryId: "pt" }
]

interface Country {
    id: string;
    name: string;
}

let countries: Country[] = [
    { id: "pt", name: "Portugal" }
]

interface ShippingRate {
    id: string;
    name: string;
    shippingRegionIds: string[];
    flatValue?: number;
    byWeight?: {
        fromWeight: number;
        toWeight: number;
        value: number;
    };
    byTotalPrice?: {
        fromTotalPrice: number;
        toTotalPrice: number;
        value: number;
    };
    strategy: ShippingRateStrategy;
}

enum ShippingRateStrategy { ChooseLowerCost, ChooseHigherCost };

let shippingRates: ShippingRate[] = [{
    id: "shipping-rate-pt-flat",
    name: "Portugal",
    shippingRegionIds: ["pt-all"],
    flatValue: 10,
    strategy: ShippingRateStrategy.ChooseLowerCost
}]

interface ShoppingCart {
    items: {
        sellableItemId: string;
        quantity: number;
    }[];
}

interface Customer {
    id: string;
    name: string;
    email: string;
    addresses: Address[];
}

interface Address {
    fullName: string;
    streetLine1: string;
    streetLine2: string;
    streetLine3: string;
    postalCode: string;
    townOrCity: string;
    countryId: string;
}

interface BillingAddress extends Address {
    vatNumber: string;
    companyName: string;
    shippingRegionId: string;
    isDefaultBillingAddress: boolean;
}

interface ShippingAddress extends Address {
    shippingRegionId: string;
    phoneNumber: string;
    isDefaultShippingAddress: boolean;
}

interface Order {
    status: OrderStatus;
    date: Date;
    customerId: string;
    copyOfShippingAddress: ShippingAddress;
    copyOfBillingAddress: BillingAddress;
    copyOfShippingRate: ShippingRate;
    items: OrderItem[];
}

interface OrderItem {
    copyOfSellableItem: SellableItem;
    copyOfVatRate: VatRate;
    quantity: number;
}

enum OrderStatus { PendingPayment, Payed, PendingShipping, Shipped }

// interface Bottle extends SellableItem, PackageableItem, StockableItem, PhysicalItem {
//     id: string;
// }
// interface NormalBox extends Package, PhysicalItem {
//     id: string;
// }
// interface WoodenBox extends Package, PhysicalItem, SellableItem {
//     id: string;
// }
//
// let Bootles: Bottle[];
// let woodenBox: WoodenBox;
// let normalBox: NormalBox;


let customer = {
    id: "dfreire",
    email: "dario.freire@gmail.com",
    addresses: [{
        fullName: "Dário Freire", streetLine1: "Rua do Não Digo", postalCode: "1234", townOrCity: "Porto", countryId: "PT",
        vatNumber: "111 111 111", companyName: "CodingSkills", isDefaultBillingAddress: true,
        shippingRegionId: "PT", phoneNumber: "111 111 111", isDefaultShippingAddress: true
    }]
}



let shoppingCart: ShoppingCart = { items: [] };

function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

function addToShoppingCart(sellableItemId: string, quantity: number) {
    shoppingCart.items.push({ sellableItemId: sellableItemId, quantity: quantity });
}

addToShoppingCart("redoma-2013-075", 1);
addToShoppingCart("charme-2010-075", 2);

function getShippingRateFor(shippingAddress: ShippingAddress): ShippingRate {
    for (let i = 0; i <= shippingRates.length; i++) {
        let shippingRate = shippingRates[i];
        if (shippingRate.shippingRegionIds.indexOf(shippingAddress.shippingRegionId) >= 0) {
            return shippingRate;
        }
    }
    throw "no shipping rate for given address";
}

function getVatRateFor(billingAddress: BillingAddress, sellableItem: SellableItem): VatRate {
    for (let i = 0; i <= sellableItem.vatRateIds.length; i++) {
        let vatRateId = sellableItem.vatRateIds[i];
        for (let j = 0; j <= vatRates.length; j++) {
            let vatRate = vatRates[j];
            if (vatRate.shippingRegionIds.indexOf(billingAddress.shippingRegionId) >= 0) {
                return vatRate;
            }
        }
    }
    return null;
}

function findSellableItem(id: string): SellableItem {
    for (let i = 0; i <= products.length; i++) {
        if (products[i].id === id) {
            return products[i];
        }
    }
}

function checkout(shippingAddress: ShippingAddress, billingAddress: BillingAddress): Order {
    let order = {
        status: OrderStatus.PendingPayment,
        date: new Date(),
        customerId: customer.id,
        copyOfShippingAddress: deepCopy(shippingAddress),
        copyOfBillingAddress: deepCopy(billingAddress),
        copyOfShippingRate: deepCopy(getShippingRateFor(shippingAddress)),
        items: new Array<OrderItem>()
    };

    for (let i = 0; i <= shoppingCart.items.length; i++) {
        let shoppingCartItem = shoppingCart.items[i];
        let sellableItem = findSellableItem(shoppingCartItem.sellableItemId);
        order.items.push({
            copyOfSellableItem: deepCopy(sellableItem),
            copyOfVatRate: deepCopy(getVatRateFor(billingAddress, sellableItem)),
            quantity: shoppingCartItem.quantity
        })
    }

    return order;
}
