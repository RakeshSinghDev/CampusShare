const express = require('express');
const { sendResponse } = require('../../utils/response');

const router = express.Router();

router.get('/', (req, res) => {
  sendResponse(res, 200, [], 'Messages endpoint placeholder');
});

module.exports = router;
