require("dotenv").config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return { EC: 1, EM: "Email đã tồn tại" };

        const hashPassword = await bcrypt.hash(password, saltRounds);
        let result = await User.create({ name, email, password: hashPassword, role: "User" });
        return { EC: 0, EM: "Đăng ký thành công", user: result };
    } catch (error) {
        return { EC: -1, EM: "Lỗi hệ thống" };
    }
};

const loginService = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return { EC: 1, EM: "Email/Password không hợp lệ" };

        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) return { EC: 2, EM: "Email/Password không hợp lệ" };

        const payload = { email: user.email, name: user.name };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

        return { EC: 0, access_token, user: { email: user.email, name: user.name } };
    } catch (error) {
        return { EC: -1, EM: "Lỗi hệ thống" };
    }
};

const forgotPasswordService = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return { EC: 1, EM: "Email không tồn tại" };

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 giờ
        await user.save();

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: { 
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS 
            }
        });

        const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Khôi phục mật khẩu',
            html: `<p>Truy cập đường dẫn sau để đặt lại mật khẩu (có hiệu lực 1 giờ): <a href="${resetURL}">${resetURL}</a></p>`
        });

        return { EC: 0, EM: "Email khôi phục đã được gửi" };
    } catch (error) {
        console.error("Email sending error:", error);
        return { EC: -1, EM: "Lỗi gửi email" };
    }
};

const resetPasswordService = async (token, newPassword) => {
    try {
        const user = await User.findOne({ where: { resetPasswordToken: token } });
        if (!user || user.resetPasswordExpires < Date.now()) {
            return { EC: 1, EM: "Token không hợp lệ hoặc hết hạn" };
        }

        user.password = await bcrypt.hash(newPassword, saltRounds);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        return { EC: 0, EM: "Cập nhật mật khẩu thành công" };
    } catch (error) {
        return { EC: -1, EM: "Lỗi hệ thống" };
    }
};

module.exports = { createUserService, loginService, forgotPasswordService, resetPasswordService };