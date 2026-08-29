/**
 * CampusShare Centralized Enums
 */

const LISTING_TYPES = {
  SALE: 'sale',
  RENT: 'rent',
  SALE_AND_RENT: 'sale_and_rent',
};

const LISTING_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  SOLD: 'sold',
  RENTED: 'rented',
  UNAVAILABLE: 'unavailable',
  DELETED: 'deleted',
};

const ITEM_CONDITIONS = {
  NEW: 'new',
  LIKE_NEW: 'like_new',
  GOOD: 'good',
  FAIR: 'fair',
};

const RENTAL_UNITS = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  SEMESTER: 'semester',
};

const VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
};

const USER_ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin',
};

module.exports = {
  LISTING_TYPES,
  LISTING_STATUS,
  ITEM_CONDITIONS,
  RENTAL_UNITS,
  VERIFICATION_STATUS,
  USER_ROLES,
};
