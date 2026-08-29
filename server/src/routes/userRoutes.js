const express = require('express');
const listingController = require('../controllers/listingController');
const { requireAuth } = require('../middleware/auth');
const { sendResponse } = require('../utils/response');

const router = express.Router();

router.get('/me', requireAuth, (req, res) => {
  sendResponse(res, 200, req.user, 'Current user profile');
});

router.get('/me/listings', requireAuth, listingController.getMyListings);

module.exports = router;
