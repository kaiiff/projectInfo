const AuthModelSchema = require("../model/AuthModelSchema")
const bcrypt = require("bcrypt")
const { message } = require("../common/Message");

//user registration
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        const getUser = await AuthModelSchema.findOne({ email });
        if (getUser != null) {
            return res.status(409).json({
                message: message.EMAIL_ALREADY_EXISTS,
            })
        }
        // save the data in database of user 
        const user = await AuthModelSchema.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        return res.status(200).json({
            message: message.USER_REGISTRATION,
            data: user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

const updateAdminEmail = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("req.params", req.params);
      
      const { email} = req.body;
      console.log("req.body.............", req.body);
      const blog = await AuthModelSchema.findOne({ _id: id });
      if (!blog) {
        return res.send("Invalid blog Id...");
      }
      console.log("blog----------------", blog);
      await blog.save();
      const updateStory = await AuthModelSchema.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            email
          },
        },
        { new: true }
      );
      return res.status(200).json({
        status: 200,
        message: message.STORY_UPDATED,
        data: updateStory,
      });
    } catch (error) {
      console.log("error----------------->", error);
      return res.status(500).json({
        message: message.ERROR_MESSAGE,
      });
    }
  };


module.exports = {
    registerUser,
    updateAdminEmail
}