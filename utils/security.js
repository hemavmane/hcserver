// utils/security.js
const crypto = require('crypto');
const sanitizeHtml = require('sanitize-html');

const securityUtils = {
  async hashIpAddress(ip) {
    const hash = crypto.createHash('sha256');
    hash.update(ip + process.env.IP_SALT);
    return hash.digest('hex');
  },

  sanitizeInput(input) {
    return sanitizeHtml(input, {
      allowedTags: [],
      allowedAttributes: {}
    });
  }
};

module.exports = securityUtils;