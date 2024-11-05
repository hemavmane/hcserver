const ServiceController = require("../Controller/Services")
const express = require("express")
const router = express.Router()


const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Public/ServiceImage");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post(
    "/create",
    upload.single("serviceImg"),
    ServiceController.AddService
);
router.put(
    "/update/:id",
    upload.single("serviceImg"),
    ServiceController.ServiceUpdate
);

router.get("/getdata", ServiceController.GetData)
router.post("/trash/:id", ServiceController.ServiceTrash)

module.exports = router