import { Router } from "express";
import { usersRouter } from "./User";

const router = Router();

router.use("/user", usersRouter);

export { router as MainRoute };
