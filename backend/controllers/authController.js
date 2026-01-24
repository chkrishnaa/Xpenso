const jwt = require("jsonwebtoken");

const User = require("../models/User");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

exports.registerUser = async (req, res) => {
    const {fullName, email, password, profileImageUrl} = req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        })
    }

    try {
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            })
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });
        
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error Registering user: " + error.message,
        });
          
    }
}

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        })
    }

    try {
        const user = await User.findOne({email});

        if(!user || !await user.matchPassword(password)){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            })
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error logging in user: " + error.message,
        })


    }
}

exports.getUserDetails = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting user details: " + error.message,
        })
    }
}
