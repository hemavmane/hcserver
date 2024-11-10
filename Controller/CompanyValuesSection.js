const CompanyValueSectionModal = require("../Modal/CompanyValuesSection");

class CompanyValueSection {
  async AddCompanyValueSection(req, res) {
    try {
      const { title,  description, order } = req.body;
      const file = req.file.filename;


      const authdata = new CompanyValueSectionModal({ title, order, description, logo: file });
      let savedAuth = await authdata.save();

      if (savedAuth) {
        return res.status(200).json({ data: savedAuth, message: "CompanyValueSection saved Succesfully" });
      }
    } catch (err) {
      console.log(err, "erro")
      res.status(500).json({ error: err.message });
    }
  }
  async GetData(req, res) {
    try {
      const Auth = await CompanyValueSectionModal.find({});
      res.status(200).json(Auth);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async CompanyValueSectionTrash(req, res) {
    try {
      const { id } = req.params;
      await CompanyValueSectionModal.findByIdAndDelete(id);
      res.status(200).json({ message: "CompanyValueSection deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }


  async CompanyValueSectionUpdate(req, res) {
    let { title,  description, order } = req.body;

    try {
      let idd = req.params.id;


      const findProduct = await CompanyValueSectionModal.findOne({ _id: idd });
      if (!findProduct) {
        return res.json({ error: "No such record found" });
      }


      let file = req.file ? req.file.filename : null;
      findProduct.title = title || findProduct.title;
      findProduct.description = description || findProduct.description;
      findProduct.order = order || findProduct.order;

      if (file) {
        findProduct.logo = file;
      }

      const CompanyValueSectionUpdate = await CompanyValueSectionModal.findOneAndUpdate(
        { _id: idd },
        findProduct,
        { new: true }
      );

    

      return res.status(200).json({
        message: "Updated successfully",
        data: CompanyValueSectionUpdate,
      });
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ error: "Unable to update the Product" });
    }
  }

}
const CompanyValueSectionController = new CompanyValueSection();
module.exports = CompanyValueSectionController;
