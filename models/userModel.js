
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "new user"
    },
    email: {
        type: String,
        required: true,
        default: "admin123@gmail.com",
        unique: true  // Adding a unique constraint for better data integrity
    },
    password: {
        type: String,
        required: true,
        default: "123456",
        unique: true 
    },
    links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }]
});

const User = mongoose.model("User", UserSchema);

export default User;

