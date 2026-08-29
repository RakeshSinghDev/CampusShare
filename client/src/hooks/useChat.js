import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatService } from '@/services/chatService';
import { useAuth } from '@/hooks/useAuth';
import { mockConversations } from '@/data/chatData';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

/**
 * Safely extracts text, timestamp, and metadata from string or object lastMessage values
 */
function normalizeLastMessage(lastMsg) {
  if (!lastMsg) {
    return { text: 'Conversation started', timestamp: 'Just now', isSentByMe: false };
  }
  if (typeof lastMsg === 'string') {
    return { text: lastMsg, timestamp: 'Just now', isSentByMe: false };
  }
  if (typeof lastMsg === 'object') {
    const rawText = lastMsg.text;
    const textStr = typeof rawText === 'string'
      ? rawText
      : (typeof rawText === 'object' ? rawText?.text || 'Conversation started' : String(rawText || 'Conversation started'));

    const timeStr = typeof lastMsg.timestamp === 'string'
      ? lastMsg.timestamp
      : (lastMsg.createdAt ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now');

    return {
      text: textStr,
      timestamp: timeStr,
      isSentByMe: Boolean(lastMsg.isSentByMe),
    };
  }
  return { text: 'Conversation started', timestamp: 'Just now', isSentByMe: false };
}

/**
 * Custom React Hook managing CampusShare Chat & Messaging state (/chats & /chats/:conversationId).
 * Integrates backend API with optimistic updates and fallback demo data.
 */
export function useChat(initialConversationId = null) {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const currentUserId = user?._id || user?.id;

  const [activeId, setActiveId] = useState(initialConversationId);
  const [searchQuery, setSearchQuery] = useState('');

  // Keep activeId in sync with route URL param changes
  useEffect(() => {
    if (initialConversationId) {
      setActiveId(initialConversationId);
    }
  }, [initialConversationId]);

  // Query all user conversations from API
  const { data: apiConversations, isLoading: isConversationsLoading } = useQuery({
    queryKey: ['conversations', currentUserId],
    queryFn: () => chatService.getConversations(),
    enabled: Boolean(isAuthenticated && currentUserId),
    retry: 1,
  });

  // Query specific active conversation details & messages from API
  const { data: apiActiveConv, isLoading: isActiveConvLoading } = useQuery({
    queryKey: ['conversation', activeId],
    queryFn: () => chatService.getConversationById(activeId),
    enabled: Boolean(isAuthenticated && activeId && !activeId.startsWith('conv_')),
    retry: 1,
  });

  // Merge API conversations with mock conversations for seamless UX
  const conversations = useMemo(() => {
    const list = Array.isArray(apiConversations) && apiConversations.length > 0 ? apiConversations : mockConversations;

    return list.map((c) => {
      const otherParticipant = Array.isArray(c.participants)
        ? c.participants.find((p) => String(p._id || p.id) !== String(currentUserId)) || c.participants[0]
        : c.participant || { name: 'Verified Student Seller', avatarUrl: '' };

      const prod = c.listing || c.product || { title: 'Campus Resource', imageUrl: '' };
      const lastMsg = normalizeLastMessage(c.lastMessage);

      return {
        id: c._id || c.id,
        _id: c._id || c.id,
        participant: {
          id: otherParticipant?._id || otherParticipant?.id || 'usr_seller',
          name: otherParticipant?.name || 'Verified Student Seller',
          avatarUrl: otherParticipant?.avatarUrl || otherParticipant?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          isVerified: true,
          major: otherParticipant?.course || 'Campus Student',
          university: otherParticipant?.college || 'Stanford University',
          campus: otherParticipant?.campus || 'Main Campus',
          isOnline: true,
        },
        product: {
          id: prod._id || prod.id || 'prod_item',
          title: prod.title || 'Campus Academic Resource',
          price: prod.salePrice || prod.rentalPricing?.price || prod.price || 0,
          priceLabel: prod.salePrice ? `${formatCurrency(prod.salePrice)} Buy` : prod.rentalPricing?.price ? `${formatCurrency(prod.rentalPricing.price)}/wk Rent` : '₹0',
          listingType: prod.listingType || 'sale',
          status: prod.status || 'available',
          imageUrl: prod.images?.[0]?.url || prod.images?.[0] || prod.imageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
        },
        lastMessage: lastMsg,
        unreadCount: c.unreadCount || 0,
        updatedAt: c.updatedAt || new Date().toISOString(),
        messages: Array.isArray(c.messages) ? c.messages : [],
      };
    });
  }, [apiConversations, currentUserId]);

  // Set default activeId if none provided and conversations exist
  useEffect(() => {
    if (!activeId && conversations.length > 0) {
      setActiveId(conversations[0].id);
    }
  }, [activeId, conversations]);

  // Compute currently active conversation object
  const activeConversation = useMemo(() => {
    if (!activeId) return conversations[0] || null;

    // Check if real API single conversation details came back
    if (apiActiveConv) {
      const otherParticipant = Array.isArray(apiActiveConv.participants)
        ? apiActiveConv.participants.find((p) => String(p._id || p.id) !== String(currentUserId)) || apiActiveConv.participants[0]
        : apiActiveConv.participant;

      const prod = apiActiveConv.listing || apiActiveConv.product || {};
      const lastMsg = normalizeLastMessage(apiActiveConv.lastMessage);

      const formattedMessages = Array.isArray(apiActiveConv.messages)
        ? apiActiveConv.messages.map((m) => {
            const textContent = typeof m.text === 'string' ? m.text : (typeof m.text === 'object' ? m.text?.text || '' : String(m.text || ''));
            return {
              id: m._id || m.id,
              senderId: m.sender?._id || m.sender || 'usr_sender',
              text: textContent,
              timestamp: m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now',
              status: m.status || 'sent',
              isSentByMe: String(m.sender?._id || m.sender) === String(currentUserId),
            };
          })
        : [];

      return {
        id: apiActiveConv._id || apiActiveConv.id,
        _id: apiActiveConv._id || apiActiveConv.id,
        participant: {
          id: otherParticipant?._id || otherParticipant?.id || 'usr_seller',
          name: otherParticipant?.name || 'Verified Student Seller',
          avatarUrl: otherParticipant?.avatarUrl || otherParticipant?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          isVerified: true,
          major: otherParticipant?.course || 'Campus Student',
          university: otherParticipant?.college || 'Stanford University',
          campus: otherParticipant?.campus || 'Main Campus',
          isOnline: true,
        },
        product: {
          id: prod._id || prod.id || 'prod_item',
          title: prod.title || 'Campus Academic Resource',
          price: prod.salePrice || prod.rentalPricing?.price || 0,
          priceLabel: prod.salePrice ? `${formatCurrency(prod.salePrice)} Buy` : '₹0',
          listingType: prod.listingType || 'sale',
          status: prod.status || 'available',
          imageUrl: prod.images?.[0]?.url || prod.images?.[0] || prod.imageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
        },
        lastMessage: lastMsg,
        unreadCount: 0,
        messages: formattedMessages,
      };
    }

    return conversations.find((c) => String(c.id) === String(activeId)) || conversations[0] || null;
  }, [activeId, apiActiveConv, conversations, currentUserId]);

  // Search filtered conversations
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const query = searchQuery.toLowerCase();
    return conversations.filter(
      (c) =>
        c.participant.name.toLowerCase().includes(query) ||
        c.product.title.toLowerCase().includes(query) ||
        (c.lastMessage?.text && String(c.lastMessage.text).toLowerCase().includes(query))
    );
  }, [conversations, searchQuery]);

  // Select active conversation
  const selectConversation = useCallback((convId) => {
    setActiveId(convId);
  }, []);

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: ({ convId, text }) => chatService.sendMessage(convId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversation', activeId] });
      queryClient.invalidateQueries({ queryKey: ['conversations', currentUserId] });
    },
  });

  const sendMessage = useCallback(
    (text) => {
      if (!text.trim() || !activeId) return;

      if (!activeId.startsWith('conv_') && isAuthenticated) {
        sendMessageMutation.mutate({ convId: activeId, text: text.trim() });
      }
    },
    [activeId, isAuthenticated, sendMessageMutation]
  );

  return {
    conversations: filteredConversations,
    activeConversation,
    activeId,
    selectConversation,
    searchQuery,
    setSearchQuery,
    sendMessage,
    isLoading: isConversationsLoading || isActiveConvLoading,
  };
}
