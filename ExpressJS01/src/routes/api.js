const express = require('express');
const { createUser, handleLogin, forgotPassword, resetPassword } = require('../controllers/userController');
const auth = require('../middleware/auth');

const routerAPI = express.Router();

routerAPI.use(auth);
routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.post("/forgot-password", forgotPassword);
routerAPI.post("/reset-password/:token", resetPassword);

module.exports = routerAPI;