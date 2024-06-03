import express from "express";
import UsersController from "../controllers/userController.js";
const UserRouter = express.Router();
UserRouter.get("/", UsersController.getList);
UserRouter.get("/:id", UsersController.getById);
UserRouter.post("/", UsersController.add);
UserRouter.put("/:id", UsersController.update);
UserRouter.delete("/:id", UsersController.delete);

export default UserRouter;
