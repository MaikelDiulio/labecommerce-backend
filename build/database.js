"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
exports.users = [
    {
        id: 'a01',
        email: 'code@gmail.com',
        password: '12345'
    },
    {
        id: 'a02',
        email: 'batata@gmail.com',
        password: '54321'
    }
];
exports.products = [
    {
        id: 'a01',
        name: 'cama',
        price: 200,
        category: 'móveis'
    },
    {
        id: 'a02',
        name: 'mesa',
        price: 150,
        category: 'móveis'
    }
];
exports.purchases = [
    {
        userId: 'a01',
        productId: 'p01',
        quantity: 5,
        totalPrice: 5.000
    },
    {
        userId: 'a02',
        productId: 'p02',
        quantity: 4,
        totalPrice: 5.000
    }
];
//# sourceMappingURL=database.js.map