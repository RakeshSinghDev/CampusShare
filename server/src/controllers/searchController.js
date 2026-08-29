const searchService = require('../services/searchService');
const asyncHandler = require('../utils/asyncHandler');
const { sendResponse } = require('../utils/response');

class SearchController {
  /**
   * GET /api/v1/search/suggestions?q=<query>
   */
  getSuggestions = asyncHandler(async (req, res) => {
    const suggestions = await searchService.getSuggestions(req.query.q);
    return sendResponse(res, 200, suggestions, 'Search suggestions retrieved');
  });
}

module.exports = new SearchController();
