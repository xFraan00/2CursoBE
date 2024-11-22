import fs from "fs/promises";

class CartManager {
    constructor(filePath) {
        this.path = filePath;
    };

    async createCart() {
        try {
            const carts = await this.readCarts();
            const id = carts.length + 1;
            const newCart = {
                id: id,
                products: []
            }
            carts.push(newCart);
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
            console.log(`Se creó un carrito con ID "${id}"`);
        } catch (error) {
            console.error("No se pudo crear el carrito", error);
        }
    }

    async getCartContent(cartId) {
        try {
            const carts = await this.readCarts();
            const filteredCart = carts.find((cart) => cart.id === cartId);

            if(filteredCart) {
                return filteredCart.products;
            } else {
                console.log("El carrito no existe");
            }
        } catch (error) {
            console.log("Error al mostrar el contenido del carrito", error);
        }
        
    }

    async addToCart(cartId, productId) {
        try {
            const carts = await this.readCarts();
            const filteredCart = carts.find((cart) => cart.id === cartId)
            const content = await this.getCartContent(cartId);
            const existProduct = content.some((product) => product.id === productId);

            if (!existProduct) {
                const productToCart = {
                    id: productId,
                    quantity: 1
                }
                content.push(productToCart);
                filteredCart.products = content;
                await fs.writeFile(this.path, JSON.stringify(carts, null, 2));

            } else {
                const product = filteredCart.products.find((product) => product.id === productId);
                product.quantity = product.quantity + 1;
                await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
            }

        } catch (error) {
            console.log("Error al agregar productos al carrito", error);
        }
    }

    async readCarts() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            if (error.code === "ENOENT") {
                console.log("No existe el archivo");
                return [];
            } else {
                throw error
            }
        }
    }
}

export default CartManager;