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

interface ShoppingCartItem {
    id: string;
    quantity: number;
}

interface Order {
    status: OrderStatus;
    date: Date;
    customerId: string;
    // copyOfShippingAddress: ShippingAddress;
    // copyOfBillingAddress: BillingAddress;
    // copyOfShippingRate: ShippingRate;
    items: OrderItem[];
    total: number;
}

enum OrderStatus { PendingPayment, Payed, PendingShipping, Shipped }

interface OrderItem {
    id: string;
    copyOfSellableItemAccountingCode: string;
    copyOfSellableItemVatRateIds: string[];
    copyOfSellableItemPrice: SellableItemPrice;
    // copyOfVatRate: VatRate;
    quantity: number;
    subTotal: number;
}

export class ShoppingCart {
    private customerId: string;
    private items: ShoppingCartItem[];

    constructor(customerId: string) {
        this.customerId = customerId;
        this.items = [];
    }

    getCustomerId() {
        return this.customerId;
    }

    getItems(): ShoppingCartItem[] {
        return this.items;
    }

    addItem(id: string, quantity: number) {
        this.items.push({ id: id, quantity: quantity });
    }

    checkout(): Order {
        return null;
    }
}
