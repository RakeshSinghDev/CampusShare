const express = require('express');
const { sendResponse } = require('../../utils/response');

const router = express.Router();

router.get('/', (req, res) => {
  sendResponse(res, 200, [], 'Listings endpoint placeholder - Pending CRUD controller');
});

module.exports = router;
