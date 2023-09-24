const { message } = require("../common/Message")
const bcrypt = require("bcrypt")
//const jwt = require("jsonwebtoken")
const { genrateToken } = require("../common/token");
// const { hashSync } = require("bcrypt");
const AuthModelSchema = require("../model/AuthModelSchema")
const Joi = require("joi");


async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}


// var baseUrl = "http://infosense.tech:8000/public/";

// var baseUrl = "http://192.168.0.150:8000/public/"


//update user profile 
const updateAdminProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { file } = req;
        let image
        if (req.file) {
            image = process.env.BASE_URL + file.filename;
        } 
        // else {
        //     image = null;
        // }
        const { firstName, lastName } = req.body;
        console.log("req.body", req.body)
        const Admin = await AuthModelSchema.findOne({ _id: id })
        if (!Admin == Admin.id) {
            return res.send("Invalid Admin Id...")
        }
        await Admin.save();
        console.log("Admin!!!!!!!!!!!!!!!!!!!", Admin)
        const updateAdmin = await AuthModelSchema.findOneAndUpdate({ _id: id },
            { $set: { firstName: firstName, lastName: lastName, image: image } }, { new: true })

        console.log("updateAdmin.........", updateAdmin)
        return res.status(200).json({
            status: 200,
            message: message.ADMIN_PROFILE_UPDATE,
            updateAdmin
        })
    } catch (error) {
       // console.log("error----------------->", error)
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE
        });
    }
}

// login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("req.body.......", req.body)
        console.log("req.body", req.body)
        const schema = await Joi.object({
            email: Joi.string().email().required().messages({
                "string.empty": `email is a required field.`,
                "string.email": `please enter valid email.`
            }),
            password: Joi.string().min(8).max(16).required().messages({
                "string.empty": `Password is a required field.`,
                "string.min": `Password must be at least 8 characters long.`,
                "string.max": `Password must be at least 16 characters short.`
            })
        });
        const validation = schema.validate({
            email: email,
            password: password,
        });
        console.log("validation", validation);

        if (validation.error) {
            return res.status(422).send({
                status: 422,
                message: validation.error.details,
            });
        }
        const adminDetail = await AuthModelSchema.findOne({ email });
        console.log("adminDetails..........", adminDetail)
        if (!adminDetail) {
            return res.status(409).json({
                status: 409,
                message: message.EMAIL_PASSWORD_WRONG,
            })
        }
        const isPasswordCheck = await bcrypt.compare(password, adminDetail.password);
        if (!isPasswordCheck) {
            return res.status(422).json({
                status: 422,
                message: message.PASSWORD_NOT_MATCH
            });
        }
        const token = await genrateToken({
            id: adminDetail
        });

        res.cookie("adminSession", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        return res.status(200).json({
            status: 200,
            message: message.USER_LOGIN,
            token: token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE
        });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("adminSession");
        return res.status(200).json({
            status: 200,
            message: message.USER_LOGOUT,
        });
    } catch {
        console.log(error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        });
    }
}

//update password
const updatePassword = async (req, res) => {
    var id = req.body.id;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;
    const hashedPassword = await hashPassword(password, confirm_password);

    if (!password) {
        return res.status(402).json({
            message: message.PASSWORD_INCORRECT,
        });
    }
    if (!confirm_password) {
        return res.status(401).json({
            message: message.CONFIRM_PASSWORD
        });
    }
    if (password != confirm_password) {
        return res.status(403).json({
            message: message.PASSWORD_CHECKED,
        });
    }
    var data = await AuthModelSchema.findOneAndUpdate(
        { id: id },
        { $set: { password: hashedPassword, confirm_password: hashedPassword } }
    );
    console.log("data...........", data)
    if (!data) {
        return res.status(400).json({
            message: message.PASSWORD_NOT_UPDATED,
        });
    } else {
        return res.status(200).json({
            message: message.PASSWORD_UPDATED,
        });
    }
};

//change password
const changePassword = async (req, res) => {
    var id = req.body.id;
    // console.log("userId",userId)
    var oldPassword = req.body.oldPassword;
    var newPassword = req.body.newPassword;
    var confirmPassword = req.body.confirmPassword
    const schema = await Joi.object({
        oldPassword: Joi.string().min(8).max(16).required().messages({
            "string.empty": `Old Password is a required field.`,
            "string.oldPassword": `Please enter valid oldPassword.`,
            "string.min": `Old Password must be at least 8 characters long.`,
            "string.max": `Old Password must be at least 16 characters short.`
        }),
        newPassword: Joi.string().min(8).max(16).required().messages({
            "string.empty": `NewPassword is a required field.`,
            "string.min": `NewPassword must be at least 8 characters long.`,
            "string.max": `NewPassword must be at least 16 characters short.`
        }),
        confirmPassword: Joi.string().min(8).max(16).required().valid(Joi.ref('newPassword')).label('Confirm password')
            .messages({
                "string.empty": `confirmPassword is a required field.`,
                "string.min": `confirmPassword must be at least 8 characters long.`,
                "string.max": `confirmPassword must be at least 16 characters short.`,
                'any.only': ' New password and confirm password does not matched'
            })
    });
    const validation = schema.validate({
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
    });
    console.log("validation", validation);

    if (validation.error) {
        return res.status(422).send({
            status: 422,
            message: validation.error.details,
        });
    }

    // if (oldPassword == undefined || oldPassword == "") {
    //     return res.json({
    //         status: 403,
    //         message: "Please enter oldPassword"
    //     });
    // }
    // if (confirmPassword || newPassword == undefined && confirmPassword || newPassword == "") {
    //     return res.json({
    //         status: 403,
    //         message: "Please enter confirmPassword and newPassword"
    //     });
    // }
    // if (newPassword == undefined || newPassword == "") {
    //     return res.json({
    //         status: 403, message: "Please enter newPassword"
    //     });
    // }
    // if (confirmPassword == undefined || confirmPassword == "") {
    //     return res.json({
    //         status: 403, message: "Please enter confirmPassword"
    //     });
    // }
    // if (newPassword != confirmPassword) {
    //     return res.status(403).json({
    //         status: 403,
    //         message: message.PASSWORD_CHECKED,
    //     });
    // }
    var data = await AuthModelSchema.findOne({ id: id });
    console.log("data", data);

    const validOldPassword = await validatePassword(oldPassword, data.password);
    if (!validOldPassword)
        return res.status(409).json({
            status: 409,
            message: "Old passsword don't matched",
        });

    const hashedPassword = await hashPassword(newPassword);

    var result = await AuthModelSchema.findOneAndUpdate(
        { id: id },
        { $set: { password: hashedPassword, confirmpassword: newPassword } }
    );
    if (!result) {
        return res.json({
            status: 400,
            message: message.BAD_REQUEST
        });
    } else {
        return res.json({
            statusCode: 200,
            message: "password change successfully",
        });
    }
};

//get admin data
const getData = async (req, res) => {
    try {
        let result = await AuthModelSchema.find().select("-password");
        console.log("result....................", result)
        res.status(200).json({
            status: 200,
            success: true,
            message: "Admin Details",
            data: result
        });

    } catch {
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE
        });
    }

}
module.exports = {
    adminLogin,
    updateAdminProfile,
    logout,
    updatePassword,
    changePassword,
    getData

}