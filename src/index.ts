import { getAllProducts, getAllPurchasesFromUserId, getProductByName, products, purchases, users } from "./database"
import cors from "cors"
import express, { Request, Response} from "express";
console.log("hello word")

console.log("Usuário cadastrado!")
console.table(users)

console.log("produtos cadastrados")
console.table(products)

console.log("purchase")
console.log(purchases)

console.table(getProductByName("cama"))

console.table(getAllPurchasesFromUserId("a05"))

const app = express()

app.use(express.json())
app.use(cors())
app.listen(3003,()=>{
    console.log("servidor rodando na porta 3003")
})
 
app.get('/ping', (req: Request, res: Response)=>{
    res.send('pong')
})