const categoryService = require('../services/categoryService');
const asyncHandler = require('../utils/asyncHandler');
const { sendResponse } = require('../utils/response');

class CategoryController {
  /**
   * GET /api/v1/categories
   */
  getAll = asyncHandler(async (req, res) => {
    const categories = await categoryService.getCategories();
    return sendResponse(res, 200, categories, 'Categories fetched successfully');
  });

  /**
   * GET /api/v1/categories/:slug
   */
  getBySlug = asyncHandler(async (req, res) => {
    const category = await categoryService.getCategoryBySlug(req.params.slug);
    return sendResponse(res, 200, category, 'Category details retrieved');
  });
}

module.exports = new CategoryController();
