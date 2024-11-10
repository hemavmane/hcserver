const CompanyValueSectionController = require("../Controller/CompanyValuesSection")
const express = require("express")
const router = express.Router()


const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Public/CompanyValueImage");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post(
    "/create",
    upload.single("logo"),
    CompanyValueSectionController.AddCompanyValueSection
);
router.put(
    "/update/:id",
    upload.single("logo"),
    CompanyValueSectionController.CompanyValueSectionUpdate
);

router.get("/getdata", CompanyValueSectionController.GetData)
router.post("/trash/:id", CompanyValueSectionController.CompanyValueSectionTrash)

module.exports = router