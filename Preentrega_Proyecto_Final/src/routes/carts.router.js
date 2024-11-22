import { Router } from "express";
import cartModel from "../dao/models/carts.model.js";

const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
    try {
        await cartModel.create({});
        res.send({message: "Se creó el carrito correctamente"});
    } catch (error) {
        console.log(error);
    }
});

cartsRouter.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cartContent = await cartModel.findOne({_id: cartId}).populate("products.product");
    
        if (cartContent) {
            res.send({cart: cartContent});
        } else {
            res.send({message: "El carrito con el ID ingresado no existe"});
        };
    } catch (error) {
        console.log(error);
    }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const cart = await cartModel.findOne({_id: cartId});

        cart.products.push({product: productId});

        await cartModel.updateOne({_id: cartId}, cart);
        res.send({message: "Producto agregado al carrito con éxito"});
    } catch (error) {
        console.log(error);
    };
});

cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const cart = await cartModel.findOne({_id: cartId});

        const index = cart.products.findIndex((product) => product.id === productId);

        cart.products.splice(index, 1)

        cart.save()
        res.send({message: "Producto eliminado del carrito con éxito"});
    } catch (error) {
        console.log(error);
    }
});

cartsRouter.put("/:cid/products/:pid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body;

        const cart = await cartModel.findOne({_id: cartId});
        const index = cart.products.find((product) => product.id === productId);

        const valueQuantity = Object.values(quantity);
        index.quantity = valueQuantity[0];
        await cart.save();

        res.send({message: "Cantidad actualizada con éxito"});
    } catch (error) {
        console.log(error);   
    }
});

cartsRouter.delete("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
    
        const cart = await cartModel.findOne({_id: cartId});
        cart.products = [];
        await cart.save();
        res.send({message: "Se vació el carrito exitosamente"});
        
    } catch (error) {
        console.log(error);
    }

});
export default cartsRouter;