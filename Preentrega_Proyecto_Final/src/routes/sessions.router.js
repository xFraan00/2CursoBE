import { Router } from "express";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.post("/register", passport.authenticate("register", {failureRedirect: "failregister"}), async (req, res) => {
    res.redirect("/login");
});

sessionRouter.get("/failregister", async (req, res) => {
    res.send({error: "Fallo en la estrategia de register"});
});
sessionRouter.post("/login", passport.authenticate("login", {failureRedirect: "faillogin"}), async (req, res) => {
    try {
        if(!req.user) return res.status(400).send("Rellene los datos faltantes");

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
        }
        if (req.session.user.role === "admin") {
            res.redirect("/realtimeproducts?page=1");
        } else {
            res.redirect("/products?page=1");
        }
    } catch (error) {
        res.status(500).send("Error al iniciar sesión");
    }
});

sessionRouter.get("/faillogin", async (req, res) => {
    console.log("Error al intentar loguear");
    res.send({error: "Fallo en la estrategia de login"})
});

sessionRouter.get("/github", passport.authenticate("github", {scope: "user.email"}), async (req, res) => {});

sessionRouter.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}), async (req, res) => {
    req.session.user = req.user;
});

sessionRouter.post("/logout", (req, res) => {
    req.session.destroy((error) => {
        if(error) {
            return res.status(500).send("Error al cerrar sesión");
        }
        res.redirect("/login");
    });
});

export default sessionRouter;