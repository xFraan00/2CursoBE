const socket = io();

const addToCart = (productId) => {
    socket.emit("addToCart", productId);
}