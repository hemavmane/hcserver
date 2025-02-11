
const CookieConsent = require('../Modal/cookies');
const securityUtils = require('../utils/security');

class ConsentController {
  async createConsent(req, res) {
    try {
      // Validate that email and name are provided
      const { email, name } = req.body.user;
      if (!email || !name) {
        return res.status(400).json({
          success: false,
          message: 'Email and name are required',
        });
      }

      const sanitizedEmail = securityUtils.sanitizeInput(email);
      const sanitizedName = securityUtils.sanitizeInput(name);
      const sanitizedUserAgent = securityUtils.sanitizeInput(req.headers['user-agent']);

      const { ip, city, region, country } = req.body.location;

      const consentData = {
        consent: {
          status: req.body.consent,
          preferences: req.body.preferences,
        },
        proofOfConsent: {
          userAgent: sanitizedUserAgent,
        },
        location: {
          ip,
          city,
          region,
          country,
        },
        user: {
          email: sanitizedEmail,
          name: sanitizedName,
        },
      };

      const consent = new CookieConsent(consentData);
      await consent.save();

      res.status(200).json({
        success: true,
        message: 'Consent preferences saved successfully',
      });
    } catch (error) {
      console.error('Consent creation error:', error);
      res.status(500).json({
        success: false,
        message: 'Error processing consent',
      });
    }
  }
  async getCookies(req,res){
    try {
       let getdata= await CookieConsent.find({})
       
       return res.status(200).json(getdata)
    } catch (error) {
      console.log(error,"error")
      return res.status(500).json({error:error})
    }
  }
  async getById(req,res){
    try {
     const id = req.params.id
       let getdata= await CookieConsent.findOne({_id:id})
    
       return res.status(200).json(getdata)
    } catch (error) {
      console.log(error,"error")
      return res.status(500).json({error:error})
    }
  }

  async createTrash(req,res){
    try {
     const id = req.params.id
       let getdata= await CookieConsent.findOneAndDelete({_id:id})
       
       return res.status(200).json(getdata)
    } catch (error) {
      console.log(error,"error")
      return res.status(500).json({error:error})
    }
  }
  
}

module.exports = new ConsentController();
