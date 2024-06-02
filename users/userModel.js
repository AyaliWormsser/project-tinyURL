
import mongoose from "mongoose";
import { LinkSchema } from "../links/linkModel.js";  // Adjust the import path according to your project structure

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
        default: "123456"
    },
    links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }]
    // links: Array
    // [LinkSchema]  // Directly use LinkSchema
});

const User = mongoose.model("User", UserSchema);

export default User;

