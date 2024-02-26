const Router =require("express").Router
const ProductManager=require("../managers/index.js")
const {saveDatos } = require("../varios")


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
    let {title,description,price,thumbnail,stock,code} = req.body

    if(!title || !description || !thumbnail || !price ||!stock || !code){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Debe completar todos los campos`})
    }    

    let nuevoproducto=pm.addProduct(req.body)

    res.setHeader('Content-Type','application/json')
    res.status(201).json({nuevoproducto})
    console.log(nuevoproducto)
})


router.put("/:id", (req, res)=>{

    let id=Number(req.params.id) 
    if(isNaN(id)){
        return res.status(400).json({error:"id debe ser numérico"})
    }

    let prods= pm.getProducts()
    let indicepProds=prods.findIndex(p=>p.id===id)
    if(indicepProds===-1){
        return res.status(400).json({error:`No existen usuarios con id ${id}`})
    }

    prods[indicepProds]={
        ...prods[indicepProds],
        ...req.body,
        id
    }   

    saveDatos(prods)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({productoModificado:prods[indicepProds]});
})

router.delete("/:id", (req, res)=>{

    let id=Number(req.params.id) 
    if(isNaN(id)){
        return res.status(400).json({error:"id debe ser numérico"})
    }

    let prods= pm.getProducts()
    let indicePrd=prods.findIndex(u=>u.id===id)
    if(indicePrd===-1){
        return res.status(400).json({error:`No existen usuarios con id ${id}`})
    }

    let productoEliminado=prods[indicePrd]
    prods.splice(indicePrd, 1)

    saveDatos(prods)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({productoEliminado});

})

module.exports=router
