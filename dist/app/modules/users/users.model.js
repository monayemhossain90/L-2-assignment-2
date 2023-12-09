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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const configs_1 = __importDefault(require("../../configs"));
const fullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "first name is required"],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "last name is required"],
    },
}, {
    _id: false,
});
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        trim: true,
        required: [true, "street is required"],
    },
    city: {
        type: String,
        trim: true,
        required: [true, "city is required"],
    },
    country: {
        type: String,
        trim: true,
        required: [true, "country is required"],
    },
}, {
    _id: false,
});
const orderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        min: [0, "Min price will be  more then 0"],
        required: [true, "price is required"],
    },
    quantity: {
        type: Number,
        min: [0, "Min price will be more then 0"],
        required: [true, "quantity is required"],
    },
}, {
    _id: false,
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        trim: true,
        unique: true,
        required: [true, "userId is required"],
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "username is required"],
    },
    password: {
        type: String,
        trim: true,
        required: [true, "password is required "],
    },
    fullName: {
        type: fullNameSchema,
        required: [true, "fullName is required"],
    },
    age: {
        type: Number,
        required: [true, "age is required"],
        min: [1, "Age can not be less then 1"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
    },
    isActive: {
        type: Boolean,
        required: [true, "isActive is required"],
        default: true,
    },
    hobbies: [
        {
            type: String,
            trim: true,
            required: true,
        },
    ],
    address: {
        type: addressSchema,
        required: [true, "Address is required"],
    },
    orders: [
        {
            type: orderSchema,
        },
    ],
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
// hash password :
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(configs_1.default.bcrypt_solts_round));
        next();
    });
});
// remove password with post hook:
userSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.password = "";
        next();
    });
});
// create an pre hook to hide deleted User:
userSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: false });
        next();
    });
});
// create an pre hook to hide deleted User:
userSchema.pre("findOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.findOne({ isDeleted: false });
        next();
    });
});
// create an pre hook to hide delete dUser:
userSchema.pre("aggregate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.pipeline().unshift({ $match: { isDeleted: false } });
        next();
    });
});
// create an static method to check User Exits or not ?
userSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const isUserExists = yield User.findOne({ userId }, { password: 0, _id: 0, __v: 0, orders: 0, isDeleted: 0 });
        return isUserExists;
    });
};
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
