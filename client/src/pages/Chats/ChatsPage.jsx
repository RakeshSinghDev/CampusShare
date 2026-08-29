import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { MessageSquare, Search } from 'lucide-react';

import { useChat } from '@/hooks/useChat';
import { ChatSearch } from './components/ChatSearch';
import { ConversationList } from './components/ConversationList';
import { ConversationHeader } from './components/ConversationHeader';
import { ChatProductContext } from './components/ChatProductContext';
import { MessageList } from './components/MessageList';
import { MessageComposer } from './components/MessageComposer';
import { Card } from '@/components/ui/card';

export default function ChatsPage() {
  const { conversationId } = useParams();
  const navigate = useNavigate();

  const {
    conversations,
    activeConversation,
    activeId,
    selectConversation,
    searchQuery,
    setSearchQuery,
    sendMessage,
    retryMessage,
  } = useChat(conversationId);

  const handleSelectConv = (id) => {
    selectConversation(id);
    navigate(`/chats/${id}`);
  };

  const handleBackToMobileList = () => {
    navigate('/chats');
  };

  const isDetailViewOnMobile = Boolean(conversationId);

  return (
    <PageContainer className="pb-16 lg:pb-6">
      <SectionHeader
        title="Student Messages"
        subtitle="Chat with verified campus buyers, sellers & lenders to arrange handoffs"
      />

      {conversations.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No conversations yet"
          description="Message a verified student when you find something you want to buy or rent on campus."
          actionLabel="Explore Campus Resources"
          onAction={() => navigate('/search')}
        />
      ) : (
        <Card className="rounded-2xl border-slate-200 bg-white overflow-hidden shadow-subtle min-h-[600px] h-[calc(100vh-220px)] flex flex-col lg:flex-row">
          
          {/* LEFT COLUMN: Conversation List & Search (Hidden on Mobile when active detail route) */}
          <div
            className={`w-full lg:w-80 border-r border-slate-200 bg-slate-50/50 flex flex-col p-3 shrink-0 ${
              isDetailViewOnMobile ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <ChatSearch value={searchQuery} onChange={setSearchQuery} />
            
            <ConversationList
              conversations={conversations}
              activeId={activeId}
              onSelect={handleSelectConv}
            />
          </div>

          {/* RIGHT COLUMN: Active Conversation Panel (Hidden on Mobile when no detail route) */}
          <div
            className={`w-full flex-1 flex flex-col justify-between bg-white ${
              !isDetailViewOnMobile ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {activeConversation ? (
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Active Chat Header */}
                <ConversationHeader
                  participant={activeConversation.participant}
                  onBack={handleBackToMobileList}
                />

                {/* Sticky Product Context Summary */}
                <ChatProductContext product={activeConversation.product} />

                {/* Scrollable Message History */}
                <MessageList
                  messages={activeConversation.messages}
                  onRetry={retryMessage}
                />

                {/* Fixed Bottom Message Composer */}
                <MessageComposer onSend={sendMessage} />
              </div>
            ) : (
              /* Desktop Empty Active Selection Prompt */
              <div className="hidden lg:flex flex-col items-center justify-center h-full p-8 text-center space-y-3 text-slate-400">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Select a Conversation</h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Choose a student conversation from the list to view message history and discuss campus pickups.
                </p>
              </div>
            )}
          </div>

        </Card>
      )}
    </PageContainer>
  );
}
