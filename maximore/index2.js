const fs = require("fs");

const path = require("path");

class ProductManager {
  constructor(rutaArchivo) {
    this.path = rutaArchivo;

    this.products = [];
  }

  getProducts() {
    let lecturaArchivo = fs.readFileSync(this.path, { encoding: "utf-8" });

    return JSON.parse(lecturaArchivo);
  }

  addProduct(title, description, price, thumbnail, stock, code) {
    if (!title || !description || !price || !thumbnail || !stock || !code) {
      console.log("Debe completar todos los campos!");
      return;
    }
    let id = 1;
    if (this.products.length > 0) {
      id = this.products[this.products.length - 1].id + 1;
    }
    let existe = this.products.find((codigo) => codigo.code === code);
    if (existe) {
      console.log(`El producto con el codigo ${code} ya esta registrado`);
      return;
    }
    let nuevoproduct = {
      id,
      code,
      title,
      description,
      price,
      thumbnail,
      stock,
    };
    this.products.push(nuevoproduct);
    fs.writeFileSync(
      this.path,
      JSON.stringify(this.products, null, 2, { encoding: "utf8" })
    );
  }

  getId(id) {
    let productid = this.products.find((c) => c.id === id);
    let lecturaArchivoById = fs.readFileSync(this.path, { encoding: "utf-8" });
    if (!productid) {
      return `No existen productos con el codigo ${id}`;
    } else {
      return productid;
    }
  }

  updateProduct(id, updatedProduct) {
    // Buscamos el índice del producto a actualizar
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      // Actualizamos el producto
      this.products[index] = { ...this.products[index], ...updatedProduct };
      // Guardamos la lista actualizada en el archivo JSON
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      return this.products[index];
    } else {
      console.log(`No exite el producto con el id ${id}`);
    }
  }

  deleteProduct(id) {
    // Buscamos el índice del producto a eliminar
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      // Eliminamos el producto de la lista
      this.products.splice(index, 1);
      // Guardamos la lista actualizada en el archivo JSON
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 4));
    } else {
      console.error(`No se encuentran productos con el id ${id}`);
    }
  }
}

const producto01 = new ProductManager("./productos.json");
producto01.addProduct(
  "Zapatillas",
  "zapatillas para corredores",
  100,
  "imagen",
  200,
  "ABC123"
);
producto01.addProduct(
  "Ventilador",
  "Ventilador de tipo industrial",
  300,
  "imagen",
  120,
  "ABC123"
);
producto01.addProduct(
  "Zapatillas",
  "zapatillas para corredores",
  100,
  "imagen",
  200,
  "ABC125"
);
producto01.updateProduct(1, {
  title: "Actualizado",
  description: "esto se cambio",
  price: 100,
  thumbnail: "imagen",
  stock: 200,
  code: "ABC123",
});
console.log(producto01.getId(2));

//console.log(producto01.getId(55));

//producto01.deleteProduct(2);
