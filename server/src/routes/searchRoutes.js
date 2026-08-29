const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();

router.get('/suggestions', searchController.getSuggestions);

module.exports = router;
