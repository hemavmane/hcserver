const ServiceModal = require("../Modal/Services");

class Service {
  async AddService(req, res) {
    try {
      const { title, subtitle, offerPrice, realPrice, description } = req.body;
      const file = req.file.filename;


      const authdata = new ServiceModal({ title, subtitle, offerPrice, realPrice, description, serviceImg: file });
      let savedAuth = await authdata.save();

      if (savedAuth) {
        return res.status(200).json({ data: savedAuth, message: "Service saved Succesfully" });
      }
    } catch (err) {
      console.log(err, "erro")
      res.status(500).json({ error: err.message });
    }
  }
  async GetData(req, res) {
    try {
      const Auth = await ServiceModal.find({});
      res.status(200).json(Auth);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async ServiceTrash(req, res) {
    try {
      const { id } = req.params;
      await ServiceModal.findByIdAndDelete(id);
      res.status(200).json({ message: "Service deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }


  async ServiceUpdate(req, res) {
    let { title, subtitle, offerPrice, realPrice, description } = req.body;

    try {
      let idd = req.params.id;

      const findProduct = await ServiceModal.findOne({ _id: idd });
      if (!findProduct) {
        return res.json({ error: "No such record found" });
      }


      let file = req.file ? req.file.filename : null;

      findProduct.title = title || findProduct.title;
      findProduct.subtitle = subtitle || findProduct.subtitle;
      findProduct.offerPrice = offerPrice || findProduct.offerPrice;
      findProduct.realPrice = realPrice || findProduct.realPrice;
      findProduct.description = description || findProduct.description;


      if (file) {
        findProduct.serviceImg = file;
      }

      const ServiceUpdate = await ServiceModal.findOneAndUpdate(
        { _id: idd },
        findProduct,
        { new: true }
      );


      return res.status(200).json({
        message: "Updated successfully",
        data: ServiceUpdate,
      });
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ error: "Unable to update the Product" });
    }
  }

}
const ServiceController = new Service();
module.exports = ServiceController;
