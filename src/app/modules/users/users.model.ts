import { Schema, model } from "mongoose";
import {
  IAddress,
  IFullName,
  IOrder,
  IUserModel,
  TUser,
} from "./users.interface";
import bcrypt from "bcrypt";
import configs from "../../configs";
const fullNameSchema = new Schema<IFullName>(
  {
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
  },
  {
    _id: false,
  },
);

const addressSchema = new Schema<IAddress>(
  {
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
  },
  {
    _id: false,
  },
);

const orderSchema = new Schema<IOrder>(
  {
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
  },
  {
    _id: false,
  },
);

const userSchema = new Schema<TUser, IUserModel>({
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
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(configs.bcrypt_solts_round),
  );
  next();
});

// remove password with post hook:
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

// create an pre hook to hide deleted User:
userSchema.pre("find", async function (next) {
  this.find({ isDeleted: false });
  next();
});

// create an pre hook to hide deleted User:
userSchema.pre("findOne", async function (next) {
  this.findOne({ isDeleted: false });
  next();
});

// create an pre hook to hide delete dUser:
userSchema.pre("aggregate", async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: false } });
  next();
});

// create an static method to check User Exits or not ?
userSchema.statics.isUserExists = async function (userId: string) {
  const isUserExists = await User.findOne(
    { userId },
    { password: 0, _id: 0, __v: 0, orders: 0, isDeleted: 0 },
  );

  return isUserExists;
};

const User = model<TUser, IUserModel>("User", userSchema);

export default User;
