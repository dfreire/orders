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

export class ShoppingCart {
    private items: ShoppingCartItem[];

    constructor() {
        this.items = [];
    }

    getItems(): ShoppingCartItem[] {
        return this.items;
    }

    addItem(id: string, quantity: number) {
        this.items.push({ id: id, quantity: quantity });
    }

    checkout() {

    }
}
