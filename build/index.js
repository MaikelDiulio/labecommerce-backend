"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
console.log("hello word");
console.log("Usuário cadastrado!");
console.table(database_1.users);
console.log("produtos cadastrados");
console.table(database_1.products);
console.log("purchase");
console.log(database_1.purchases);
console.table((0, database_1.getProductByName)("cama"));
console.table((0, database_1.getAllPurchasesFromUserId)("a05"));
//# sourceMappingURL=index.js.map