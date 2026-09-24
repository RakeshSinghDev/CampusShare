const express = require('express');
const samlController = require('../controllers/samlController');

const router = express.Router();

/**
 * 1. Initiate SAML 2.0 AuthNRequest
 * GET /api/auth/saml/login
 */
router.get('/login', samlController.login);

/**
 * 2. Assertion Consumer Service (ACS)
 * POST /api/auth/saml/acs
 * Receives SAMLResponse POSTed by PingFederate IdP
 */
router.post('/acs', samlController.acs);

/**
 * 3. Single Logout (SLO) endpoints
 * GET /api/auth/saml/logout (SP-initiated logout)
 * GET & POST /api/auth/saml/slo (PingFederate SLO response / IdP-initiated logout)
 */
router.get('/logout', samlController.logout);
router.get('/slo', samlController.slo);
router.post('/slo', samlController.slo);

/**
 * 4. SP Metadata Endpoint
 * GET /api/auth/saml/metadata
 */
router.get('/metadata', samlController.metadata);

module.exports = router;
