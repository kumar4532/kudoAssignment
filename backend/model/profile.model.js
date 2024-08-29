import mongoose from "mongoose";
import User from "./user.model.js";

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: User
    },
    education: {
        type: String,
        required: true
    },
    experience: {
        type: String
    },
    skills: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Profile = new mongoose.model("profile", profileSchema)

export default Profile;