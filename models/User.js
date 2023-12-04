import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['admin', 'seller', 'buyer'],
        default: 'buyer'
    },
    userID: {
        type: String,
        required: true,
        unique: true
    },
    birthDate: String,
    address: String,
}, { });

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
