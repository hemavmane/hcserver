const OverViewModal = require("../Modal/Overview");

class OverView {
  async AddOverView(req, res) {
    try {
      const { title,  counts, order } = req.body;
      const file = req.file.filename;


      const authdata = new OverViewModal({ title, order, counts, logo: file });
      let savedAuth = await authdata.save();

      if (savedAuth) {
        return res.status(200).json({ data: savedAuth, message: "OverView saved Succesfully" });
      }
    } catch (err) {
      console.log(err, "erro")
      res.status(500).json({ error: err.message });
    }
  }
  async GetData(req, res) {
    try {
      const Auth = await OverViewModal.find({});
      return res.status(200).json(Auth);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  async OverViewTrash(req, res) {
    try {
      const { id } = req.params;
      await OverViewModal.findByIdAndDelete(id);
      res.status(200).json({ message: "OverView deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }


  async OverViewUpdate(req, res) {
    let { title, logo, counts, order } = req.body;

    try {
      let idd = req.params.id;


      const findProduct = await OverViewModal.findOne({ _id: idd });
      if (!findProduct) {
        return res.json({ error: "No such record found" });
      }


      let file = req.file ? req.file.filename : null;
      findProduct.title = title || findProduct.title;
      findProduct.counts = counts || findProduct.counts;
      findProduct.order = order || findProduct.order;

      if (file) {
        findProduct.logo = file;
      }

      const OverViewUpdate = await OverViewModal.findOneAndUpdate(
        { _id: idd },
        findProduct,
        { new: true }
      );

      console.log("File Updated:", file);

      return res.status(200).json({
        message: "Updated successfully",
        data: OverViewUpdate,
      });
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ error: "Unable to update the Product" });
    }
  }

}
const OverViewController = new OverView();
module.exports = OverViewController;
