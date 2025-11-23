const User = require("../Model/user");
const Post = require("../Model/Post");
const Story = require("../Model/Story");
const FoodPost = require("../Model/Foodpost");
const Account  =  require("../Model/Account")



module.exports.signup = async (req, res) => {
    try {
        const { Name, Email, Password } = req.body;
        let newUser = new User({
            name:Name,
            username: Email,
        });
        await User.register(newUser, Password);
       let user =  await newUser.save();
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id : user._id,
                Name: Name,
                username: user.username,
                profileImg: user.profileImg,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(200).json({
            success: false,
            message: "Error during signup",
            error: err.message,
        });
    }
};
module.exports.login = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(200).json({
                success: false,
                message: "Authentication failed",
            });
        }
        console.log(req.user._id)
        let usesss= await User.findById(req.user._id)
        console.log(usesss)
        res.status(200).json({
            success: true,
            message: "Login successful",

            user: {
                _id : req.user._id,
                name: req.user.name,
                username: req.user.username,
                profileImg: usesss.profileImage,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error during login",
            error: err.message,
        });
    }
};
module.exports.changepassword = async (req, res) => {
    const { username, currentPassword, newPassword } = req.body;

    try {
        const user = await User.findOne({ username });
console.log("a")
        if (!user) {
            console.log(1)
            return res.status(200).json({
                success: false,
                message: 'User not found',
            });
        }
        user.authenticate(currentPassword, async (err, isMatch) => {
            if (err) {
                console.log(2)
                console.error('Error during authentication:', err);
                return res.status(200).json({
                    success: false,
                    message: 'Authentication error',
                    error: err.message,
                });
            }

            if (!isMatch) {
                console.log(3)
                return res.status(200).json({
                    success: false,
                    message: 'Current password is incorrect',
                });
            }
            user.setPassword(newPassword, async (err) => {
                if (err) {
              
                    console.error('Error setting new password:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Error setting new password',
                        error: err.message,
                    });
                }
                await user.save();
       
                return res.status(200).json({
                    success: true,
                    message: 'Password updated successfully',
                });
            });
        });
    } catch (error) {
        console.error('Error changing password:', error);

        return res.status(200).json({
            success: false,
            message: 'Error changing password',
            error: error.message,
        });
    }
};
