interface Address {
    fullName: string;
    streetLine1: string;
    streetLine2?: string;
    streetLine3?: string;
    postalCode: string;
    townOrCity: string;
}

interface BillingAddress extends Address {
    companyName: string;
    vatNumber: string;
    vatRegionId: string;
    isDefaultBillingAddress: boolean;
}

interface ShippingAddress extends Address {
    shippingRegionId: string;
    phoneNumber: string;
    isDefaultShippingAddress: boolean;
}

export class Customer {
    id: string;
    shoppingCart: ShoppingCart;
    addresses: Address[];

    constructor(id: string) {
        this.id = id;
        this.shoppingCart = new ShoppingCart(id);
        this.addresses = new Array<Address>();
    };

    addAddress(address: Address) {
        this.addresses.push(address);
        // TODO ajax request
    }

    removeAddress(address: Address) {
        // TODO ajax request
    }

    getDefaultBillingAddress(): BillingAddress {
        return <BillingAddress>_.find(this.addresses, (address) => {
            return /*(address instanceof BillingAddress) &&*/ (<BillingAddress>address).isDefaultBillingAddress;
        });
    }

    getDefaultShippingAddress(): ShippingAddress {
        return <ShippingAddress>_.find(this.addresses, (address) => {
            return /*(address instanceof ShippingAddress) &&*/ (<ShippingAddress>address).isDefaultShippingAddress;
        });
    }
}

export class ShoppingCart {
    customerId: string;
    items: ShoppingCartItem[];

    constructor(customerId: string) {
        this.customerId = customerId;
        this.items = [];
    }

    addItem(id: string, quantity: number) {
        this.items.push({ id: id, quantity: quantity });
    }

    checkout(): Order {
        const order = new Order(this.customerId);
        _.each(this.items, (item) => {
            order.addItem(item.id, item.quantity);
        });
        return order;
    }
}

interface ShoppingCartItem {
    id: string;
    quantity: number;
}

export class Order {
    date: Date;
    status: OrderStatus;
    customerId: string;
    // copyOfShippingAddress: ShippingAddress;
    // copyOfBillingAddress: BillingAddress;
    // copyOfShippingRate: ShippingRate;
    items: OrderItem[];
    total: number;

    constructor(customerId: string) {
        this.date = new Date();
        this.status = OrderStatus.PendingPayment;
        this.customerId = customerId;
        this.items = new Array<OrderItem>();
    }

    addItem(id: string, quantity: number) {
        this.items.push({ id: id, quantity: quantity });
    }
}

enum OrderStatus { PendingPayment, Payed, PendingShipping, Shipped }

interface OrderItem {
    id: string;
    // copyOfSellableItemAccountingCode: string;
    // copyOfSellableItemVatRateIds: string[];
    // copyOfSellableItemPrice: SellableItemPrice;
    // copyOfVatRate: VatRate;
    quantity: number;
    // subTotal: number;
}

interface SellableItem {
    id: string;
    accountingCode: string;
    vatRateIds: string[];
    prices: SellableItemPrice[]
}

interface SellableItemPrice {
    value: number;
    vatRegionIds: string[];
}
