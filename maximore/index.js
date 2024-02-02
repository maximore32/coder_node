class ProductManager{

    constructor(){
    
    this.products=[]
    
    }
    
    getProducts(){
    
    return this.products
    
    }
    
    addProduct(title, description,price, thumbnail,stock,code){
    
    if(!title || !description || !price || !thumbnail||!stock || !code){
    
    console.log("Debe completar todos los campos!")
    
    return
    
    }
    let id=1
    if(this.products.length>0){
    
    id=this.products[this.products.length-1].id +1
    
    }
    
    let existe=this.products.find(codigo=>codigo.code===code)
    
    if(existe){
    
    console.log(`El producto con el codigo ${code} ya esta registrado`)
    
    return
    
    }
    
    let nuevoproduct={
    
    id, code, title, description, price, thumbnail,stock
    
    }
    
    this.products.push(nuevoproduct)
    
    }
    
    getId(id){
    
    let productid = this.products.find(c=>c.id===id)
    
    if(!productid){
    
    return `No existen productos con el codigo ${id}`    
    
    
    }
    
    return productid
    
    }
    
    }
    
    const producto01=new ProductManager()
    console.log(producto01.getProducts());
    
    producto01.addProduct("Zapatillas", "zapatillas para corredores",100, "imagen",200, "ABC123")
    
    producto01.addProduct("Ventilador", "Ventilador de tipo industrial",300, "imagen",120, "ABC123")
    
    producto01.addProduct("Zapatillas", "zapatillas para corredores",100, "imagen",200, "ABC125")
        
    console.log(producto01.getProducts())
    
    console.log(producto01.getId(1));
    console.log(producto01.getId(55));


