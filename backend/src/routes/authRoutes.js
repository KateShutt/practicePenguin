import express from "express";
// import { isValidEmail } from "../../../shared/validation/email.js";

import { validateRegister } from "../validation/validateRegister.js";

import { registerController } from "../controllers/registerController.js";

import { validateLogin } from "../validation/validateLogin.js";

import { loginController } from "../controllers/loginController.js";

const router = express.Router();

router.post("/register", validateRegister, registerController, (req, res) => {
  console.log(req.body); // checks that data has been successfully received from FE

  const formData = req.body || {};
});

router.post("/login", validateLogin, loginController, (req, res) => {
  console.log(req.body);

  const formData = req.body || {};
});

export default router;
