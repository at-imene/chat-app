import cloudinary from "../lib/cloudinary.js";
import { comparePassword, generateToken, hashPassword } from "../lib/utils.js";
import userModel from "../models/user.model.js";
 
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) return res.status(400).json({ message: "All fields are requires!" })

    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 charachers." });

    const user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists." });

    try {
        const hashedPassword = await hashPassword(password);
        const newUser = await userModel.create({
            email,
            fullName,
            password: hashedPassword,
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                messgae: "user created successfuly", data: {
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    profilePic: newUser.profilePic
                }
            })
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("console in signup controller: ", error);
        return res.status(500).json({ message: "Internal server error." })
    }

}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).json({message: "All fileds are required."});
        const user = await userModel.findOne({email});
        if(user){
            const isCorrectPassword = await comparePassword(password, user.password);
            if(!isCorrectPassword) return res.status(400).json({messgae: "Bad credentials"});

            generateToken(user._id, res);
            return res.status(200).json({message: "You have logged in successfully", data:{
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic
            }});

        }else{
            return res.status(400).json({message: "Bad credentials."});
        }

    } catch (error) {
        console.log("signup error: ", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const logout = (req, res) => {
    try {
        res.cookies("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully."})
    } catch (error) {
        console.log("logout error : ", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message: "Profile pic is required."})
        }

        const uploadResponse = await cloudinary.uploader(profilePic)
        const updatedUser = await userModel.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true})

    } catch (error) {
        console.log("Error in updating profile : ", error)
        return res.status(500).json({message: "Internal Server Error"})
    }

}

export const checkAuth = (req, res)=>{
    try {
        res.status(200).json(res.user);
    } catch (error) {
        console.log('error on checkAuth');
        res.status(500).json({message: "Internal Server Error"});
    }
}