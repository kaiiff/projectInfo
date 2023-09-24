const express = require('express')
const router = express.Router()
 const uploadImage = require('../common/Upload')
const {
    addStory,
    updateStoryImage,
    deleteStory,
    storyList,
    successCategory,
    getSuccessData,
    getSuccessCategoryData,
    getSlug,
    updateStoryById,
    getStoryById,
    deleteStoryById,
    getSuccessStory

}= require('../controller/successController')

router.post("/addStory",uploadImage.single("image"),addStory);
router.get("/details", storyList);
router.get("/details-success", getSuccessData)
router.get("/success-categories-details",getSuccessCategoryData)
router.post('/updateImage/:slug',uploadImage.single("image"),updateStoryImage)
router.delete('/deleteStory/:id',deleteStory)
router.post("/add-success-category",successCategory);
router.get("/details/:slug",getSlug)


router.put("/update-story/:id",uploadImage.single("image"), updateStoryById);
router.get("/story-detail/:id",getStoryById)
router.delete("/delete-story/:id",deleteStoryById)


router.get("/get-story",getSuccessStory)




module.exports= router;