import mongoose, { Document, Schema, Types } from "mongoose";
const messageSchmea = new Schema({
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    sender: {
        type: String,
        required: true
    },
    text: String,
    image: {
        url: String,
        publicId: String,
    },
    messageType: {
        type: String,
        enum: ["text", "image"],
        default: "text",
    },
    seen: {
        type: Boolean,
        default: false
    },
    seenAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true
});
const Messages = mongoose.model("Messages", messageSchmea);
export default Messages;
//# sourceMappingURL=messages.js.map