"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_model_1 = __importDefault(require("./users.model"));
const configs_1 = __importDefault(require("../../configs"));
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.default.create(userData);
    return user;
});
const getUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_model_1.default.aggregate([
        { $match: {} },
        {
            $project: {
                username: 1,
                fullName: 1,
                age: 1,
                email: 1,
                address: 1,
                _id: 0,
            },
        },
    ]);
    return users;
});
const getSingleUserByIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // use  static method:
    const user = yield users_model_1.default.isUserExists(userId);
    return user;
});
const updateUserByIdIntoDB = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (userData.password) {
        userData.password = yield bcrypt_1.default.hash(userData.password, Number(configs_1.default.bcrypt_solts_round));
    }
    const result = yield users_model_1.default.findOneAndUpdate({ userId }, { $set: userData }, {
        runValidators: true,
        new: true,
        projection: { password: 0, __v: 0, _id: 0, isDeleted: 0, orders: 0 },
    });
    return result;
});
const deleteUserByIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.updateOne({ userId }, { $set: { isDeleted: true } });
    return result;
});
// place order services:
const createAnOrderByUserIdIntoDB = (userId, order) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.updateOne({ userId }, { $push: { orders: order } }, {
        runValidators: true,
    });
    return result;
});
// get orders by UserId:
const getOrdersByIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.aggregate([
        { $match: { userId } },
        { $project: { orders: 1, _id: 0 } },
    ]);
    return result;
});
//  get Total Order Price By userId:
const getTotalPriceByIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.aggregate([
        { $match: { userId } },
        { $unwind: "$orders" },
        {
            $group: {
                _id: null,
                totalPrice: {
                    $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
                },
            },
        },
        {
            $project: { totalPrice: 1, _id: 0 },
        },
    ]);
    return result;
});
exports.UserServices = {
    createUserIntoDB,
    getUsersFromDB,
    getSingleUserByIdFromDB,
    deleteUserByIdFromDB,
    updateUserByIdIntoDB,
    createAnOrderByUserIdIntoDB,
    getOrdersByIdFromDB,
    getTotalPriceByIdFromDB,
};
