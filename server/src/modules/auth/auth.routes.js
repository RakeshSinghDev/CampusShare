const express = require('express');
const { sendResponse } = require('../../utils/response');

const router = express.Router();

router.post('/login', (req, res) => {
  sendResponse(res, 200, null, 'Auth login placeholder - Pending controller implementation');
});

router.post('/register', (req, res) => {
  sendResponse(res, 201, null, 'Auth register placeholder - Pending controller implementation');
});

router.post('/logout', (req, res) => {
  sendResponse(res, 200, null, 'Auth logout placeholder');
});

module.exports = router;
