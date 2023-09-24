const IndustriesheaderModel = require("../model/IndustrieHeader");
const IndustrieSectionModel = require("../model/Industriesection")
const IndustrieCardModel = require("../model/IndustrieCard")
const { message } = require("../common/Message");
const IndustrieHelpModel = require("../model/IndustrieHelp");
const IndustrieParagraphModel = require("../model/IndustrieParagraph");
const IndustriesModel = require("../model/IndustrieModel");
const { errorMonitor } = require("nodemailer/lib/xoauth2");

const createdData = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(typeof (name), 12)
        const dataAdded = new IndustriesModel({
            name: name,
        });
        await dataAdded.save();
        return res.status(200).json({
            status: 200,
            message: "Created data successfully!",
            data: dataAdded,
        });
    } catch (error) {
        console.log("error------------", error)
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
};

//save header data
const createHeaderSection = async (req, res) => {
    try {
        const { title, description, industrieId } = req.body;
        const createData = new IndustriesheaderModel({
            title: title,
            description: description,
            industrieId: industrieId
        });
        if (req.files) {
            let file = "";
            req.files.forEach(function (files, index, arr) {
                file = file + files.filename + "," + process.env.BASE_URL;
            });
            file = file.substring(0, file.lastIndexOf(","));
            createData.image = process.env.BASE_URL + file;
        }
        await createData.save();
        return res.status(200).json({
            status: 200,
            message: message.HEADER_CREATED,
            data: createData,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
};

// Get data for Header
const HeaderGetData = async (req, res) => {
    try {
        const headerData = await IndustriesheaderModel.findOne()
            .populate("industrieId")
            .select("title description image");
        console.log("headerData------------", headerData)

        return res.status(200).json({
            status: 200,
            message: "header Data get successfully !",
            data: headerData,
        });
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
};

//update Industrie
const updateIndustrieData = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", req.params);
        const { file } = req;
        let image;
        if (req.file) {
            image = process.env.BASE_URL + file.filename;
        }

        const { title, description } = req.body;
        console.log("req.body.............", req.body);
        const Industries = await IndustriesheaderModel.findOne({ _id: id });
        if (!Industries) {
            return res.send("Invalid Id...");
        }
        console.log("Industries----------------", Industries);
        await Industries.save();
        const IndustriesData = await IndustriesheaderModel.findOneAndUpdate({ _id: id }, {
            $set: { title: title, description: description, image: image }
        }, { new: true });
        return res.status(200).json({
            message: "Industries Industries data updated",
            data: IndustriesData,
        });
    } catch (error) {
        console.log("error----------------->", error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};


const HeaderList = async (req, res) => {
    try {
        const headerDetails = await IndustriesheaderModel.find().sort({ createdAt: -1 });
        console.log("headerDetails", headerDetails);
        if (headerDetails) {
            return res.status(200).json({
                status: 200,
                message: "Industries list created successfully!",
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

//save contents data
const createIndustrieSection = async (req, res) => {
    try {
        const { title, content, industrieId } = req.body;
        let section = new IndustrieSectionModel({
            title,
            content,
            industrieId
        });
        if (req.files) {
            let file = "";
            req.files.forEach(function (files, index, arr) {
                file = file + files.filename + "," + process.env.BASE_URL;
            });
            file = file.substring(0, file.lastIndexOf(","));
            section.image = process.env.BASE_URL + file;
        }
        await section.save();
        console.log(section);
        return res.status(200).json({
            status: 200,
            success: true,
            message: message.SECTION_ADDED,
            data: section,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
};

// get slug card data
const getIndustrieData = async (req, res) => {
    try {
        const { params } = req;
        const { slug } = params;
        const getIndustrieSlug = await IndustriesModel.findOne({ slug: slug })
        var getIndustrieData = getIndustrieSlug.id
        const getSlugSectionData = await IndustrieSectionModel.find({ industrieId: getIndustrieData }).populate('industrieId')
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Industries Section data get successfully !",
            data: getSlugSectionData,
        });
    } catch (error) {
        console.log("error---------", error)
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
};


//update Industrie
const updateIndustrieSection = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", req.params);
        const { file } = req;
        let image;
        if (req.file) {
            image = process.env.BASE_URL + file.filename;
        }

        const { title, content } = req.body;
        console.log("req.body.............", req.body);
        const industriesSection = await IndustrieSectionModel.findOne({ _id: id });
        if (!industriesSection) {
            return res.send("Invalid Id...");
        }
        console.log("industriesSection----------------", industriesSection);
        await industriesSection.save();
        const IndustriesSectionData = await IndustrieSectionModel.findOneAndUpdate({ _id: id }, {
            $set: { title: title, content: content, image: image }
        }, { new: true });
        return res.status(200).json({
            message: "Industries Industries data updated",
            data: IndustriesSectionData,
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

//Industre section - list
const SectionList = async (req, res) => {
    try {

        const IndustrieSectionList = await IndustrieSectionModel.find().sort({ createdAt: -1 });
        console.log("IndustrieSectionList", IndustrieSectionList);
        if (IndustrieSectionList) {
            return res.status(200).json({
                status: 200,
                message: "Section data list created successfully!",
                data: IndustrieSectionList,
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

// save data for card
const cardIndustrieCreate = async (req, res) => {
    try {
        const { title, content, cards, industrieId } = req.body;
        let data = new IndustrieCardModel({
            title,
            content,
            cards,
            industrieId
        });
        let cardData = await data.save();
        if (cardData) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: message.CARD_ADDED,
                data: cardData,
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: message.DATA_NOT_FOUND,
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
};

// get slug card data
const getIndustrieCard = async (req, res) => {
    try {
        const { params } = req;
        const { slug } = params;
        const getIndustrieSlug = await IndustriesModel.findOne({ slug: slug })
        var getIndustrieData = getIndustrieSlug.id
        const getSlugCardData = await IndustrieCardModel.find({ industrieId: getIndustrieData }).populate('industrieId')
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Industries Card data get successfully !",
            data: getSlugCardData,
        });
    } catch (error) {
        console.log("error---------", error)
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
};

//update Industrie Card data - By Id
const updateIndustrieCards = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", req.params);
        const { title, content, cards } = req.body;
        const industriesSection = await IndustrieCardModel.findOne({ _id: id });

        if (!industriesSection) {
            return res.send("Invalid Id...");
        }
        console.log("industriesSection----------------", typeof (industriesSection));
        await industriesSection.save();
        const IndustriesSectionData = await IndustrieCardModel.findOneAndUpdate({ _id: id }, {
            $set: { title: title, content: content, cards: req.body.cards }
        }, { new: true });
        return res.status(200).json({
            status:200,
            message: "Industries Industries data updated",
            data: IndustriesSectionData,
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

//Industre section - list
const CardList = async (req, res) => {
    try {

        const IndustrieCardList = await IndustrieCardModel.find().sort({ createdAt: -1 });
        console.log("IndustrieCardList", IndustrieCardList);
        if (IndustrieCardList) {
            return res.status(200).json({
                status: 200,
                message: "Section data list created successfully!",
                data: IndustrieCardList,
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



//save data - help
const createHelpSectionData = async (req, res) => {
    try {
        const { title, paragraph, industrieId } = req.body;
        const dataHelp = new IndustrieHelpModel({
            title,
            paragraph,
            industrieId
        });
        if (req.files) {
            let file = "";
            req.files.forEach(function (files, index, arr) {
                file = file + files.filename + "," + process.env.BASE_URL;
            });
            file = file.substring(0, file.lastIndexOf(","));
            dataHelp.image = process.env.BASE_URL + file;
        }
        await dataHelp.save();
        return res.status(200).json({
            status: 200,
            message: message.HELP_ADDED,
            data: dataHelp,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
};


// get slug help data
const getIndustrieHelpData = async (req, res) => {
    try {
        const { params } = req;
        const { slug } = params;
        const getIndustrieSlug = await IndustriesModel.findOne({ slug: slug })
        var getIndustrieHelp = getIndustrieSlug.id
        const getSlugHelpData = await IndustrieHelpModel.find({ industrieId: getIndustrieHelp }).populate('industrieId')
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Industries Help data get successfully !",
            data: getSlugHelpData,
        });
    } catch (error) {
        console.log("error---------", error)
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
};
//update Industrie Card data - By Id
const updateIndustrieHelp = async (req, res) => {
    try {
        const { id } = req.params;
        const { file } = req;
        let image;
        if (req.file) {
            image = process.env.BASE_URL + file.filename;
        }
        const { title, paragraph } = req.body;

        //console.log("req.body.............", req.body);
        const industriesHelp = await IndustrieHelpModel.findOne({ _id: id });
        if (!industriesHelp) {
            return res.send("Invalid Id...");
        }
        console.log("industriesHelp----------------", industriesHelp);
        await industriesHelp.save();
        const IndustriesHelpData = await IndustrieHelpModel.findOneAndUpdate({ id: id }, {
            $set: { title: title, paragraph: paragraph, image: image }
        }, { new: true });
        console.log("industriesHelp---------------", industriesHelp)
        return res.status(200).json({
            message: "Industries Industries data updated",
            data: IndustriesHelpData,
        });
    } catch (error) {
        console.log("error----------------->", error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

//Industre section - list
const HelpList = async (req, res) => {
    try {

        const IndustrieHelpList = await IndustrieHelpModel.find().sort({ createdAt: -1 });
        console.log("IndustrieHelpList", IndustrieHelpList);
        if (IndustrieHelpList) {
            return res.status(200).json({
                status: 200,
                message: "Help data list created successfully!",
                data: IndustrieHelpList,
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

//save data - paragraph
const createParagraphData = async (req, res) => {
    try {
        const { title, content, industrieId } = req.body;
        const dataHelp = new IndustrieParagraphModel({
            title,
            content,
            industrieId
        });
        if (req.files) {
            let file = "";
            req.files.forEach(function (files, index, arr) {
                file = file + files.filename + "," + process.env.BASE_URL;
            });
            file = file.substring(0, file.lastIndexOf(","));
            dataHelp.image = process.env.BASE_URL + file;
        }
        await dataHelp.save();
        return res.status(200).json({
            status: 200,
            message: message.HELP_ADDED,
            data: dataHelp,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
};

// get slug help data
const getParagraphData = async (req, res) => {
    try {
        const { params } = req;
        const { slug } = params;
        const getIndustrieSlug = await IndustriesModel.findOne({ slug: slug })
        var getIndustrieParagraph = getIndustrieSlug.id
        const getSlugParagraphData = await IndustrieParagraphModel.find({ industrieId: getIndustrieParagraph }).populate('industrieId')
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Industries Help data get successfully !",
            data: getSlugParagraphData,
        });
    } catch (error) {
        console.log("error---------", error)
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
};

//update Industrie Card data - By Id
const updateIndustrieParagraph = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        console.log("req.body.............", req.body);
        const industriesParagraph = await IndustrieParagraphModel.findOne({ _id: id });
        if (!industriesParagraph) {
            return res.send("Invalid Id...");
        }
        console.log("industriesParagraph----------------", industriesParagraph);
        await industriesParagraph.save();
        const IndustriesParagraphData = await IndustrieParagraphModel.findOneAndUpdate({ id: id }, {
            $set: { title: title, content: content }
        }, { new: true });
        console.log("industriesParagraph---------------", industriesParagraph)
        return res.status(200).json({
            message: "Industries Industries data updated",
            data: IndustriesParagraphData,
        });
    } catch (error) {
        console.log("error----------------->", error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

//Industre section - list
const ParagraphList = async (req, res) => {
    try {
        const IndustrieParagraphList = await IndustrieParagraphModel.find().sort({ createdAt: -1 });
        console.log("IndustrieParagraphList", IndustrieParagraphList);
        if (IndustrieParagraphList) {
            return res.status(200).json({
                status: 200,
                message: "Paragraph data list created successfully!",
                data: IndustrieParagraphList,
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

module.exports = {
    createdData,
    createHeaderSection,
    HeaderGetData,
    updateIndustrieData,
    HeaderList,
    createIndustrieSection,
    getIndustrieData,
    updateIndustrieSection,
    SectionList,
    cardIndustrieCreate,
    getIndustrieCard,
    updateIndustrieCards,
    CardList,
    createHelpSectionData,
    getIndustrieHelpData,
    updateIndustrieHelp,
    HelpList,
    createParagraphData,
    getParagraphData,
    updateIndustrieParagraph,
    ParagraphList
}
