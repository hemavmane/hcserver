const AboutModal = require("../Modal/About");

class About {
  async AddAbout(req, res) {
    try {
      const {description,title} = req.body;
      const file = req.file.filename;


      const authdata = new AboutModal({ title, description, aboutImg: file });
      let savedAuth = await authdata.save();

      if (savedAuth) {
        return res.status(200).json({ data: savedAuth, message: "About saved Succesfully" });
      }
    } catch (err) {
      console.log(err, "erro")
      res.status(500).json({ error: err.message });
    }
  }
  async GetData(req, res) {
    try {
      const Auth = await AboutModal.findOne({});
      res.status(200).json(Auth);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async AboutTrash(req, res) {
    try {
      const { id } = req.params;
      await AboutModal.findByIdAndDelete(id);
      res.status(200).json({ message: "About deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  

  async AboutUpdate(req, res) {
    let { description,title,aboutImg } = req.body;
     
    try {
      let idd = req.params.id;
  
     
      const findProduct = await AboutModal.findOne({ _id: idd });
      if (!findProduct) {
        return res.json({ error: "No such record found" });
      }
  
    
      let file = req.file ? req.file.filename : null;
  
      findProduct.title = title || findProduct.title;
      findProduct.description = description || findProduct.description;
      
  
      if (file) {
        findProduct.aboutImg = file;
      }
  
      const AboutUpdate = await AboutModal.findOneAndUpdate(
        { _id: idd },
        findProduct,
        { new: true }
      );
  
      console.log("File Updated:", file);
  
      return res.status(200).json({
        message: "Updated successfully",
        data: AboutUpdate,
      });
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ error: "Unable to update the Product" });
    }
  }
  
}
const AboutController = new About();
module.exports = AboutController;
