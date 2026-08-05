const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const transporter = require("../config/mail");
const logActivity = require("../utils/activityLogger");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }
        if (password.length > 20) {
            return res.status(400).json({
                success: false,
                message: "Password cannot exceed 20 characters"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: userResponse,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    };
}

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        if (user.role !== "admin" && user.role !== "teacher") {
            return res.status(403).json({
                success: false,
                message: "Only Admin and Teacher can login",
            });
        }
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );
        await logActivity({
            userId: user._id,
            action: "Login",
            module: "Authentication",
            description: `${user.name} logged into the system`,
            ipAddress: req.ip,
        });
        return res.status(200).json({
            success: true,
            message: "Login API Working",
            token,
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const forgotPassword = async (req, res, next) => {
    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        user.resetPasswordToken = resetToken;

        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
        await user.save();
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            html: `
        <h2>Password Reset</h2>

        <p>Hello ${user.name},</p>

        <p>You requested to reset your password.</p>

        <p>Click the button below:</p>

        <a
            href="${resetUrl}"
            style="
                background:#2563eb;
                color:white;
                padding:12px 20px;
                text-decoration:none;
                border-radius:6px;
                display:inline-block;
            "
        >
            Reset Password
        </a>

        <p>This link expires in 15 minutes.</p>

        <p>If you didn't request this, ignore this email.</p>
    `,
        });
        return res.status(200).json({
            success: true,
            message: "Reset Link Sent successfully.",
        });

    } catch (error) {
        next(error);
    }
};
const resetPassword = async (req, res, next) => {
    try {

        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid reset token",
            });
        }

        if (user.resetPasswordExpire < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Reset token has expired",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {
        next(error);
    }
};
module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
};