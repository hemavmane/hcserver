const ProdiverTrustModal = require("../Modal/ProviderTrust");

class ProviderTrust {
  async AddSProviderTrust(req, res) {
    try {
      const { title, subtitle } = req.body;
      const file = req.file.filename;


      const authdata = new ProdiverTrustModal({ title, subtitle,  providerTrustImg: file });
      let savedAuth = await authdata.save();

      if (savedAuth) {
        return res.status(200).json({ data: savedAuth, message: "ProviderTrust saved Succesfully" });
      }
    } catch (err) {
      console.log(err, "erro")
      res.status(500).json({ error: err.message });
    }
  }
  async GetData(req, res) {
    try {
      const Auth = await ProdiverTrustModal.find({});
      res.status(200).json(Auth);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async ProviderTrustTrash(req, res) {
    try {
      const { id } = req.params;
      await ProdiverTrustModal.findByIdAndDelete(id);
      res.status(200).json({ message: "ProviderTrust deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }


  async ProviderTrustUpdate(req, res) {
    let { title, subtitle } = req.body;

    try {
      let idd = req.params.id;

      const findProduct = await ProdiverTrustModal.findOne({ _id: idd });
      if (!findProduct) {
        return res.json({ error: "No such record found" });
      }


      let file = req.file ? req.file.filename : null;

      findProduct.title = title || findProduct.title;
      findProduct.subtitle = subtitle || findProduct.subtitle;
     

      if (file) {
        findProduct.providerTrustImg= file;
      }

      const ProviderTrustUpdate = await ProdiverTrustModal.findOneAndUpdate(
        { _id: idd },
        findProduct,
        { new: true }
      );


      return res.status(200).json({
        message: "Updated successfully",
        data: ProviderTrustUpdate,
      });
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ error: "Unable to update the Product" });
    }
  }

}
const ProviderTrustController = new ProviderTrust();
module.exports = ProviderTrustController;
