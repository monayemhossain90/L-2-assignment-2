import express, { Router } from "express";
import { UserController } from "./users.controller";

const router: Router = express.Router();

router
  .route("/:userId/orders/total-price")
  .get(UserController.getTotalPriceByUserId);

router
  .route("/:userId/orders")
  .put(UserController.createAnOrderById)
  .get(UserController.getAllOrdersById);

router
  .route("/:userId")
  .get(UserController.getSingleUser)
  .delete(UserController.deleteUserById)
  .put(UserController.updateUserById);

router
  .route("/")
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

export const userRouter = router;
