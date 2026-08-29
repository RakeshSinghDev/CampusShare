const listingService = require('../services/listingService');
const asyncHandler = require('../utils/asyncHandler');
const { sendResponse } = require('../utils/response');
const ApiError = require('../utils/ApiError');

class ListingController {
  /**
   * POST /api/v1/listings/upload-images
   * Upload resource listing photos (multipart/form-data) and return browser URLs
   */
  uploadImages = asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
      throw new ApiError(400, 'No image files were uploaded', 'NO_FILES_UPLOADED');
    }

    const hostUrl = `${req.protocol}://${req.get('host')}`;
    const images = req.files.map((file, idx) => {
      const relativePath = `/uploads/listings/${file.filename}`;
      const url = `${hostUrl}${relativePath}`;
      return {
        url,
        isPrimary: idx === 0,
        order: idx,
      };
    });

    return sendResponse(res, 200, { images }, 'Resource photos uploaded successfully');
  });

  /**
   * POST /api/v1/listings
   */
  create = asyncHandler(async (req, res) => {
    const listing = await listingService.createListing(req.user._id, req.body);
    return sendResponse(res, 201, listing, 'Resource listing created successfully');
  });

  /**
   * GET /api/v1/listings
   */
  getAll = asyncHandler(async (req, res) => {
    const result = await listingService.getListings(req.query);
    return sendResponse(res, 200, result, 'Listings fetched successfully');
  });

  /**
   * GET /api/v1/listings/:id
   */
  getById = asyncHandler(async (req, res) => {
    const listing = await listingService.getListingById(req.params.id);
    return sendResponse(res, 200, listing, 'Listing details retrieved');
  });

  /**
   * PATCH /api/v1/listings/:id
   */
  update = asyncHandler(async (req, res) => {
    const updated = await listingService.updateListing(req.params.id, req.user, req.body);
    return sendResponse(res, 200, updated, 'Listing updated successfully');
  });

  /**
   * DELETE /api/v1/listings/:id
   */
  remove = asyncHandler(async (req, res) => {
    const result = await listingService.softDeleteListing(req.params.id, req.user);
    return sendResponse(res, 200, result, 'Listing deleted successfully');
  });

  /**
   * PATCH /api/v1/listings/:id/status
   */
  changeStatus = asyncHandler(async (req, res) => {
    const result = await listingService.updateListingStatus(
      req.params.id,
      req.user,
      req.body.status
    );
    return sendResponse(res, 200, result, `Listing status updated to ${req.body.status}`);
  });

  /**
   * POST /api/v1/listings/:id/view
   */
  recordView = asyncHandler(async (req, res) => {
    const result = await listingService.incrementViews(req.params.id);
    return sendResponse(res, 200, result, 'Listing view recorded');
  });

  /**
   * GET /api/v1/users/me/listings
   */
  getMyListings = asyncHandler(async (req, res) => {
    const result = await listingService.getUserListings(req.user._id, req.query);
    return sendResponse(res, 200, result, 'User listings retrieved');
  });
}

module.exports = new ListingController();
