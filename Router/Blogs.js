const ServiceController = require("../Controller/Blogs")
const express = require("express")
const router = express.Router()


const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Public/BlogImage");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post(
    "/create",
    upload.single("blogImg"),
    ServiceController.AddSBlogs
);
router.put(
    "/update/:id",
    upload.single("blogImg"),
    ServiceController.BlogsUpdate
);

router.get("/getdata", ServiceController.GetData)
router.post("/trash/:id", ServiceController.BlogsTrash)
router.get("/getblogbyslug/:pageslug", ServiceController.BlogByPageSlug)


module.exports = router