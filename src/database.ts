import  {TUser, TProduct, TPurchase} from "./types"


export const users : TUser[] = [

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

]
export const products : TProduct[] = [

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

]
export const purchases : TPurchase[] = [

    {
        userId: 'a01',
        productId: 'p01',
        quantity: 5,
        totalPrice:5.000
    },
    {
        userId: 'a02',
        productId: 'p02',
        quantity: 4,
        totalPrice:5.000
    }

]