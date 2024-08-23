import { Schema, model, models } from "mongoose";

export interface TopicDocument {
    title: string;
    content: string;
    author: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const TopicSchema = new Schema<TopicDocument>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true,
});

const Topic = models.Topic || model<TopicDocument>("Topic", TopicSchema);
export default Topic;
