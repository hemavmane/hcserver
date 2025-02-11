// CookieConsentSchema.js
const mongoose = require('mongoose');

const cookieConsentSchema = new mongoose.Schema({
  consent: {
    status: Boolean,
    preferences: {
      necessary: { type: Boolean, default: true },
      analytics: { type: Boolean, default: false },
      marketing: { type: Boolean, default: false },
    },
    timestamp: { type: Date, default: Date.now },
  },
  proofOfConsent: {
    userAgent: String,
    ipHash: String,
  
  },
  location: {
    ip: String,
    city: String,
    region: String,
    country: String,
  },
  user: {
    email: String,
    name: String,
  }
}, 
{
  timestamps: true,
});

module.exports = mongoose.model('CookieConsent', cookieConsentSchema);







