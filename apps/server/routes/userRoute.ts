import express from "express"
import { deleteUser, getAllUsers, loginUser, registerUser } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/signup", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/all-users", getAllUsers)

userRouter.delete("/delete-user", deleteUser);

export default userRouter;