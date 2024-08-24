"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email is invalid",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    },
    username: {
        type: String,
        required: [true, "Fullname is required"],
        minLength: [3, "fullname must be at least 3 characters"],
        maxLength: [25, "fullname must be at most 25 characters"],
    },
}, {
    timestamps: true,
});
var User = mongoose_1.models.User || (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
