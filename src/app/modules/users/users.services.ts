import bcrypt from "bcrypt";
import { IOrder, TUser } from "./users.interface";
import User from "./users.model";
import configs from "../../configs";

const createUserIntoDB = async (userData: TUser) => {
  const user = await User.create(userData);
  return user;
};

const getUsersFromDB = async () => {
  const users = await User.aggregate([
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
};

const getSingleUserByIdFromDB = async (userId: number) => {
  // use  static method:
  const user = await User.isUserExists(userId);

  return user;
};

const updateUserByIdIntoDB = async (userId: number, userData: TUser) => {
  if (userData.password) {
    userData.password = await bcrypt.hash(
      userData.password,
      Number(configs.bcrypt_solts_round),
    );
  }
  const result = await User.findOneAndUpdate(
    { userId },
    { $set: userData },
    {
      runValidators: true,
      new: true,
      projection: { password: 0, __v: 0, _id: 0, isDeleted: 0, orders: 0 },
    },
  );

  return result;
};

const deleteUserByIdFromDB = async (userId: number) => {
  const result = await User.updateOne(
    { userId },
    { $set: { isDeleted: true } },
  );
  return result;
};

// place order services:
const createAnOrderByUserIdIntoDB = async (userId: number, order: IOrder) => {
  const result = await User.updateOne(
    { userId },
    { $push: { orders: order } },
    {
      runValidators: true,
    },
  );

  return result;
};

// get orders by UserId:
const getOrdersByIdFromDB = async (userId: number) => {
  const result = await User.aggregate([
    { $match: { userId } },
    { $project: { orders: 1, _id: 0 } },
  ]);

  return result;
};

//  get Total Order Price By userId:
const getTotalPriceByIdFromDB = async (userId: number) => {
  const result = await User.aggregate([
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
};

export const UserServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserByIdFromDB,
  deleteUserByIdFromDB,
  updateUserByIdIntoDB,
  createAnOrderByUserIdIntoDB,
  getOrdersByIdFromDB,
  getTotalPriceByIdFromDB,
};
