import User from "../model/user.model.js"
import generateTokenAndSetCookies from "../utils/generateTokens.js"

const signup = async(req, res) => {
    try {
        const {fullname, email, password} = req.body

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json("User already exits");
        }

        const newUser = await User({fullname, email, password})

        generateTokenAndSetCookies(newUser._id, res);

        await newUser.save();

        res
        .status(200)
        .json({
            message: "User signed up",
            newUser
        })
        
    } catch (error) {
        console.log("Error while signup", error);
        throw new error;
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body

        if (!email || !password) {
            console.log("Enter all the fields correctly");
        }

        const user = await User.findOne({
            email
        })

        if (password !== user?.password) {
            return res.status(400).json("Please enter correct password");
        }

        generateTokenAndSetCookies(user._id, res);

        return res
        .status(200)
        .json({
            message: "Login success",
            user
        })
    } catch (error) {
        console.log("Error while login", error);
        throw new error;        
    }
}

const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        return res.status(200).json({
            message:"Logout successfully",
        })
    } catch (error) {
        console.log("Error in logout controller", error);
        throw error;
    }
}


export {
    signup,
    login,
    logout
}