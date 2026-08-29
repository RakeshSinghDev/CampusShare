const mongoose = require('mongoose');
const Conversation = require('../modules/conversations/conversation.model');
const Message = require('../modules/messages/message.model');
const Listing = require('../modules/listings/listing.model');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const { sendResponse } = require('../utils/response');

// In-Memory Fallback Conversation Store when DB is disconnected
const memoryConversations = [];
const memoryMessages = [];

class ConversationController {
  isDbConnected() {
    return mongoose.connection.readyState === 1;
  }

  /**
   * Start or find an existing conversation between authenticated buyer and product seller
   * POST /api/v1/conversations/start
   */
  async startConversation(req, res, next) {
    try {
      const buyerId = req.user._id;
      const { listingId, sellerId: bodySellerId } = req.body;

      if (!listingId && !bodySellerId) {
        throw new ApiError(400, 'Listing ID or Seller ID is required', 'MISSING_PARAMETERS');
      }

      let sellerId = bodySellerId;
      let listingDoc = null;

      if (listingId && this.isDbConnected()) {
        listingDoc = await Listing.findById(listingId);
        if (listingDoc) {
          sellerId = sellerId || listingDoc.seller;
        }
      }

      if (!sellerId) {
        throw new ApiError(400, 'Unable to resolve seller information for this resource', 'INVALID_SELLER');
      }

      // Prevent user from starting a conversation with themselves
      if (String(buyerId) === String(sellerId)) {
        throw new ApiError(400, 'You cannot chat with yourself about your own listing', 'SELF_CHAT_NOT_ALLOWED');
      }

      if (!this.isDbConnected()) {
        let existing = memoryConversations.find(
          (c) =>
            c.participants.some((p) => String(p._id || p.id) === String(buyerId)) &&
            c.participants.some((p) => String(p._id || p.id) === String(sellerId))
        );

        if (!existing) {
          existing = {
            _id: `mem_conv_${Date.now()}`,
            participants: [
              { _id: buyerId, name: req.user.name, avatar: req.user.avatar },
              { _id: sellerId, name: 'Verified Student Seller', avatar: '' },
            ],
            listing: listingDoc || { _id: listingId, title: 'Campus Resource' },
            lastMessage: 'Conversation started',
            lastMessageAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          memoryConversations.unshift(existing);
        }

        return sendResponse(res, 200, existing, 'Conversation retrieved successfully');
      }

      // Check DB for existing conversation between buyer and seller for this listing
      let conversation = await Conversation.findOne({
        participants: { $all: [buyerId, sellerId] },
        ...(listingId ? { listing: listingId } : {}),
      })
        .populate('participants', 'name avatar college course branch verificationStatus campus')
        .populate('listing');

      if (!conversation) {
        // Check for any conversation between buyer and seller
        conversation = await Conversation.findOne({
          participants: { $all: [buyerId, sellerId] },
        })
          .populate('participants', 'name avatar college course branch verificationStatus campus')
          .populate('listing');
      }

      if (!conversation) {
        const newConv = await Conversation.create({
          participants: [buyerId, sellerId],
          listing: listingId || undefined,
          lastMessage: 'Conversation started',
          lastMessageAt: new Date(),
        });

        conversation = await Conversation.findById(newConv._id)
          .populate('participants', 'name avatar college course branch verificationStatus campus')
          .populate('listing');
      }

      return sendResponse(res, 201, conversation, 'Conversation initialized');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all conversations for current user
   * GET /api/v1/conversations
   */
  async getConversations(req, res, next) {
    try {
      const userId = req.user._id;

      if (!this.isDbConnected()) {
        const userConvs = memoryConversations.filter((c) =>
          c.participants.some((p) => String(p._id || p.id) === String(userId))
        );
        return sendResponse(res, 200, userConvs, 'Conversations retrieved');
      }

      const conversations = await Conversation.find({
        participants: userId,
      })
        .populate('participants', 'name avatar college course branch verificationStatus campus')
        .populate('listing')
        .sort({ updatedAt: -1 });

      return sendResponse(res, 200, conversations, 'Conversations retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get single conversation details & message history with authorization check
   * GET /api/v1/conversations/:id
   */
  async getConversationById(req, res, next) {
    try {
      const userId = req.user._id;
      const { id } = req.params;

      if (!this.isDbConnected()) {
        const found = memoryConversations.find((c) => String(c._id) === String(id));
        if (!found) {
          throw new ApiError(404, 'Conversation not found', 'NOT_FOUND');
        }
        const isParticipant = found.participants.some((p) => String(p._id || p.id) === String(userId));
        if (!isParticipant) {
          throw new ApiError(403, 'You are not authorized to view this private conversation', 'FORBIDDEN');
        }
        const messages = memoryMessages.filter((m) => String(m.conversation) === String(id));
        return sendResponse(res, 200, { ...found, messages }, 'Conversation loaded');
      }

      const conversation = await Conversation.findById(id)
        .populate('participants', 'name avatar college course branch verificationStatus campus')
        .populate('listing');

      if (!conversation) {
        throw new ApiError(404, 'Conversation not found', 'NOT_FOUND');
      }

      // Security Check: Verify user is a participant
      const isParticipant = conversation.participants.some(
        (p) => String(p._id || p.id) === String(userId)
      );

      if (!isParticipant) {
        throw new ApiError(403, 'You are not authorized to view this private conversation', 'FORBIDDEN');
      }

      const messages = await Message.find({ conversation: id })
        .populate('sender', 'name avatar')
        .sort({ createdAt: 1 });

      return sendResponse(
        res,
        200,
        {
          ...conversation.toObject(),
          messages,
        },
        'Conversation details retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Send message in a conversation
   * POST /api/v1/conversations/:id/messages
   */
  async sendMessage(req, res, next) {
    try {
      const userId = req.user._id;
      const { id } = req.params;
      const { text } = req.body;

      if (!text || !text.trim()) {
        throw new ApiError(400, 'Message text is required', 'MISSING_TEXT');
      }

      if (!this.isDbConnected()) {
        const found = memoryConversations.find((c) => String(c._id) === String(id));
        if (!found) {
          throw new ApiError(404, 'Conversation not found', 'NOT_FOUND');
        }
        const newMsg = {
          _id: `mem_msg_${Date.now()}`,
          conversation: id,
          sender: userId,
          text: text.trim(),
          createdAt: new Date().toISOString(),
        };
        memoryMessages.push(newMsg);
        found.lastMessage = text.trim();
        found.lastMessageAt = new Date().toISOString();
        return sendResponse(res, 201, newMsg, 'Message sent successfully');
      }

      const conversation = await Conversation.findById(id);
      if (!conversation) {
        throw new ApiError(404, 'Conversation not found', 'NOT_FOUND');
      }

      // Security Check: Verify user is a participant
      const isParticipant = conversation.participants.some(
        (p) => String(p._id || p) === String(userId)
      );

      if (!isParticipant) {
        throw new ApiError(403, 'You are not authorized to send messages in this conversation', 'FORBIDDEN');
      }

      const message = await Message.create({
        conversation: id,
        sender: userId,
        text: text.trim(),
        status: 'sent',
      });

      await Conversation.findByIdAndUpdate(id, {
        lastMessage: text.trim(),
        lastMessageAt: new Date(),
      });

      return sendResponse(res, 201, message, 'Message sent successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ConversationController();
