// import { getAllProducts, getAllPurchasesFromUserId, getProductByName, products, purchases, users } from "./database"
import cors from "cors"
import express, { Request, Response } from "express";
import { TUser, TProduct, TPurchase } from "./types";
import { db } from "./database/knex";
import { isErrored } from "stream";
// console.log("hello word")

// console.log("Usuário cadastrado!")
// console.table(users)

// console.log("produtos cadastrados")
// console.table(products)

// console.log("purchase")
// console.log(purchases)

// console.table(getProductByName("cama"))

// console.table(getAllPurchasesFromUserId("a05"))

const app = express()

app.use(express.json())
app.use(cors())
app.listen(3003, () => {
    console.log("servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('pong')
})


// app.get('/users', (req: Request, res: Response)=>{
//     res.status(200).send(users)
// })

// app.get('/users', (req: Request, res: Response) => {
//     try {
//         res.status(200).send(users)
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }
//         res.send(error.message)
//     }
// })

app.get('/users', async (req: Request, res: Response) => {
    try {

        const getUsers = req.query.q as string | undefined

        if (getUsers === undefined) {
            const result = await db.raw(`SELECT * FROM users`)
            res.status(200).send(result)
        }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})



// app.get('/products', (req: Request, res: Response) => {
//     res.send(products)
// })

// app.get('/products', (req: Request, res: Response) => {
//     try {
//         res.status(200).send(products)
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }
//         res.send(error.message)
//     }
// })

app.get('/products', async (req: Request, res: Response) => {
    try {
        // const result = await db.raw('SELECT * FROM products')
        const getProducts = req.query.q as string | undefined

        if (getProducts === undefined) {

            const result = await db('products')
            res.status(200).send(result)
        }
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


app.get('/purchases', async (req: Request, res: Response) => {
    try {
        // const result = await db.raw('SELECT * FROM products')
        const getPurchases = req.query.q as string | undefined

        if (getPurchases === undefined) {

            const result = await db('purchases')
            res.status(200).send(result)
        }
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})




// app.get('/product/search', (req: Request, res: Response) => {

//     const q = req.params.q

//     const result = products.find((product) => {
//         return product.name === q
//     })


//     res.status(200).send(result)
// })



app.get('/product/search', async (req: Request, res: Response) => {

    try {
        const name = req.query.name as string | undefined

        // const result = products.find((product) => {
        //     return product.name === q
        // })
        const result: TProduct[] | undefined[] = await db.raw(`SELECT * FROM products WHERE name LIKE "%${name}%"`)
        // if (name === undefined) {

        //     await db('products')
        //     res.status(200).send(result)
        // } else {
        //     result
        // }



        if (!result) {
            res.status(400)
            throw new Error("produto inexistente")
        }

        if (name !== undefined) {
            if (name.length > 1) {
                res.status(200).send(result)
            } else {
                res.status(400)
                throw new Error('deve ter mais de um caracter')
            }
        }
        // res.status(200).send()



    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        } if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send(error.message)
        }
    }

})



// app.post('/users', (req: Request, res: Response) => {

//     const { id, email, password } = req.body as TUser

//     const newUser = {
//         id, email, password
//     }
//     users.push(newUser)

//     res.status(201).send('Cadastro realizado com sucesso')

// })

app.post('/users', async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser uma string ")
            }
            const [userIdGet]: TUser[] | undefined[] = await db("users").where({ id: id })
            if (userIdGet) {
                res.status(400)
                throw new Error("id ja existente")
            }

        }

        if (name !== undefined) {
            if (typeof name !== 'string') {
                res.status(400)
                throw Error("O 'name' deve ser uma string")
            }
        }

        if (email !== undefined) {

            if (typeof email !== 'string') {
                res.status(400)
                throw Error("O 'email' deve ser uma string")
            }
            const [userEmailGet]: TUser[] | undefined[] = await db("users").where({ email: email })

            if (userEmailGet) {
                res.status(400)
                throw new Error("email ja existente")
            }

            if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                throw new Error("Parâmetro 'email' inválido")

            }
        }
        if (typeof password !== 'string') {
            res.status(400)
            throw Error("O 'password' deve ser uma string")
        }
        const newUser: TUser = {
            id, name, email, password
        }

        // const user = users.find((user) => user.id === id)
        // const userEmail = users.find((user) => user.email === email)

        //  await db.raw(`
        //     INSERT INTO users (id, email, password)
        //     VALUES ("${id}", "${email}", ${password});
        // `) // colocamos as expressões entre ${}

        await db("users").insert(newUser)
        // users.push(newUser)
        res.status(201).send('usuário cadastrado')

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        } if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send(error.message)
        }
    }

})

// app.post('/products', (req: Request, res: Response) => {

//     const { id, name, price, category } = req.body as TProduct

//     const newProduct = {
//         id, name, price, category
//     }
//     products.push(newProduct)

//     res.status(201).send('Produto cadastrado com sucesso')
// })


app.post('/products', async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url } = req.body
        const newProduct: TProduct = { id, name, price, description, image_url }
        if (id !== undefined) {

            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser uma string ")
            }
            const [productIdGet]: TProduct[] | undefined[] = await db("products").where({ id: id })
            if (productIdGet) {
                res.status(400)
                throw new Error("id do produto existente")
            }
        }

        if (name !== undefined)
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser uma string")
            }
        if (typeof description !== "string") {
            res.status(400)
            throw new Error("'description' deve ser uma string")
        }
        if (typeof price !== "number") {
            res.status(400)
            throw new Error("'number' deve ser um número")
        } else {
            await db("products").insert(newProduct)
            res.status(201).send("produto cadastrado")

        }

        // const product = products.find((product) => product.id === id)


    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        } if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send(error.message)
        }
    }
})

// / Create Purchase
// app.post('/purchases', (req: Request, res: Response) => {

//     const { userId, productId, quantity, totalPrice } = req.body as TPurchase

//     const newPurchase = {
//         userId, productId, quantity, totalPrice
//     }
//     purchases.push(newPurchase)

//     res.status(201).send('Compra realizada com sucesso')
// })

app.post('/purchases', async (req: Request, res: Response) => {

    try {
        // const calculo = products.price
        const { id, buyer, total_price } = req.body

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser uma string ")
            }

            const [purchaseBuyer]: TPurchase[] | undefined[] = await db("purchases").where({ buyer: buyer })
            if (!purchaseBuyer) {
                res.status(400)
                throw new Error("Realize um cadastro, para efetuar a compra")
            }

            const [purchaseId]: TPurchase[] | undefined[] = await db("purchases").where({ id: id })
            if (purchaseId) {
                res.status(400)
                throw new Error("não foi possivel realizar sua compra: id da compra já afetuado")
            }
        }

        if (typeof buyer !== "string") {
            res.status(400)
            throw new Error("'buyer' deve ser uma string")
        }
        if (typeof total_price !== "number") {
            res.status(400)
            throw new Error("'totalPrice' deve ser um number")
        }
        // if (typeof  !== "number") {
        //     throw new Error("'quantity' deve ser um namber")
        // }

        const newPurchases: TPurchase = { id, buyer, total_price }

        await db("purchases").insert(newPurchases)
        res.status(201).send("Compra realizada com sucesso.")

        // const userPurchase = users.find((user) => user.id === userId)
        // const product = products.find((product) => product.id === productId)
        // if ((product.price * quantity) !== (totalPrice)) {
        //     throw new Error("Valor da compra incorreto")
        //  }
        // if (!userPurchase) {
        //     res.status(400)
        //     throw new Error("compra impossibilitada, realize um cadastro")
        // }
        // if (!product) {
        //     res.status(400)
        //     throw new Error("  produto inexistente, tente um produto existente")
        // }
        // else {
        //     purchases.push(newpurchases)
        //     res.status(201).send('compra realizada com sucesso!')

        // }

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        } if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send(error.message)
        }
    }
})



// Get Products by id
// validar que o produto existe

app.get('/product/:id', async (req: Request, res: Response) => {

    try {
        const searchId = req.params.id as string | undefined
        // const result = products.find((product) => product.id === id)


        const result: TProduct[] | undefined[] = await db("products").where({ id: searchId })

        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400)
            throw new Error('Este produto não existe')
        }
    } catch (error: any) {

        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        } if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send(error.message)
        }
    }

})


app.get('purchase/:id', async (req: Request, res: Response) => {

    try {
        const searchId = req.params.id as string | undefined
        // const result = products.find((product) => product.id === id)


        const result: TPurchase[] | undefined[] = await db("purchses").where({ id: searchId })

        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400)
            throw new Error('Esta compra não existe')
        }
    } catch (error: any) {

        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        } if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send(error.message)
        }
    }

})
// Get User Purchases by User id
// validar que o usuário existe

// Get User Purchases by User id
// app.get('/users/purchases/:id', (req: Request, res: Response) => {

//     const id = req.params.id
//     const result = purchases.find((purchase) => {
//         return purchase.userId === id
//     })
//     res.status(200).send(result)
// })

app.get('/users/:id/purchases', async (req: Request, res: Response) => {

    try {
        const buyer = req.params.id as string | undefined
        // const result = purchases.find((purchase) => purchase.userId === id)

        const result: TProduct[] | undefined[]= await db("purchases").where({buyer : buyer })
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(404)
            throw new Error('Compra inexistente');
        }

    }
    catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        } if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send(error.message)
        }
    }

})


// Delete User by id
// app.delete('/user/:id', (req: Request, res: Response) => {

//     const id = req.params.id

//     const userIndex = users.findIndex((user) => {
//         return user.id === id
//     })
//     console.log('Index', userIndex)
//     if (userIndex >= 0) {
//         users.splice(userIndex, 1)
//         res.status(200).send('User apagado com sucesso')
//     } else {
//         res.status(404).send('User not found')
//     }
// })


app.delete('/user/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id as string | undefined
        // const userIndex = users.findIndex((user) => user.id === id)

        const result: TUser[] | undefined[] = await db("users").where({ id: idToDelete })




        if (!result) {
            res.status(404)
            throw new Error('este usuário não existe');
        }

        await db("users").del().where({ id: idToDelete })
        res.status(200).send({ message: "Usuário apagado com sucesso" })


    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        } if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send(error.message)
        }
    }
})




// app.delete('/product/:id', (req: Request, res: Response) => {

//     const id = req.params.id as string

//     const productIndex = products.findIndex((product) => {
//         return product.id === id
//     })
//     console.log('Index', productIndex)
//     if (productIndex >= 0) {
//         users.splice(productIndex, 1)
//         res.status(200).send('Produto apagado com sucesso')
//     } else {
//         res.status(404).send('Products not found')
//     }
// })

app.delete('/product/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id as string | undefined

        // const productIndex = users.findIndex((product) => product.id === id)


        const result: TUser[] | undefined[] = await db("products").where({ id: idToDelete })




        if (!result) {
            res.status(404)
            throw new Error('este usuário não existe');
        }

        await db("products").del().where({ id: idToDelete })
        res.status(200).send({ message: "Product apagado com sucesso" })


    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        } if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send(error.message)
        }
    }
})


// app.put('/user/:id', (req: Request, res: Response) => {

//     const { id, email, password } = req.body as TUser | undefined

//     const response = req.params.id
//     const result = users.find((user) => {
//         return user.id === response
//     })
//     if (result) {
//         result.id = req.body.id || result.id
//         result.email = req.body.email || result.email
//         result.password = req.body.password || result.password
//         res.status(200).send('Cadastro atualizado com sucesso')
//     } else {
// } else {
//         res.status(404).send('Not found')
//     }
// })


app.put('/user/:id', async (req: Request, res: Response) => {


    try {

        const idToEdit = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newEmail = req.body.email
        const newPassword = req.body.password
       

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'Id' deve ser uma string ")
            }
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("'email' deve ser uma string")
            }
        }

        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                res.status(400)
                throw new Error("'email' deve ser uma string")
            }
        }

        if (newPassword !== undefined) {
            if (typeof newPassword !== "string") {
                res.status(400)
                throw new Error("'password' deve ser uma string")
            }
        }

        


        const response = req.params.id
        // const result = users.find((user) => user.id === response)
        const [result]: TUser[] | undefined[] = await db("users").where({ id: idToEdit })

        if (!result) {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        const userUpdating: TUser = {

            id: newId || result.id,
            name: newName || result.name,
            email: newEmail || result.email,
            password: newPassword || result.password,
           
        }

        await db("users").update(userUpdating).where({ id: idToEdit })

        res.status(200).send({
            message: "Usuário editado com sucesso",
            user: userUpdating
        })


}
catch (error: any) {
    console.log(error)
    if (res.statusCode === 200) {
        res.status(500)
    } if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send(error.message)
    }
}


})


// app.put('/product/:id', (req: Request, res: Response) => {

//     const { id, name, price, category } = req.body as TProduct | undefined

//     const response = req.params.id
//     const result = products.find((product) => {
//         return product.id === response
//     })
//if (result) {
//         result.id = req.body.id || result.id
//         result.name = req.body.name || result.name
//         result.price = req.body.price || result.price
//         result.category = req.body.category || result.category
//         res.status(200).send('Edição feita com sucesso')

//     } else {
//         res.status(404).send('Not found')
//     }
// })




app.put('/product/:id', async(req: Request, res: Response) => {


    try {

        const idToEdit = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newDescription = req.body.description
        const newImage = req.body.image_url

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'Id' deve ser uma string ")
            }
        }

        if (newName !== undefined) {
            if (typeof newName!== "string") {
                res.status(400)
                throw new Error("'name' deve ser uma string")
            }
        }

        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                throw new Error("'price' deve ser uma string")
            }
        }
        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                throw new Error("'description' deve ser uma string")
            }
        }

        if (newImage !== undefined) {
            if (typeof newImage !== "string") {
                throw new Error("'image' deve ser uma string")
            }
        }


        // const response = req.params.id
        // const result = products.find((product) => product.id === response)

        const [result]: TProduct[] | undefined[] = await db("products").where({ id: idToEdit })

        if (!result) {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        const productUpdating: TProduct = {

            id: newId || result.id,
            name: newName || result.name,
            price: newPrice || result.price,
            description: newDescription || result.description,
            image_url: newImage || result.image_url
        }

        await db("products").update(productUpdating).where({ id: idToEdit })

        res.status(200).send({
            message: "Usuário editado com sucesso",
            task: productUpdating
        })


    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        } if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send(error.message)
        }
    }


})


// Get All Users
// method HTTP (GET)
// path ("/users")
// response
// status 200
// array de users do arquivo .db

app.delete('/purchase/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id as string | undefined

        // const productIndex = users.findIndex((product) => product.id === id)


        const result: TPurchase[] | undefined[] = await db("purchases").where({ id: idToDelete })




        if (!result) {
            res.status(404)
            throw new Error('este compra não existe');
        }

        await db("purchases").del().where({ id: idToDelete })
        res.status(200).send({ message: "Compra apagada com sucesso" })


    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        } if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send(error.message)
        }
    }
})

