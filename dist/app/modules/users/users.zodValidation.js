"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const fullNameValidationSchema = zod_1.default.object({
    firstName: zod_1.default.string().trim(),
    lastName: zod_1.default.string().trim(),
});
const addressValidationSchema = zod_1.default.object({
    street: zod_1.default.string().trim(),
    city: zod_1.default.string().trim(),
    country: zod_1.default.string().trim(),
});
exports.orderValidationSchema = zod_1.default.object({
    productName: zod_1.default.string().trim(),
    price: zod_1.default.number().min(0),
    quantity: zod_1.default.number().min(0),
});
const userValidationSchema = zod_1.default.object({
    userId: zod_1.default.number().min(1),
    username: zod_1.default.string().trim(),
    password: zod_1.default.string().trim(),
    fullName: fullNameValidationSchema,
    age: zod_1.default.number().min(1),
    email: zod_1.default.string().email(),
    isActive: zod_1.default.boolean().default(true),
    hobbies: zod_1.default.array(zod_1.default.string().trim()),
    address: addressValidationSchema,
    orders: zod_1.default.array(exports.orderValidationSchema).optional(),
    isDeleted: zod_1.default.boolean().default(false).optional(),
});
exports.default = userValidationSchema;
