const MissionModal = require("../Modal/Mission");

class Mission {
  async AddSMission(req, res) {
    try {
      const { title, subtitle ,order} = req.body;
      const file = req.file.filename;


      const authdata = new MissionModal({ title, subtitle, missionImg: file ,order});
      let savedAuth = await authdata.save();

      if (savedAuth) {
        return res.status(200).json({ data: savedAuth, message: "Mission saved Succesfully" });
      }
    } catch (err) {
      console.log(err, "erro")
      res.status(500).json({ error: err.message });
    }
  }
  async GetData(req, res) {
    try {
      const Blogdata = await MissionModal.find({});
      res.status(200).json(Blogdata);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async MissionTrash(req, res) {
    try {
      const { id } = req.params;
      await MissionModal.findByIdAndDelete(id);
      res.status(200).json({ message: "Mission deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }



  async MissionUpdate(req, res) {
    let { title, subtitle, order } = req.body;

    try {
      let idd = req.params.id;

      const findProduct = await MissionModal.findOne({ _id: idd });
      if (!findProduct) {
        return res.json({ error: "No such record found" });
      }


      let file = req.file ? req.file.filename : null;

      findProduct.title = title || findProduct.title;
      findProduct.subtitle = subtitle || findProduct.subtitle;
      findProduct.order = order || findProduct.order;

      if (file) {
        findProduct.missionImg = file;
      }

      const MissionUpdate = await MissionModal.findOneAndUpdate(
        { _id: idd },
        findProduct,
        { new: true }
      );


      return res.status(200).json({
        message: "Updated successfully",
        data: MissionUpdate,
      });
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ error: "Unable to update the Product" });
    }
  }

}
const MissionController = new Mission();
module.exports = MissionController;
