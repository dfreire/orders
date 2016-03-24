interface ShoppingCartItem {
    productId: string;
    quantity: number;
}

export class ShoppingCart {
    private items: ShoppingCartItem[];

    constructor() {
        this.items = [];
    }

    add(productId: string, quantity: number) {
        this.items.push({ productId: productId, quantity: quantity });
    }

    getItems(): ShoppingCartItem[] {
        return this.items;
    }
}
