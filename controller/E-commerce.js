const EcommerceModelSchema = require("../model/E-commerce");
const { message } = require("../common/Message")



//save e-commerce data
const createHeaderData = async (req, res) => {
    try {
        const { title, content } = req.body
        const createData = await EcommerceModelSchema.create({
            title: title,
            content: content
        })
        if (req.files) {
            let file = "";
            req.files.forEach(function (files, index, arr) {
                file = file + files.filename + "," + baseUrl;
            });
            file = file.substring(0, file.lastIndexOf(","))
            createData.image = baseUrl + file;
        }
        else {
            file = null;
        }
        await createData.save();
        return res.status(200).json({
            status: 200,
            message: message.HEADER_CREATED,
            Headerdata: createData
        })
    } catch (error) {
        console.log("error------------>>", error)
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE
        })
    }
}

// Get data for Header
const getheaderData = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        console.log("params", params)
        const headerDetails = await EcommerceModelSchema.findOne({ _id: id });
        console.log("headerDetails", headerDetails);
        if (headerDetails) {
            return res.status(200).json({
                status: 200,
                message: message.HEADERDETAILS_SUCCESS,
                data: headerDetails,
            });
        }
        return res.status(404).json({
            status: 404,
            message: message.DATA_NOT_FOUND,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
};

//save section data
const createSectionData = async (req, res) => {
    try {
        const { title, paragraph } = req.body
        const sectionData = await EcommerceModelSchema.create({
            title,
            paragraph
        })
        if (req.files) {
            let file = "";
            req.files.forEach(function (files, index, arr) {
                file = file + files.filename + "," + baseUrl;
            });
            file = file.substring(0, file.lastIndexOf(","))
            sectionData.image = baseUrl + file;
        }
        await sectionData.save();
        return res.status(200).json({
            status: 200,
            message: message.SECTION_ADDED,
            data: sectionData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
}

//get section data-Id
const getSectionData = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        console.log("params", params)
        const getData = await EcommerceModelSchema.findOne({ _id: id });
        console.log("getData", getData);
        if (getData) {
            return res.status(200).json({
                status: 200,
                message: message.GET_SECION,
                data: getData,
            });
        }
        return res.status(404).json({
            status: 404,
            message: message.DATA_NOT_FOUND,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
};

// card data save
const createCard = async (req, res) => {
    try {
        const { cards } = req.body
        const cardData = await EcommerceModelSchema.create({
            cards
        })
        return res.status(200).json({
            status: 200,
            message: message.CARD_ADDED,
            data: cardData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 200,
            message: message.ERROR_MESSAGE,
        });
    }
}

//get card data - Id
const getCardData = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        console.log("parms", params)
        const cardData = await EcommerceModelSchema.findOne({ cards: { $elemMatch: { _id: id } } })
        console.log("cardData", cardData)
        if (cardData) {
            return res.status(200).json({
                status: 200,
                message: message.GET_CARD,
                cardData
            });
        }
        return res.status(404).json({
            status: 404,
            message: message.DATA_NOT_FOUND,
        });
    } catch (error) {
        console.log("error............", error)
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
}


const createParagraph = async (req, res) => {
    try {
        const { title, content } = req.body
        const createData = await EcommerceModelSchema.create({
            title: title,
            content: content
        })
        if (req.files) {
            let file = "";
            req.files.forEach(function (files, index, arr) {
                file = file + files.filename + "," + baseUrl;
            });
            file = file.substring(0, file.lastIndexOf(","))
            createData.image = baseUrl + file;
        }
        await createData.save();
        return res.status(200).json({
            status: 200,
            message: message.PARAGRAPH_ADDED,
            data: createData
        })
    } catch (error) {
        console.log("error------------>>", error)
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE
        })
    }
}

//get paragraph data -Id
const getParagraph = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        console.log("params", params)
        const getParagraphData = await EcommerceModelSchema.findOne({ _id: id });
        console.log("getParagraphData---------------->", getParagraphData);
        if (getParagraphData) {
            return res.status(200).json({
                status: 200,
                message: message.GET_PARAGRAPH_DATA,
                data: getParagraphData,
            });
        }
        return res.status(404).json({
            status: 404,
            message: message.DATA_NOT_FOUND,
        });
    } catch (error) {
        console.log("error.......>", error)
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE
        })
    }
}

//card data save 
const cardData = async (req, res) => {
    try {
        const { cards } = req.body
        const saveCardData = await EcommerceModelSchema.create({
            cards
        })
        return res.status(200).json({
            status: 200,
            message: message.CARD_ADDED,
            data: saveCardData
        })
    } catch (error) {
        console.log("error_______________", error)
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE
        })
    }
}

const getCardsData = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        console.log("parms", params)
        const cardsGet = await EcommerceModelSchema.findOne({ cards: { $elemMatch: { _id: id } } })
        console.log("cardsGet", cardsGet)
        if (cardsGet) {
            return res.status(200).json({
                status: 200,
                message: message.GET_CARD,
                cardsGet
            });
        }
        return res.status(404).json({
            status: 404,
            message: message.DATA_NOT_FOUND,
        });
    } catch (error) {
        console.log("error............", error)
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
}

// get all data list 
const getEcommercList = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        let condition = {};
        const getList = await EcommerceModelSchema.find(condition)
            .limit(limit * 1)
            .skip((page - 1) * limit)
        const totalgetList = await EcommerceModelSchema.countDocuments(condition);
        if (!totalgetList) {
            return res.status(404).json({
                status: 404,
                message: message.DATA_NOT_FOUND,
            });
        }
        return res.status(200).json({
            status: 200,
            TotalgetList: totalgetList,
            message: message.BLOG_DATA_LIST,
            getList,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
};


module.exports = {
    createHeaderData,
    getheaderData,
    createSectionData,
    getSectionData,
    createCard,
    getCardData,
    createParagraph,
    getParagraph,
    cardData,
    getCardsData,
    getEcommercList
}
