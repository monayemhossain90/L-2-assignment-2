"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const users_zodValidation_1 = __importStar(require("./users.zodValidation"));
const users_services_1 = require("./users.services");
// create user:
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const validateUser = users_zodValidation_1.default.parse(userData);
        // post the validateUser data:
        const user = yield users_services_1.UserServices.createUserIntoDB(validateUser);
        const _a = user.toObject(), { password, isDeleted, _id, orders } = _a, others = __rest(_a, ["password", "isDeleted", "_id", "orders"]);
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: others,
        });
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: err.message || "user not created successfully",
            error: {
                code: 500,
                description: err,
            },
        });
    }
});
// get all user:
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_services_1.UserServices.getUsersFromDB();
        res.status(200).send({
            success: true,
            message: "Users fetched successfully!",
            data: users,
        });
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: "User not found!",
            error: {
                code: 500,
                description: "User not found!",
            },
        });
    }
});
// retrieve single user by userId:
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        if (!userId) {
            return res.status(200).send({
                success: false,
                message: "Please provide an userId",
                error: {
                    code: 404,
                    description: "Please provide an userId",
                },
            });
        }
        const user = yield users_services_1.UserServices.getSingleUserByIdFromDB(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: err.message,
            error: {
                code: 500,
                description: err.message,
            },
        });
    }
});
// update user with Id :
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const userData = req.body;
        const validateUserData = users_zodValidation_1.default.parse(userData);
        const user = yield users_services_1.UserServices.getSingleUserByIdFromDB(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found",
                },
            });
        }
        // update data:
        const result = yield users_services_1.UserServices.updateUserByIdIntoDB(userId, validateUserData);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User didn't updated successfully!",
                error: {
                    code: 404,
                    description: "User didn't updated successfully!",
                },
            });
        }
        res.status(200).send({
            success: true,
            message: "User updated successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: err.message,
            error: {
                code: 500,
                description: err.message,
            },
        });
    }
});
// deleteUserById:
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const user = yield users_services_1.UserServices.getSingleUserByIdFromDB(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        const result = yield users_services_1.UserServices.deleteUserByIdFromDB(userId);
        if (!result.modifiedCount) {
            return res.status(400).send({
                success: true,
                message: "User not deleted!",
                error: {
                    code: 500,
                    description: "User not deleted",
                },
            });
        }
        res.status(200).send({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: err.message,
            error: {
                code: 500,
                description: err,
            },
        });
    }
});
// place an order :
const createAnOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const orderData = req.body;
        const validateOrder = users_zodValidation_1.orderValidationSchema.parse(orderData);
        const user = yield users_services_1.UserServices.getSingleUserByIdFromDB(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        const result = yield users_services_1.UserServices.createAnOrderByUserIdIntoDB(userId, validateOrder);
        if (!result.modifiedCount) {
            return res.status(400).json({
                success: false,
                message: "Order didn't created successfully",
                error: {
                    code: 400,
                    description: "Order didn't created successfully",
                },
            });
        }
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
});
// get all order by userId:
const getAllOrdersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const user = yield users_services_1.UserServices.getSingleUserByIdFromDB(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        const result = yield users_services_1.UserServices.getOrdersByIdFromDB(userId);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: {
                orders: result[0].orders,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
});
// get Total Price by UserId:
const getTotalPriceByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = parseInt(req.params.userId);
        const user = yield users_services_1.UserServices.getSingleUserByIdFromDB(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        const result = yield users_services_1.UserServices.getTotalPriceByIdFromDB(userId);
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: {
                totalPrice: ((_b = result[0]) === null || _b === void 0 ? void 0 : _b.totalPrice) || 0,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
});
exports.UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUserById,
    updateUserById,
    createAnOrderById,
    getAllOrdersById,
    getTotalPriceByUserId,
};
