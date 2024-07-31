"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../zod/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../modals/User");
const authRouter = express_1.default.Router();
authRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = auth_1.loginSchema.parse(req.body);
        const foundUser = yield User_1.User.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: foundUser.id }, process.env.JWT_SECRET, { expiresIn: "6h" });
        res.status(200).json({ token, user: foundUser });
    }
    catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
authRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password } = auth_1.registerSchema.parse(req.body);
        const foundUser = yield User_1.User.findOne({ email });
        if (foundUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.User({ email, name, password: hashedPassword });
        yield newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("Error in register controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = authRouter;
