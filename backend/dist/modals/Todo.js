"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todos = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TodoSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ["To do", "In progress", "Under review", "Finished"], required: true },
    priority: { type: String, enum: ["Low", "Medium", "Urgent"], required: true },
    createdDate: { type: Date, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
});
exports.Todos = mongoose_1.default.model('Todos', TodoSchema);
