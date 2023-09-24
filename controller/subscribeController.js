const Subscribe = require("../model/subscribe");

const addSubscriber = async (req, res) => {
    try {
        const { email } = req.body;

        const isMailExit = await Subscribe.findOne({ email: email });

        if (isMailExit) {
            return res.status(400).json({
                status: 400,
                message: "User already exist",
            });
        }

        const result = new Subscribe({
            email: email,
        });

        await result.save();
        return res.status(200).json({
            statusCode: 200,
            message: "Subscriber added successfully",
            data: result,
        });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    addSubscriber,
};
