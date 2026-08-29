/**
 * Frontend Representation of a CampusShare Category
 */
export class CategoryModel {
  constructor(data = {}) {
    this.id = data._id || data.id || '';
    this.name = data.name || '';
    this.slug = data.slug || '';
    this.description = data.description || '';
    this.icon = data.icon || 'BookOpen';
    this.sortOrder = data.sortOrder || 0;
    this.isActive = Boolean(data.isActive ?? true);
    this.activeListingsCount = data.activeListingsCount || 0;
  }

  static fromApiCategory(apiData) {
    if (!apiData) return null;
    return new CategoryModel(apiData);
  }
}
