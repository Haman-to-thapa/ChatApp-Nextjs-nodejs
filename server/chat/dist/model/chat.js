import mongoose, { Document, Schema } from "mongoose";
const chatSchema = new Schema({
    users: [{ type: String, required: true }],
    latestMessage: {
        text: String,
        sender: String,
    },
}, {
    timestamps: true
});
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
//# sourceMappingURL=chat.js.map