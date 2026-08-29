const express = require('express');
const listingController = require('../controllers/listingController');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');
const { requireAuth, requireVerifiedStudent } = require('../middleware/auth');
const {
  createListingSchema,
  updateListingSchema,
  updateStatusSchema,
  queryListingsSchema,
} = require('../validators/listingValidator');

const router = express.Router();

// Public Routes
router.get('/', validate({ query: queryListingsSchema }), listingController.getAll);
router.get('/:id', listingController.getById);
router.post('/:id/view', listingController.recordView);

// Authenticated Upload Endpoint
router.post(
  '/upload-images',
  requireAuth,
  upload.array('photos', 5),
  listingController.uploadImages
);

// Authenticated & Verified Student Protected Routes
router.post(
  '/',
  requireAuth,
  requireVerifiedStudent,
  validate({ body: createListingSchema }),
  listingController.create
);

router.patch(
  '/:id',
  requireAuth,
  validate({ body: updateListingSchema }),
  listingController.update
);

router.delete('/:id', requireAuth, listingController.remove);

router.patch(
  '/:id/status',
  requireAuth,
  validate({ body: updateStatusSchema }),
  listingController.changeStatus
);

module.exports = router;
