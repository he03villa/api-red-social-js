import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    FullName: { type: String, required: true },
    Age: { type: Number, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Boolean, default: false },
});

const User = model('User', userSchema);

export default User;