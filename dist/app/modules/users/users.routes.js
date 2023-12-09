"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const router = express_1.default.Router();
router
    .route("/:userId/orders/total-price")
    .get(users_controller_1.UserController.getTotalPriceByUserId);
router
    .route("/:userId/orders")
    .put(users_controller_1.UserController.createAnOrderById)
    .get(users_controller_1.UserController.getAllOrdersById);
router
    .route("/:userId")
    .get(users_controller_1.UserController.getSingleUser)
    .delete(users_controller_1.UserController.deleteUserById)
    .put(users_controller_1.UserController.updateUserById);
router
    .route("/")
    .get(users_controller_1.UserController.getAllUsers)
    .post(users_controller_1.UserController.createUser);
exports.userRouter = router;
