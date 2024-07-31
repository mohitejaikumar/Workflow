"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoDB_1 = __importDefault(require("./db/mongoDB"));
const auth_1 = __importDefault(require("./routes/auth"));
const verifyToken_1 = __importDefault(require("./middleware/verifyToken"));
const todos_1 = __importDefault(require("./routes/todos"));
const port = process.env.PORT || 8080;
// dbConnect
(0, mongoDB_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/auth', auth_1.default);
app.use(verifyToken_1.default);
app.use('/todo', todos_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
