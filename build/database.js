"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.getProductByName = exports.getProductById = exports.getAllProducts = exports.getAllUsers = exports.createProduct = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
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
        category: types_1.CATEGORY.CATEGORY
    },
    {
        id: 'a02',
        name: 'mesa',
        price: 150,
        category: types_1.CATEGORY.CATEGORY
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
const createUser = (id, email, password) => {
    const newUser = {
        id: id,
        email: email,
        password: password
    };
    exports.users.push(newUser);
    return;
    "cadastro realizado!";
};
exports.createUser = createUser;
const createProduct = (id, name, price, category) => {
    const newProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    };
    exports.products.push(newProduct);
    return;
    "cadastro realizado!";
};
exports.createProduct = createProduct;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
const getProductById = (idToSearch) => {
    return exports.products.filter((product) => {
        if (product.id === idToSearch) {
            return product;
        }
    });
};
exports.getProductById = getProductById;
const getProductByName = (q) => {
    return exports.products.filter((product) => {
        if (product.name.toLowerCase().toUpperCase() === q.toLowerCase().toUpperCase()) {
            return product;
        }
    });
};
exports.getProductByName = getProductByName;
const createPurchase = (userId, productId, quantity, totalPrice) => {
    const newPurchase = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    };
    exports.purchases.push(newPurchase);
    return;
    "compra realizada!";
};
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (useridToSearch) => {
    return exports.purchases.filter((purchase) => {
        return purchase.userId.toLowerCase().includes(useridToSearch.toLowerCase());
    });
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map