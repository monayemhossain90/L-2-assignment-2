/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import userValidationSchema, {
  orderValidationSchema,
} from "./users.zodValidation";
import { UserServices } from "./users.services";

// create user:

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const validateUser = userValidationSchema.parse(userData);

    // post the validateUser data:
    const user = await UserServices.createUserIntoDB(validateUser);

    const { password, isDeleted, _id, orders, ...others } = user.toObject();


    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: others,
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message || "user not created successfully",
      error: {
        code: 500,
        description: err,
      },
    });
  }
};

// get all user:
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserServices.getUsersFromDB();

    res.status(200).send({
      success: true,
      message: "Users fetched successfully!",
      data: users,
    });
  } catch (err: unknown) {
    res.status(500).send({
      success: false,
      message: "User not found!",
      error: {
        code: 500,
        description: "User not found!",
      },
    });
  }
};

// retrieve single user by userId:
const getSingleUser = async (req: Request, res: Response) => {
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

    const user = await UserServices.getSingleUserByIdFromDB(userId);

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
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
      error: {
        code: 500,
        description: err.message,
      },
    });
  }
};

// update user with Id :
const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const userData = req.body;

    const validateUserData = userValidationSchema.parse(userData);

    const user = await UserServices.getSingleUserByIdFromDB(userId);

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
    const result = await UserServices.updateUserByIdIntoDB(
      userId,
      validateUserData,
    );

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
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
      error: {
        code: 500,
        description: err.message,
      },
    });
  }
};

// deleteUserById:

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const user = await UserServices.getSingleUserByIdFromDB(userId);

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

    const result = await UserServices.deleteUserByIdFromDB(userId);

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
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
      error: {
        code: 500,
        description: err,
      },
    });
  }
};

// place an order :

const createAnOrderById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const orderData = req.body;

    const validateOrder = orderValidationSchema.parse(orderData);
    const user = await UserServices.getSingleUserByIdFromDB(userId);

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

    const result = await UserServices.createAnOrderByUserIdIntoDB(
      userId,
      validateOrder,
    );

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

// get all order by userId:
const getAllOrdersById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const user = await UserServices.getSingleUserByIdFromDB(userId);

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

    const result = await UserServices.getOrdersByIdFromDB(userId);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: {
        orders: result[0].orders,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

// get Total Price by UserId:
const getTotalPriceByUserId = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const user = await UserServices.getSingleUserByIdFromDB(userId);

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

    const result = await UserServices.getTotalPriceByIdFromDB(userId);

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice: result[0]?.totalPrice || 0,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUserById,
  updateUserById,
  createAnOrderById,
  getAllOrdersById,
  getTotalPriceByUserId,
};
