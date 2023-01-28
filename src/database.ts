// import { TUser, TProduct, TPurchase, CATEGORY } from "./types"


// export const users: TUser[] = [

//     {
//         id: 'a01',
//         email: 'code@gmail.com',
//         password: '12345'
//     },
//     {
//         id: 'a02',
//         email: 'batata@gmail.com',
//         password: '54321'

//     }

// ]
// export const products: TProduct[] = [

//     {
//         id: 'a01',
//         name: 'cama',
//         price: 200,
//         category: CATEGORY.CATEGORY
//     },
//     {
//         id: 'a02',
//         name: 'mesa',
//         price: 150,
//         category: CATEGORY.CATEGORY
//     }

// ]
// export const purchases: TPurchase[] = [

//     {
//         userId: 'a01',
//         productId: 'p01',
//         quantity: 5,
//         totalPrice: 5.000
//     },
//     {
//         userId: 'a02',
//         productId: 'p02',
//         quantity: 4,
//         totalPrice: 5.000
//     }

// ]

// export const createUser = (id: string, email: string, password: string) => {

//     const newUser: TUser = {

//         id: id,
//         email: email,
//         password: password
//     }

//     users.push(newUser)
//     return
//     "cadastro realizado!"
// }
// export const createProduct = (id: string, name: string, price: number, category: string): string => {

//     const newProduct: TProduct = {

//         id: id,
//         name: name,
//         price: price,
//         category: category
//     }

//     products.push(newProduct)
//     return
//     "cadastro realizado!"
// }

// export function getAllUsers(): TUser[] {
//     return users
// }



// export function getAllProducts(): TProduct[] {
//     return products
// }

// export const getProductById = (idToSearch: string): TProduct[] | undefined => {

//     return products.filter((product) => {
//         if (product.id === idToSearch) {
//             return product
//         }

//     })
// }


// export const getProductByName = (q: string): TProduct[] | undefined => {

//     return products.filter((product) => {
//         if (product.name.toLowerCase().toUpperCase() === q.toLowerCase().toUpperCase()) {
//             return product
//         }

//     })
// }

// export const createPurchase = (userId: string, productId: string, quantity: number, totalPrice: number): string => {

//     const newPurchase: TPurchase = {

//         userId: userId,
//         productId: productId,
//         quantity: quantity,
//         totalPrice: totalPrice
//     }

//     purchases.push(newPurchase)
//     return
//     "compra realizada!"
// }

// export const getAllPurchasesFromUserId = (useridToSearch: string): TPurchase[] | undefined => {

//     return purchases.filter((purchase) => {
//         return purchase.userId.toLowerCase().includes(useridToSearch.toLowerCase())
//     }
    
//     )
// }


