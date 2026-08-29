const express = require('express');
const conversationController = require('../../controllers/conversationController');
const { requireAuth } = require('../../middleware/auth');

const router = express.Router();

// All conversation routes require user authentication
router.use(requireAuth);

router.post('/start', conversationController.startConversation.bind(conversationController));
router.get('/', conversationController.getConversations.bind(conversationController));
router.get('/:id', conversationController.getConversationById.bind(conversationController));
router.post('/:id/messages', conversationController.sendMessage.bind(conversationController));

module.exports = router;
