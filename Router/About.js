const AboutController = require("../Controller/About")
const express = require("express")
const router = express.Router()


const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Public/AboutImage");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post(
    "/create",
    upload.single("aboutImg"),
    AboutController.AddAbout
);
router.put(
    "/update/:id",
    upload.single("aboutImg"),
    AboutController.AboutUpdate
);

router.get("/getdata", AboutController.GetData)
router.post("/trash/:id", AboutController.AboutTrash)

module.exports = router