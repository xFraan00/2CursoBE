import productModel from "../dao/models/products.model.js";
import cartModel from "../dao/models/carts.model.js";

const socketManager = (socketServer) => {
    socketServer.on("connection", (socket) => {
        console.log("Cliente conectado");

        socket.on("newProduct", async (data) => {
            data.price = parseInt(data.price);
            data.stock = parseInt(data.stock);

            await productModel.create(data);
        });

        socket.on("deleteProduct", async (productId) => {
            await productModel.deleteOne({_id: productId});
        });

        socket.on("addToCart", async (productId) => {
            const cart = await cartModel.findOne({_id: "66552db663453d4d60b45b91"});
            cart.products.push({product: productId});
            await cart.save();
            console.log("Producto agregado al carrito con éxito");
        });


    });
}

export default socketManager;