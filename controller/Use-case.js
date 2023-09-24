const UseCaseModel = require("../model/Use-cases");
const { message } = require("../common/Message");



//save header data
const createHeaderData = async (req, res) => {
    try {
        const { title } = req.body
        console.log("req.body", req.body)
        const headerData = await UseCaseModel.create({
            title
        })
        if (req.files) {
            let file = "";
            req.files.forEach(function (files, index, arr) {
                file = file + files.filename + "," + process.env.BASE_URL; 
            });
            file = file.substring(0, file.lastIndexOf(","))
            headerData.image = process.env.BASE_URL + file;
        }
        await headerData.save();
        console.log("headerData", headerData)
        return res.status(200).json({
            message: message.HEADER_CREATED,
            data: headerData
        })
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
}

//get header data - Id
const getheaderData = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        console.log("params", params)
        const getData = await UseCaseModel.findOne({ _id: id });
        console.log("getData", getData);
        if (getData) {
            return res.status(200).json({
                message: message.GET_HEADER, 
                data: getData, 
            });
        }
        return res.status(404).json({
            message: message.DATA_NOT_FOUND,  
        });  
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE, 
        });
    }
};

// save image icon data
const imageIcon = async (req, res) => {
    try {
        const { imageIconName } = req.body
        const createImageIcon = await UseCaseModel.create({
            imageIconName
        })
        if (req.files) {
            let file = "";
            req.files.forEach(function (files, index, arr) {
                file = file + files.filename + "," + process.env.BASE_URL; 
            });
            file = file.substring(0, file.lastIndexOf(","))
            createImageIcon.image = process.env.BASE_URL + file; 
        }
        await createImageIcon.save(); 
        return res.status(200).json({
            message: message.IMAGEICON_ADDED,
            data: createImageIcon
        })
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        })
    }
}

//get image icon data -Id
const getImageIcon = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        const getIconData = await UseCaseModel.findOne({ _id: id })
        console.log("getIconData", getIconData);
        if (getIconData) {
            return res.status(200).json({
                message: message.GET_IMAGEICON,
                data: getIconData,
            });
        }
        return res.status(404).json({
            message: message.DATA_NOT_FOUND,
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        })
    }
}

//save section data
const createSectionData = async (req, res) => {
    try {
        const { title, imageIconName } = req.body
        const sectionData = await UseCaseModel.create({
            title,
            imageIconName
        })
        if (req.files) {
            let file = "";
            req.files.forEach(function (files, index, arr) {
                file = file + files.filename + "," + process.env.BASE_URL;
            });
            file = file.substring(0, file.lastIndexOf(","))
            sectionData.image = process.env.BASE_URL + file;
        }
        await sectionData.save();
        return res.status(200).json({
            message: message.SECTION_ADDED,
            data: sectionData
        })
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        })
    }
}

//get section -Id 
const sectionData = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        const sectionDataGet = await UseCaseModel.findOne({ _id: id })
        console.log("section>>>>", sectionData)
        if (sectionDataGet) {
            return res.status(200).json({
                message: message.GET_SECION,
                data: sectionDataGet,
            });
        }
        return res.status(404).json({
            message: message.DATA_NOT_FOUND,
        });
    } catch (error) {
        console.log("error__________", error)
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        })
    }
}

//save services data 
const createServices = async (req, res) => {
    try {
        const { services } = req.body
        const servicesData = await UseCaseModel.create({
            services
        })
        console.log("serviceData..........", servicesData)
        return res.status(200).json({
            message: message.SERVICE_DATA_ADDED,
            data: servicesData
        })

    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        })
    }
}

//get services data-Id
const getServices = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        const serviceData = await UseCaseModel.findOne({ services: { $elemMatch: { _id: id } } })
        if (serviceData) {
            return res.status(200).json({
                message: message.GET_SERVICE,
                data: serviceData
            })
        }
        return res.status(404).json({
            message: message.DATA_NOT_FOUND,
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        })
    }
}

//save paragraph data 
const createParagraphData = async (req, res) => {
    try {
        const { title, paragraph } = req.body
        const paragraphData = await UseCaseModel.create({
            title,
            paragraph
        });
        console.log("paragraph................", paragraphData)
        return res.status(200).json({
            message: message.PARAGRAPH_ADDED,
            data: paragraphData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

//get paragraph data-Id
const getData = async (req, res) => {
    try {
        const { params } = req
        const { id } = params
        const getParagraph = await UseCaseModel.findOne({ _id: id })
        if (getParagraph) {
            return res.status(200).json({
                message: message.GET_PARAGRAPH_DATA,
                data: getParagraph,
            });
        }
        return res.status(404).json({
            message: message.DATA_NOT_FOUND,
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        })
    }
}

//save content data
const createContentData = async (req, res) => {
    try {
        const { content } = req.body
        const contentData = await UseCaseModel.create({
            content
        })
        if (req.files) {
            let file = "";
            req.files.forEach(function (files, index, arr) {
                file = file + files.filename + "," + process.env.BASE_URL;
            });
            file = file.substring(0, file.lastIndexOf(","))
            contentData.image = process.env.BASE_URL + file;
        }
        await contentData.save();
        return res.status(200).json({
            message: message.CONTENT_ADDED,
            data: contentData
        })
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        })
    }
}

//get content data - Id
const getContent = async (req, res) => {
    try {
        const { params } = req
        const { id } = params
        const contentData = await UseCaseModel.findOne({ content: { $elemMatch: { _id: id } } })
        if (contentData) {
            return res.status(200).json({
                message: message.GET_CONTENT,
                data: contentData
            })
        }
        return res.status(404).json({
            message: message.DATA_NOT_FOUND,
        });

    } catch (error) {
        return res.status(200).json({
            message: message.ERROR_MESSAGE
        })
    }
}

//get use-Case all data
const getUseCaseList = async (req, res, next) => {
    try {
        const { page = 1, limit = 10,sort,sortBy } = req.query;

        console.log("sort..", sort);
        let sortOrder = { [sortBy]: sort === "desc" ? -1 : 1 };

        let condition = {};
        const getList = await UseCaseModel.find(condition)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort(sortOrder);
        const totalgetList = await UseCaseModel.countDocuments(condition);
        if (!totalgetList) {
            return res.status(400).json({
                message: message.DATA_NOT_FOUND,
            });
        }
        return res.status(200).json({
            TotalgetList: totalgetList,
            message: message.BLOG_DATA_LIST,
            getList,
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};



module.exports = {
    createHeaderData,
    getheaderData,
    imageIcon,
    getImageIcon,
    createSectionData,
    sectionData,
    createServices,
    getServices,
    createParagraphData,
    getData,
    createContentData,
    getContent,
    getUseCaseList
}
