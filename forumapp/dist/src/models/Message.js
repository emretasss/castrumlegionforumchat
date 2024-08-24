"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var messageSchema = new mongoose_1.default.Schema({
    username: String,
    message: String,
    roomId: String,
}, {
    timestamps: true, // CreatedAt ve UpdatedAt alanlarını otomatik olarak ekler
});
var Message = mongoose_1.default.model('Message', messageSchema);
exports.default = Message;
