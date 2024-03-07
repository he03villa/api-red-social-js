import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import UserValidator from "../validators/user.validator.js";
import { ensureAuth } from "../middlewares/autenticated.middleware.js";
import { validaRequest } from "../middlewares/validarrequest.middleware.js";

const userRouter = Router();
const userController = new UserController();
const userValidator = new UserValidator();

userRouter.post(
    '/saveUser',
    userValidator.saveUsuario,
    userValidator.existeUser,
    validaRequest,
    userController.saveUsuario
);

userRouter.post(
    '/login',
    userValidator.login,
    validaRequest,
    userController.login
);

userRouter.put(
    '/actulizarUsuario/:id',
    ensureAuth,
    userValidator.id,
    userValidator.updateUsuario,
    userValidator.validarUserToken,
    validaRequest,
    userController.updateUsuario
);

export default userRouter;