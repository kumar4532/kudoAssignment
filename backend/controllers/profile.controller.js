import Profile from "../model/profile.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const details = async(req, res) => {
    try {
        const { education, experience, skills } = req.body;
        const resume = req.file;
        const user = req.user?._id;

        if (!resume && !education && !skills) {
            return res.status(400).json("Please enter necessaryb fields");
        }

        const fileupload = await uploadOnCloudinary(resume.path);
        const fileUrl = fileupload.url;

        const profile = await Profile({user, education, experience, skills, resume:fileUrl})

        await profile.save();

        return res
        .status(200)
        .json({
            message: "Profile has been created",
            profile
        })  
    } catch (error) {
        console.log("Error while filling details", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default details;