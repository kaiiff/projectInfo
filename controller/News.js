const upload = require("../common/Upload");
const NewsModel = require("../model/News");
const { message } = require("../common/Message");

//created data
const createNews = async (req, res) => {
    try {
        const { file } = req;
        const { title, image, description, status, slug } = req.body
        const getNews = await NewsModel.create({
            title,
            image: file.filename,
            description,
            status, 
            slug
        });
        return res.status(200).json({
            message: message.NEWS_DATA_CREATED,
            data: getNews,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

//update data
const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", req.params)
        const { title, description, status, slug } = req.body
        console.log("req.body", req.body)
        const newsUpdate = await NewsModel.findOne({ id })
        // check if this id exist in database 
        if (newsUpdate !== newsUpdate.id) {
            return res.send("Invalid News Id...")
        }
        console.log("newsUpdate.id", newsUpdate, newsUpdate.id)
        const updateUser = await NewsModel.findOneAndUpdate({ _id: id },
            { $set: { title: title, description: description, status: status, slug: slug } }, { new: true })
        return res.status(200).json({
            message: message.NEWS_DATA_UPDATED,
            updateUser
        })
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE

        });
    }
}

//details data
const getNewsDetails = async (req, res) => {
    try {
        const { params } = req;
        const { slug } = params;
        const userDetails = await NewsModel.findOne({ slug: slug })
        console.log("userDetails", userDetails)
        if (userDetails) {
            return res.status(200).json({
                message: message.NEWS_DATA_DETAILS,
                userDetails
            });
        }
        return res.status(404).json({
            message: message.DATA_NOT_FOUND
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
}

//delete data
const deleteNews = async (req, res) => {
    try {
        const removeNewsData = await NewsModel.findByIdAndDelete({ _id: req.params.id },)
        if (removeNewsData) {
            return res.status(200).json({
                message: message.NEWS_DATA_DELETED,
            })
        } else {
            return res.status(200).json({
                message: message.ALREADY_DELETED,
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
}

module.exports = {
    createNews,
    updateNews,
    deleteNews,
    getNewsDetails
}