import { Schema, model, models } from "mongoose";

export interface CommentDocument {
    content: string;
    author: Schema.Types.ObjectId;
    topic: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema = new Schema<CommentDocument>({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    topic: {
        type: Schema.Types.ObjectId,
        ref: "Topic",
        required: true,
    }
}, {
    timestamps: true,
});

const Comment = models.Comment || model<CommentDocument>("Comment", CommentSchema);
export default Comment;
