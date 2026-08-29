const express = require('express');
const { sendResponse } = require('../../utils/response');

const router = express.Router();

router.get('/me', (req, res) => {
  sendResponse(res, 200, null, 'User profile placeholder - Pending auth integration');
});

module.exports = router;
