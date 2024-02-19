const express=require("express")
const ProductManager=require("./index")

const PORT=3000
const app=express()

const pm= new ProductManager("./productos.json")

app.get("/products",(req, res)=>{
    let {limit}=req.query
    let productos=pm.getProducts()
    try {
        productos
    } catch (error) {
        console.log(error.message)
    }
        
    if(limit && limit>0){
        productos=productos.slice(0, limit)
    }
    res.json(productos)
})
app.get("/products/:id", ( req, res)=>{
    console.log(req.query)
    let {id}=req.params
    id=Number(id)
    if(isNaN(id)){
        return res.send("El id tiene que ser de tipo numérico...!!!")
    }   

    let productoID=pm.getProducts().find(producto=>producto.id===id)

    if(!productoID){
        return res.send(`No existen productos con id ${id}`)
    }

    res.json(productoID)    
})

app.listen(PORT, ()=>{
    console.log(`Corriendo en puerto ${PORT}`)
})