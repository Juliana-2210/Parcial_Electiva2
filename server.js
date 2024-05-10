const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para parsear el cuerpo de las peticiones POST

// Ruta al archivo data.json
const dataPath = path.join(__dirname, "data.json");

app.set("views", "./views");
app.set("view engine", "ejs");
app.set("PORT", process.env.PORT || 3000);

app.get("/", (req, res) => {
    // Cargar los datos del archivo data.json
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            console.error("Error al leer el archivo data.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        
        // Convertir los datos en un objeto JavaScript
        const jsonData = JSON.parse(data);
        
        // Obtener la lista de productos desde la propiedad "products"
        const productos = Object.values(jsonData.products);
        
        // Pasar el array de productos a la vista
        res.render("index", { productos: productos, mensajeCompraExitosa: null });
    });
});

app.post("/comprar", (req, res) => {
    const productoSeleccionado = req.body.producto;
    const cantidad = parseInt(req.body.cantidad);

    // Aquí puedes agregar la lógica para procesar la compra,
    // actualizar el estado del inventario, etc.

    // Por ahora, simplemente mostramos un mensaje de compra exitosa
    const mensajeCompraExitosa = `¡Compra exitosa! Has comprado ${cantidad} unidades del producto.`;

    // Volvemos a cargar los productos para mostrarlos en la página
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            console.error("Error al leer el archivo data.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        
        const jsonData = JSON.parse(data);
        const productos = Object.values(jsonData.products);
        
        res.render("index", { productos: productos, mensajeCompraExitosa: mensajeCompraExitosa });
    });
});

app.post("/agregar-producto", (req, res) => {
    const nuevoProducto = {
        code: req.body.codigo,
        description: req.body.descripcion,
        stock: parseInt(req.body.stock),
        value: parseFloat(req.body.valor),
        "stock-min": parseInt(req.body.stockMinimo)
    };

    // Cargar el archivo data.json
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            console.error("Error al leer el archivo data.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }

        // Parsear el JSON
        const jsonData = JSON.parse(data);

        // Agregar el nuevo producto al objeto de productos
        jsonData.products[nuevoProducto.code] = nuevoProducto;

        // Escribir los datos actualizados en el archivo data.json
        fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), err => {
            if (err) {
                console.error("Error al escribir en el archivo data.json:", err);
                res.status(500).send("Error interno del servidor");
                return;
            }

            // Redirigir a la página principal con mensaje de compra exitosa
            res.redirect("/?mensajeCompraExitosa=1");
        });
    });
});

app.listen(app.get("PORT"), () =>
    console.log(`Server listen at Port ${app.get("PORT")}`)
);
