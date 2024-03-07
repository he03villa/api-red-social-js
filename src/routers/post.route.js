import { Router } from "express";
import PostController from "../controllers/post.controller.js";
import { ensureAuth } from "../middlewares/autenticated.middleware.js";
import { validaRequest } from "../middlewares/validarrequest.middleware.js";
import UserValidator from "../validators/user.validator.js";
import PostValidator from "../validators/post.validator.js";

const postRouter = Router();
const postController = new PostController();
const userValidator = new UserValidator();
const postValidator = new PostValidator();

postRouter.get(
    '/getAllPost',
    ensureAuth,
    postController.getAllPost
);

postRouter.post(
    '/savePost',
    ensureAuth,
    userValidator.validarUserToken,
    postValidator.savePost,
    validaRequest,
    postController.savePost
);

postRouter.put(
    '/updatePost/:id',
    ensureAuth,
    postValidator.updatePost,
    postValidator.id,
    validaRequest,
    postController.updatePost
);

postRouter.delete(
    '/deletePost/:id',
    ensureAuth,
    postValidator.id,
    validaRequest,
    postController.deletePost
);

postRouter.put(
    '/likePost/:id',
    ensureAuth,
    postValidator.id,
    validaRequest,
    postController.likePost
);

export default postRouter;