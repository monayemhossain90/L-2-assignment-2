"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_routes_1 = require("./app/modules/users/users.routes");
// create an application:
const app = (0, express_1.default)();
// use cors :
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// main route of my server :
app.get("/", (req, res) => {
    res.status(200).send(`Server is running`);
});
// all  application routes:
app.use("/api/users", users_routes_1.userRouter);
app.all("*", (req, res) => {
    res.status(404).send({
        success: false,
        message: "Route not found ",
    });
});
exports.default = app;
