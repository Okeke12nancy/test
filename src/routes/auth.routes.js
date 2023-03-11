const express = require("express");
const router = express.Router();
import { AuthController } from "../controllers/auth.controllers";
import { auth } from "../middlewares/auth.middlewares";

import { isAuthorized } from "../middlewares/authorize.middleware";

const isAuthorized = new isAuthorized();
const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

// Create a new account
router.post("/signUp", authController.signUp);

// Sign in to account
router.post("/signIn", authController.signIn);

// Reset password , change uour password
router.post(authController.enterNewPassword);

module.exports = router;
