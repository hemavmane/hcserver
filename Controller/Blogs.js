const BlogModal = require("../Modal/Blogs");

class Blogs {
  async AddSBlogs(req, res) {
    try {
      const { title, description ,subtitle,page_slug} = req.body;
      const file = req.file.filename;


      const authdata = new BlogModal({ title, description, subtitle,page_slug,blogImg: file });
      let savedAuth = await authdata.save();

      if (savedAuth) {
        return res.status(200).json({ data: savedAuth, message: "Blogs saved Succesfully" });
      }
    } catch (err) {
      console.log(err, "erro")
      res.status(500).json({ error: err.message });
    }
  }
  async GetData(req, res) {
    try {
      const Blogdata = await BlogModal.find({});
      res.status(200).json(Blogdata);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async BlogsTrash(req, res) {
    try {
      const { id } = req.params;
      await BlogModal.findByIdAndDelete(id);
      res.status(200).json({ message: "Blogs deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  async BlogByPageSlug(req, res) {
    try {
      const { pageslug } = req.params;
       const data =  await BlogModal.findOne({page_slug:pageslug});
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  

  async BlogsUpdate(req, res) {
    let { title, description ,subtitle,page_slug} = req.body;

    try {
      let idd = req.params.id;

      const findProduct = await BlogModal.findOne({ _id: idd });
      if (!findProduct) {
        return res.json({ error: "No such record found" });
      }


      let file = req.file ? req.file.filename : null;

      findProduct.title = title || findProduct.title;
      findProduct.description = description || findProduct.description;
      findProduct.subtitle = subtitle || findProduct.subtitle;
      findProduct.page_slug = page_slug || findProduct.page_slug;
      

      if (file) {
        findProduct.blogImg = file;
      }

      const BlogsUpdate = await BlogModal.findOneAndUpdate(
        { _id: idd },
        findProduct,
        { new: true }
      );


      return res.status(200).json({
        message: "Updated successfully",
        data: BlogsUpdate,
      });
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ error: "Unable to update the Product" });
    }
  }

}
const BlogsController = new Blogs();
module.exports = BlogsController;
