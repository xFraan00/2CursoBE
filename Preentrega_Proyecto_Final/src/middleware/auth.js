export const isAuth = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        res.redirect("/login");
    }
};

export const isNotAuth = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        res.redirect("/products");
    }
};