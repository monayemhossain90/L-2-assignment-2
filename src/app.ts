import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./app/modules/users/users.routes";
// create an application:
const app: Application = express();

// use cors :
app.use(cors());
app.use(express.json());

// main route of my server :
app.get("/", (req: Request, res: Response) => {
  res.status(200).send(`Server is running`);
});

// all  application routes:
app.use("/api/users", userRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: "Route not found ",
  });
});

export default app;
