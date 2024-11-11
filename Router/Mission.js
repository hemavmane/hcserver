const ServiceController = require("../Controller/Mission")
const express = require("express")
const router = express.Router()


const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Public/MissionImage");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post(
    "/create",
    upload.single("missionImg"),
    ServiceController.AddSMission
);
router.put(
    "/update/:id",
    upload.single("missionImg"),
    ServiceController.MissionUpdate
);

router.get("/getdata", ServiceController.GetData)
router.post("/trash/:id", ServiceController.MissionTrash)

module.exports = router