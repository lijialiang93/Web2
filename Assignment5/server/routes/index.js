const apiRoutes = require("./api");

const constructorMethod = (app) => {
    app.use("/api", apiRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;