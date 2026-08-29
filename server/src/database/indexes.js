const mongoose = require('mongoose');
const User = require('../modules/users/user.model');
const Listing = require('../modules/listings/listing.model');
const Wishlist = require('../modules/wishlist/wishlist.model');
const Rental = require('../modules/rentals/rental.model');
const Conversation = require('../modules/conversations/conversation.model');

/**
 * Ensures MongoDB indexes are created cleanly when DB is connected
 */
const syncDatabaseIndexes = async () => {
  if (mongoose.connection.readyState !== 1) {
    return;
  }
  try {
    await Promise.all([
      User.createIndexes().catch(() => {}),
      Listing.createIndexes().catch(() => {}),
      Wishlist.createIndexes().catch(() => {}),
      Rental.createIndexes().catch(() => {}),
      Conversation.createIndexes().catch(() => {}),
    ]);
    console.log('[Database] Mongoose indexes synchronized successfully.');
  } catch (error) {
    console.warn('[Database] Index synchronization notice:', error.message);
  }
};

module.exports = {
  syncDatabaseIndexes,
};
