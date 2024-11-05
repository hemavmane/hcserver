const ServiceController = require("../Controller/ProviderTrust")
const express = require("express")
const router = express.Router()


const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Public/ProviderTrust");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post(
    "/create",
    upload.single("providerTrustImg"),
    ServiceController.AddSProviderTrust
);
router.put(
    "/update/:id",
    upload.single("providerTrustImg"),
    ServiceController.ProviderTrustUpdate
);

router.get("/getdata", ServiceController.GetData)
router.post("/trash/:id", ServiceController.ProviderTrustTrash)

module.exports = router