import { getAllProducts, getAllPurchasesFromUserId, getProductByName, products, purchases, users } from "./database"

console.log("hello word")

console.log("Usuário cadastrado!")
console.table(users)

console.log("produtos cadastrados")
console.table(products)

console.log("purchase")
console.log(purchases)

console.table(getProductByName("cama"))

console.table(getAllPurchasesFromUserId("a05"))
