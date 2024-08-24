"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CommentSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    topic: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Topic",
        required: true,
    }
}, {
    timestamps: true,
});
var Comment = mongoose_1.models.Comment || (0, mongoose_1.model)("Comment", CommentSchema);
exports.default = Comment;
