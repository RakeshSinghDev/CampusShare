const express = require('express');
const { sendResponse } = require('../../utils/response');

const router = express.Router();

router.get('/', (req, res) => {
  sendResponse(res, 200, [], 'Categories endpoint placeholder');
});

module.exports = router;
