import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    Title: { type: String, required: true },
    Content: { type: String, required: true },
    Likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Boolean, default: false },
    userId: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Post = model('Post', postSchema);

export default Post;