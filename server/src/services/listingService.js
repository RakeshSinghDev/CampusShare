const mongoose = require('mongoose');
const Listing = require('../modules/listings/listing.model');
const Category = require('../modules/categories/category.model');
const ApiError = require('../utils/ApiError');
const { LISTING_STATUS, USER_ROLES } = require('../constants/enums');

// Safe Seller projection string to prevent leaking sensitive fields
const SAFE_SELLER_FIELDS = 'name avatar college course branch academicYear campus verificationStatus';

// In-Memory Fallback Store when MongoDB is not running locally
const memoryStore = [];

class ListingService {
  /**
   * Helper checking if MongoDB connection is active
   */
  isDbConnected() {
    return mongoose.connection.readyState === 1;
  }

  /**
   * Create a new campus resource listing
   */
  async createListing(sellerId, data) {
    if (!this.isDbConnected()) {
      const mockListing = {
        _id: `mem_${Date.now()}`,
        ...data,
        seller: {
          _id: sellerId,
          name: 'Alex Rivera',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          college: 'Stanford University',
          campus: 'Stanford Main Campus',
          verificationStatus: 'verified',
        },
        category: { name: 'Academic Gear', slug: data.category, icon: 'BookOpen' },
        status: LISTING_STATUS.ACTIVE,
        views: 1,
        wishlistCount: 0,
        createdAt: new Date().toISOString(),
      };
      memoryStore.unshift(mockListing);
      return mockListing;
    }

    let category = await Category.findById(data.category).catch(() => null);
    if (!category) {
      category = await Category.findOne({ slug: data.category });
    }
    if (!category && typeof data.category === 'string') {
      const escaped = data.category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      category = await Category.findOne({ name: new RegExp('^' + escaped + '$', 'i') });
    }
    if (!category) {
      category = await Category.findOne({ isActive: true });
    }
    if (!category) {
      throw new ApiError(400, 'Invalid category specified', 'INVALID_CATEGORY');
    }

    const listing = await Listing.create({
      ...data,
      seller: sellerId,
      category: category._id,
      status: LISTING_STATUS.ACTIVE,
    });

    return await this.getListingById(listing._id);
  }

  /**
   * Get paginated, searched, filtered, and sorted campus listings
   */
  async getListings(queryOptions = {}) {
    const {
      page = 1,
      limit = 12,
      search,
      category,
      condition,
      listingType,
      campus,
      minPrice,
      maxPrice,
      status = LISTING_STATUS.ACTIVE,
      sort = 'newest',
    } = queryOptions;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));

    if (!this.isDbConnected()) {
      let filtered = [...memoryStore].filter((item) => item.status === status);

      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.title.toLowerCase().includes(s) ||
            item.description.toLowerCase().includes(s)
        );
      }

      if (category && category !== 'all') {
        filtered = filtered.filter(
          (item) => item.category?.slug === category || item.category === category
        );
      }

      if (condition) {
        filtered = filtered.filter((item) => item.condition === condition);
      }

      if (listingType) {
        filtered = filtered.filter((item) => item.listingType === listingType);
      }

      const totalItems = filtered.length;
      const totalPages = Math.ceil(totalItems / limitNum) || 1;
      const paginatedItems = filtered.slice((pageNum - 1) * limitNum, pageNum * limitNum);

      return {
        items: paginatedItems,
        pagination: {
          page: pageNum,
          limit: limitNum,
          totalItems,
          totalPages,
          hasNextPage: pageNum < totalPages,
          hasPreviousPage: pageNum > 1,
        },
      };
    }

    const filter = { status };

    if (category && category !== 'all') {
      let catDoc = await Category.findById(category).catch(() => null);
      if (!catDoc) {
        catDoc = await Category.findOne({ slug: category });
      }
      if (catDoc) {
        filter.category = catDoc._id;
      }
    }

    if (condition) filter.condition = condition;
    if (listingType) filter.listingType = listingType;
    if (campus) filter.campus = new RegExp(campus, 'i');

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.$or = [
        {
          salePrice: {
            ...(minPrice !== undefined && { $gte: Number(minPrice) }),
            ...(maxPrice !== undefined && { $lte: Number(maxPrice) }),
          },
        },
        {
          'rentalPricing.price': {
            ...(minPrice !== undefined && { $gte: Number(minPrice) }),
            ...(maxPrice !== undefined && { $lte: Number(maxPrice) }),
          },
        },
      ];
    }

    if (search && search.trim()) {
      filter.$text = { $search: search.trim() };
    }

    let sortOptions = {};
    switch (sort) {
      case 'oldest':
        sortOptions = { createdAt: 1 };
        break;
      case 'price_low_to_high':
        sortOptions = { salePrice: 1, 'rentalPricing.price': 1 };
        break;
      case 'price_high_to_low':
        sortOptions = { salePrice: -1, 'rentalPricing.price': -1 };
        break;
      case 'popular':
        sortOptions = { views: -1, wishlistCount: -1 };
        break;
      case 'newest':
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const skip = (pageNum - 1) * limitNum;

    const [items, totalItems] = await Promise.all([
      Listing.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .populate('seller', SAFE_SELLER_FIELDS)
        .populate('category', 'name slug icon'),
      Listing.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / limitNum) || 1;

    return {
      items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalItems,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPreviousPage: pageNum > 1,
      },
    };
  }

  /**
   * Get single listing details by ID
   */
  async getListingById(id) {
    if (!this.isDbConnected()) {
      const found = memoryStore.find((item) => (item._id || item.id) === id);
      if (!found) {
        throw new ApiError(404, 'Campus resource listing not found', 'RESOURCE_NOT_FOUND');
      }
      return found;
    }

    const listing = await Listing.findOne({
      _id: id,
      status: { $ne: LISTING_STATUS.DELETED },
    })
      .populate('seller', SAFE_SELLER_FIELDS)
      .populate('category', 'name slug icon description');

    if (!listing) {
      throw new ApiError(404, 'Campus resource listing not found', 'RESOURCE_NOT_FOUND');
    }

    return listing;
  }

  /**
   * Update listing details (Owner/Admin authorization)
   */
  async updateListing(id, user, updateData) {
    if (!this.isDbConnected()) {
      const idx = memoryStore.findIndex((item) => (item._id || item.id) === id);
      if (idx === -1) throw new ApiError(404, 'Listing not found', 'RESOURCE_NOT_FOUND');
      Object.assign(memoryStore[idx], updateData);
      return memoryStore[idx];
    }

    const listing = await Listing.findById(id);
    if (!listing || listing.status === LISTING_STATUS.DELETED) {
      throw new ApiError(404, 'Listing not found', 'RESOURCE_NOT_FOUND');
    }

    this.checkOwnership(listing, user);

    if (updateData.category) {
      let catDoc = await Category.findById(updateData.category).catch(() => null);
      if (!catDoc) catDoc = await Category.findOne({ slug: updateData.category });
      if (catDoc) updateData.category = catDoc._id;
    }

    Object.assign(listing, updateData);
    await listing.save();

    return await this.getListingById(listing._id);
  }

  /**
   * Soft delete listing (Owner/Admin authorization)
   */
  async softDeleteListing(id, user) {
    if (!this.isDbConnected()) {
      const idx = memoryStore.findIndex((item) => (item._id || item.id) === id);
      if (idx !== -1) memoryStore[idx].status = LISTING_STATUS.DELETED;
      return { id, status: LISTING_STATUS.DELETED };
    }

    const listing = await Listing.findById(id);
    if (!listing || listing.status === LISTING_STATUS.DELETED) {
      throw new ApiError(404, 'Listing not found', 'RESOURCE_NOT_FOUND');
    }

    this.checkOwnership(listing, user);

    listing.status = LISTING_STATUS.DELETED;
    await listing.save();

    return { id: listing._id, status: LISTING_STATUS.DELETED };
  }

  /**
   * Update listing status (Active <-> Paused, etc.)
   */
  async updateListingStatus(id, user, newStatus) {
    if (!this.isDbConnected()) {
      const idx = memoryStore.findIndex((item) => (item._id || item.id) === id);
      if (idx !== -1) memoryStore[idx].status = newStatus;
      return { id, status: newStatus };
    }

    const listing = await Listing.findById(id);
    if (!listing || listing.status === LISTING_STATUS.DELETED) {
      throw new ApiError(404, 'Listing not found', 'RESOURCE_NOT_FOUND');
    }

    this.checkOwnership(listing, user);

    if (listing.status === LISTING_STATUS.SOLD && newStatus === LISTING_STATUS.ACTIVE) {
      throw new ApiError(400, 'Cannot reactivate a sold listing directly', 'INVALID_STATUS_TRANSITION');
    }

    listing.status = newStatus;
    await listing.save();

    return { id: listing._id, status: listing.status };
  }

  /**
   * Increment listing view count safely
   */
  async incrementViews(id) {
    if (!this.isDbConnected()) {
      const item = memoryStore.find((i) => (i._id || i.id) === id);
      if (item) item.views = (item.views || 0) + 1;
      return { id, views: item?.views || 1 };
    }

    const listing = await Listing.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).select('views');

    if (!listing) {
      throw new ApiError(404, 'Listing not found', 'RESOURCE_NOT_FOUND');
    }

    return { id: listing._id, views: listing.views };
  }

  /**
   * Get listings owned by the authenticated user
   */
  async getUserListings(userId, queryOptions = {}) {
    const { page = 1, limit = 20, status } = queryOptions;
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));

    if (!this.isDbConnected()) {
      let filtered = [...memoryStore];
      if (status) filtered = filtered.filter((i) => i.status === status);
      else filtered = filtered.filter((i) => i.status !== LISTING_STATUS.DELETED);

      return {
        items: filtered,
        pagination: {
          page: pageNum,
          limit: limitNum,
          totalItems: filtered.length,
          totalPages: Math.ceil(filtered.length / limitNum) || 1,
        },
      };
    }

    const filter = {
      seller: userId,
      status: status ? status : { $ne: LISTING_STATUS.DELETED },
    };

    const skip = (pageNum - 1) * limitNum;

    const [items, totalItems] = await Promise.all([
      Listing.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate('category', 'name slug icon'),
      Listing.countDocuments(filter),
    ]);

    return {
      items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalItems,
        totalPages: Math.ceil(totalItems / limitNum) || 1,
      },
    };
  }

  /**
   * Authorization helper checking if user owns listing or is admin
   */
  checkOwnership(listing, user) {
    const isOwner = listing.seller.toString() === user._id.toString();
    const isAdmin = user.role === USER_ROLES.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ApiError(403, 'You do not have permission to modify this listing', 'FORBIDDEN');
    }
  }
}

module.exports = new ListingService();
