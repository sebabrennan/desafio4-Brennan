const express = require ('express')

const { Router } = express

const router = Router()
const Productos = [
    {
        title: "Escuadra",
        price: 123,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 1
    },
    {
        title: "Calculadora",
        price: 130,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 2
    },
    {
        title: "Globo",
        price: 100,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 3
    }
]

//devuelve todos los productos
router.get('/', (req, res) => {
    res.send({ Productos: Productos })
})

//devuelve un producto según su id
router.get('/:id', (req, res) => {
    const { id } = req.params
    const productId = Productos.find((product) => product.id == id)
    if(productId){
        res.send({ producto: productId })
    } else {
        res.send({ error: 'producto no encontrado' })
    }
})

//recibe y agrega un producto, y lo devuelve con su id asignado
router.post('/', (req, res) => {
    const { title, price, img } = req.body
    const id = Productos.length + 1
    Productos.push({ title, price, img, id })

    res.send(`Producto agregado con el id: ${id}`)
})

//recibe y actualiza un producto según su id
router.put('/:id', (req, res) => {
    const { id } = req.params
    const productId = Productos.find((product) => product.id == id)
    if(productId){
        const { title, price, thumbnail } = req.body
        const updateProduct = {
            title,
            price,
            thumbnail
        }
        Productos[id - 1] = updateProduct
        res.send(`Producto con el id "${id}" actualizado exitosamente`)
    } else {
        res.send({ error: 'producto no encontrado' })
    }
})

//Elimina un producto según su id
router.delete('/:id', (req, res) => {
    const { id } = req.params
    const productId = Productos.find((product) => product.id == id)
    if(productId) {
        const index = Productos.findIndex(
            (producto) => producto.id == id
        )
        Productos.splice(index, 1)
        res.send(`El producto con id "${id}" ha sido eliminado exitosamente`)
    }else{
        res.send({ error: 'producto no encontrado' })
    }
}) 

module.exports = router