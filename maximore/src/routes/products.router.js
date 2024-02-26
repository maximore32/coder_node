const Router =require("express").Router
const ProductManager=require("../managers/index.")

const {join}=require("path")


const router=Router()

let rutaProd=join(__dirname, "..", "data", "productos.json")

const pm= new ProductManager(rutaProd)

router.get("/",(req, res)=>{
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

    res.setHeader('Content-Type','application/json')
    res.status(200).json({productos})
    console.log(productos)
    
})
router.get("/:id", ( req, res)=>{
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
    res.setHeader('Content-Type','application/json')
    res.status(200).json({productoID})

        
})

router.post("/", (req, res)=>{

    res.status(201).json({
        users:"usuario post OK...!!!"
    })
})

module.exports=router
