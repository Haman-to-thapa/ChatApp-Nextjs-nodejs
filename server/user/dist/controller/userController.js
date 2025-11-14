import { generateToken } from "../config/generateToken.js";
import { publishToQueue } from "../config/rabbitmq.js";
import TryCatch from "../config/tryCatch.js";
import { redisClient } from "../index.js";
import User from "../model/user.js";
export const loginUser = TryCatch(async (req, res) => {
    const { email } = req.body;
    const rateLimitKey = `otp:ratelimit:${email}`;
    const rateLimit = await redisClient.get(rateLimitKey);
    if (rateLimit) {
        res.status(429).json({ message: "Too many requests, Please wait before requesting new otp" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpKay = `otp:${email}`;
    await redisClient.set(otpKay, otp, {
        EX: 300,
    });
    await redisClient.set(rateLimitKey, "true", {
        EX: 60,
    });
    const message = {
        to: email,
        subject: "Your otp code",
        body: `Your OTP is ${otp}. It is valid for 5 minutes`
    };
    await publishToQueue("send-otp", message);
    return res.status(200).json({
        message: "OTP end to you email"
    });
});
export const verifyUser = TryCatch(async (req, res) => {
    const { email, otp: enterOtp } = req.body;
    if (!email || !enterOtp) {
        return res.status(400).json({
            message: "Email and OTP Required"
        });
    }
    // otp find here
    const otpKey = `otp:${email}`;
    const storedOtp = await redisClient.get(otpKey);
    if (!storedOtp || storedOtp !== enterOtp) {
        return res.status(400).json({
            message: "Inavalid or expired OTP"
        });
    }
    // if otp is right 
    await redisClient.del(otpKey);
    let user = await User.findOne({ email });
    if (!user) {
        const name = email.slice(0, 8);
        user = await User.create({
            name, email
        });
    }
    const token = generateToken(user);
    return res.json({
        message: "User verified",
        user,
        token
    });
});
export const myProfile = TryCatch(async (req, res) => {
    const user = req.user;
    if (!user) {
        res.status(404).json({
            message: "user not found"
        });
        return;
    }
    res.json(user);
});
export const updateName = TryCatch(async (req, res) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
        res.status(404).json({
            message: "Please login",
        });
        return;
    }
    user.name = req.body.name;
    await user.save();
    const token = generateToken(user);
    res.json({
        message: "User Updated",
        user,
        token
    });
});
export const getAllUsers = TryCatch(async (req, res) => {
    const users = await User.find();
    if (!users) {
        res.status(404).json({
            message: "Not found getAllUsers"
        });
        return;
    }
    res.json(users);
});
export const getAUser = TryCatch(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404).json({
            message: "not found getUser"
        });
        return;
    }
    res.json(user);
});
//# sourceMappingURL=userController.js.map