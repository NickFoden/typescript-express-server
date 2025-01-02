import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.status(200).json({ msg: "User router is up and running" });
});

userRouter.get("/new", (req, res) => {
  res.status(200).json({ msg: "User router is up and running" });
});

export default userRouter;
