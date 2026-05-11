const { createUserService, loginService, forgotPasswordService, resetPasswordService } = require("../services/userService");

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const data = await createUserService(name, email, password);
    return res.status(200).json(data);
};

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    return res.status(200).json(data);
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const data = await forgotPasswordService(email);
    return res.status(200).json(data);
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    const data = await resetPasswordService(token, newPassword);
    return res.status(200).json(data);
};

module.exports = { createUser, handleLogin, forgotPassword, resetPassword };