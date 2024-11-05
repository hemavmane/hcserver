const BannerModal = require("../Modal/Banner");

class Banner {
  async AddBanner(req, res) {
    try {
      const { title, subtitle, btnText, btnColor } = req.body;
      const file = req.file.filename;


      const authdata = new BannerModal({ title, subtitle, bannerImg: file, btnText, btnColor });
      let savedAuth = await authdata.save();

      if (savedAuth) {
        return res.status(200).json({ data: savedAuth, message: "Banner saved Succesfully" });
      }
    } catch (err) {
      console.log(err, "erro")
      res.status(500).json({ error: err.message });
    }
  }
  async GetData(req, res) {
    try {
      const Auth = await BannerModal.find({});
      res.status(200).json(Auth);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async BannerTrash(req, res) {
    try {
      const { id } = req.params;
      await BannerModal.findByIdAndDelete(id);
      res.status(200).json({ message: "Banner deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  

  async BannerUpdate(req, res) {
    let { title, subtitle, btnText, btnColor } = req.body;
     
    try {
      let idd = req.params.id;
  
     
      console.log("Request Body:", req.body);
      console.log("Uploaded File:", req.file);
  
      const findProduct = await BannerModal.findOne({ _id: idd });
      if (!findProduct) {
        return res.json({ error: "No such record found" });
      }
  
    
      let file = req.file ? req.file.filename : null;
  
      findProduct.title = title || findProduct.title;
      findProduct.btnText = btnText || findProduct.btnText;
      findProduct.btnColor = btnColor || findProduct.btnColor;
      findProduct.subtitle = subtitle || findProduct.subtitle;
  
  
      if (file) {
        findProduct.bannerImg = file;
      }
  
      const bannerUpdate = await BannerModal.findOneAndUpdate(
        { _id: idd },
        findProduct,
        { new: true }
      );
  
      console.log("File Updated:", file);
  
      return res.status(200).json({
        message: "Updated successfully",
        data: bannerUpdate,
      });
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ error: "Unable to update the Product" });
    }
  }
  
}
const BannerController = new Banner();
module.exports = BannerController;
