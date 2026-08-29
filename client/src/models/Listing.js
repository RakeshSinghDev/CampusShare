/**
 * Helper mapping UI condition labels/strings to backend canonical enum
 */
const mapConditionToEnum = (cond) => {
  if (!cond) return 'good';
  const lower = String(cond).toLowerCase().trim();
  if (lower.includes('like') || lower === 'like_new') return 'like_new';
  if (lower.includes('brand') || lower === 'new') return 'new';
  if (lower.includes('fair') || lower === 'fair') return 'fair';
  return 'good';
};

/**
 * Helper mapping UI listing modes to backend canonical enum
 */
const mapListingTypeToEnum = (type) => {
  if (type === 'buy' || type === 'sale') return 'sale';
  if (type === 'rent') return 'rent';
  if (type === 'both' || type === 'sale_and_rent') return 'sale_and_rent';
  return 'sale';
};

/**
 * Frontend Representation of a CampusShare Resource Listing
 */
export class ListingModel {
  constructor(data = {}) {
    this.id = data._id || data.id || '';
    this._id = this.id;
    this.title = data.title || '';
    this.description = data.description || '';
    this.seller = data.seller || { name: 'Verified Student', isVerified: true };
    this.category = typeof data.category === 'object' ? data.category?.name : data.category || 'Academic Resource';
    this.condition = data.condition ? data.condition.replace('_', ' ') : 'Good Condition';
    this.listingType = data.listingType || 'sale';
    this.salePrice = data.salePrice ?? null;
    this.rentalPricing = data.rentalPricing || null;
    this.brand = data.brand || '';
    this.model = data.model || '';
    this.purchaseYear = data.purchaseYear || '';
    this.usage = data.usage || '';
    this.campus = data.campus || 'Main Campus';
    this.pickupLocation = data.pickupLocation || '';
    this.pickupAvailability = data.pickupAvailability || '';
    this.status = data.status || 'available';
    this.isNegotiable = Boolean(data.isNegotiable);
    this.views = data.views || 0;
    this.viewsCount = data.viewsCount || `${data.views || 0} views`;
    this.wishlistCount = data.wishlistCount || 0;
    this.images = Array.isArray(data.images) ? data.images : [];
    this.createdAt = data.createdAt || new Date().toISOString();

    // Derived primary image URL helper
    this.primaryImage =
      (typeof this.images[0] === 'string' ? this.images[0] : this.images[0]?.url) ||
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800';

    // Aliases to seamlessly match ProductCard component contract
    this.imageUrl = this.primaryImage;
    this.buyPrice = this.salePrice;
    this.rentPrice = this.rentalPricing?.price;
    this.rentPeriod = this.rentalPricing?.unit;
    this.location = this.campus || this.pickupLocation || 'Main Campus';
  }

  static fromApiListing(apiData) {
    if (!apiData) return null;
    return new ListingModel(apiData);
  }

  static toCreateListingPayload(formData) {
    const listingType = mapListingTypeToEnum(formData.listingType);
    const condition = mapConditionToEnum(formData.condition);

    const salePrice = (listingType === 'sale' || listingType === 'sale_and_rent')
      ? Number(formData.salePrice || formData.buyPrice || 0)
      : undefined;

    const rentalPricing = (listingType === 'rent' || listingType === 'sale_and_rent')
      ? {
          unit: formData.rentalPricing?.unit || (formData.rentPriceSemester ? 'semester' : 'week'),
          price: Number(formData.rentalPricing?.price || formData.rentPriceWeek || formData.rentPriceSemester || 0),
          securityDeposit: Number(formData.rentalPricing?.securityDeposit || formData.securityDeposit || 0),
          minimumDuration: Number(formData.rentalPricing?.minimumDuration || 1),
        }
      : undefined;

    return {
      title: formData.title,
      description: formData.description,
      category: formData.category || 'textbooks',
      condition,
      listingType,
      salePrice,
      rentalPricing,
      brand: formData.brand || undefined,
      model: formData.model || undefined,
      purchaseYear: formData.purchaseYear || undefined,
      usage: formData.usage || undefined,
      campus: formData.campus || 'Main Campus',
      pickupLocation: formData.pickupLocation || formData.locationName || 'Main Campus Quad',
      pickupAvailability: formData.pickupAvailability || formData.timingWindow || undefined,
      isNegotiable: Boolean(formData.isNegotiable),
      images: Array.isArray(formData.images) && formData.images.length > 0
        ? formData.images.map((img, idx) => ({
            url: typeof img === 'string' ? img : img.url,
            isPrimary: idx === 0,
            order: idx,
          }))
        : [
            {
              url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
              isPrimary: true,
              order: 0,
            },
          ],
    };
  }
}
