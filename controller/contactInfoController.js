const { message } = require("../common/Message");
const contactInfo = require("../model/contactInfoModel");

const addContactInfo = async (req, res) => {
  try {
    const { email, phone, address, discordLink, facebookLink, twitterLink, linkdinLink, youtubeLink, } = req.body;

    if (email == undefined || email == "") {
      return res.json({ status: 403, message: "Please enter email" });
    }
    if (phone == undefined || phone == "") {
      return res.json({
        status: 403,
        message: "Please enter phone number",
      });
    }
    if (phone.length < 8 || phone.length > 20) {
      return res.json({
        status: 403,
        message: "Please enter valid phone number"
      });
    }
    if (address == undefined || address == "") {
      return res.json({
        status: 403,
        message: "Please enter address"
      });
    }
    const contactData = new contactInfo({
      email,
      phone,
      address,
      discordLink,
      facebookLink,
      twitterLink,
      linkdinLink,
      youtubeLink,
    });

    const data = await contactData.save();
    console.log(data);
    if (!data) {
      return res.json({
        status: 404,
        message: message.DATA_NOT_FOUND,
      });
    } else {
      return res.json({
        status: 200,
        message: "data added successfully",
        data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

const updateContactInfo = async (req, res) => {
  try {
    var id = req.params.id;
    console.log("id...............", id);
    var updateData = {};

    if (req.body.email) {
      updateData.email = req.body.email;
    }

    if (req.body.phone) {
      updateData.phone = req.body.phone;
    }

    if (req.body.address) {
      updateData.address = req.body.address;
    }

    if (req.body.discordLink) {
      updateData.discordLink = req.body.discordLink;
    }

    if (req.body.facebookLink) {
      updateData.facebookLink = req.body.facebookLink;
    }

    if (req.body.twitterLink) {
      updateData.twitterLink = req.body.twitterLink;
    }

    if (req.body.linkdinLink) {
      updateData.linkdinLink = req.body.linkdinLink;
    }

    if (req.body.youtubeLink) {
      updateData.youtubeLink = req.body.youtubeLink;
    }
    var contactInfoData = await contactInfo.findOneAndUpdate({ _id: id }, { $set: updateData });
    if (!contactInfoData) {
      return res.json({
        status: 400,
        message: "Data Not found"
      });
    } else {
      return res.json({
        status: 200,
        message: "profile updated successfully",
        contactInfoData
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};



// const updateContactInfo = async (req, res) => {
//   try {
//     const { id } = req.params;
// console.log("id..........",id)
//     const { email, phone, address, discordLink, facebookLink, twitterLink, linkdinLink, youtubeLink } = req.body;
//     console.log("req.body......",req.body)
//     const ContactInfo = await contactInfo.findOne({ id })
//     if (!ContactInfo) {
//       return res.send("Invalid Contact-Info Id...")
//     }
//     await ContactInfo.save();
//     const updateContactInfo = await contactInfo.findOneAndUpdate({ _id: id },
//       {
//         $set: {
//           email: email, phone: phone, address: address, discordLink: discordLink, facebookLink: facebookLink, twitterLink: twitterLink,
//           linkdinLink: linkdinLink, youtubeLink: youtubeLink
//         }
//       }, { new: true })
//     return res.status(200).json({
//       message: "contact info updated...!",
//       updateContactInfo
//     })
//   } catch (error) {
//     console.log("error----------------->", error) 
//     return res.status(500).json({
//       message: "error............."
//     });
//   }
// }
const contactInfoList = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    let condition = {};
    const getList = await contactInfo.find(condition)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const totalgetList = await contactInfo.countDocuments(condition);
    if (!totalgetList) {
      return res.status(400).json({
        status: 400,
        message: message.DATA_NOT_FOUND,
      });
    }
    return res.status(200).json({
      status: 200,
      TotalgetList: totalgetList,
      message: "list of contact information",
      data: getList,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

const deleteContactInfo = async (req, res) => {
  try {
    let data = await contactInfo.findByIdAndDelete({ _id: req.params.id });
    if (data) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: message.DELETED_CONTACT_DATA,
        response: data,
      })
        .send();
    } else {
      return res.status(404).json({
        status: 404,
        success: false,
        message: message.ALREADY_DELETED,
      })
        .send();
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

module.exports = {
  addContactInfo,
  updateContactInfo,
  contactInfoList,
  deleteContactInfo,
};
