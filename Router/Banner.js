const BannerController = require("../Controller/Banner")
const express = require("express")
const router = express.Router()


const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Public/BannerImage");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post(
    "/create",
    upload.single("bannerImg"),
    BannerController.AddBanner
);
router.put(
    "/update/:id",
    upload.single("bannerImg"),
    BannerController.BannerUpdate
);

router.get("/getdata", BannerController.GetData)
router.post("/trash/:id", BannerController.BannerTrash)

module.exports = router