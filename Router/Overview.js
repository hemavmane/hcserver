const AboutController = require("../Controller/Overview")
const express = require("express")
const router = express.Router()


const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Public/OverviewImage");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post(
    "/create",
    upload.single("logo"),
    AboutController.AddOverView
);
router.put(
    "/update/:id",
    upload.single("logo"),
    AboutController.OverViewUpdate
);

router.get("/getdata", AboutController.GetData)
router.post("/trash/:id", AboutController.OverViewTrash)

module.exports = router