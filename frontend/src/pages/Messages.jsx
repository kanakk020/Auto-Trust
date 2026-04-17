import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MessageSquare, Search, Send, Paperclip, Smile, MoreVertical,
  Phone, Video, ArrowLeft, CheckCheck, Image, File,
  Star, Plus, Shield, Zap, Circle
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }
});

// ─── Shared Chat Storage Helpers ───
const STORAGE_KEY = 'autotrust_chat_messages';
const CONVERSATIONS_KEY = 'autotrust_conversations';

const getStoredMessages = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch { return {}; }
};

const getStoredConversations = () => {
  try {
    return JSON.parse(localStorage.getItem(CONVERSATIONS_KEY) || '[]');
  } catch { return []; }
};

const saveMessages = (messages) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};

const saveConversations = (convos) => {
  localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(convos));
};

// Initialize default conversations if none exist
const initializeConversations = (role) => {
  const existing = getStoredConversations();
  if (existing.length > 0) return existing;

  const defaults = [
    {
      id: 'conv-1',
      clientName: 'Client User',
      freelancerName: 'Freelancer User',
      contract: 'Website Development',
      clientAvatar: 'CL',
      freelancerAvatar: 'FL',
      clientGradient: 'from-primary-500 to-accent-500',
      freelancerGradient: 'from-emerald-500 to-primary-500',
      online: true,
      lastMessage: 'Start a conversation...',
      lastMessageTime: new Date().toISOString(),
      unreadClient: 0,
      unreadFreelancer: 0,
    }
  ];

  saveConversations(defaults);
  return defaults;
};

export default function Messages() {
  const navigate = useNavigate();
  const location = useLocation();
  const isFreelancer = location.pathname.startsWith('/freelancer');
  const role = isFreelancer ? 'freelancer' : 'client';

  const [conversations, setConversations] = useState([]);
  const [selectedConvId, setSelectedConvId] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load conversations
  useEffect(() => {
    const convos = initializeConversations(role);
    setConversations(convos);
  }, [role]);

  // Load messages for selected conversation & poll for new ones
  useEffect(() => {
    if (!selectedConvId) return;

    const loadMessages = () => {
      const allMessages = getStoredMessages();
      const convMessages = allMessages[selectedConvId] || [];
      setChatMessages(convMessages);
    };

    loadMessages();

    // Poll every 500ms for new messages (real-time feel)
    const interval = setInterval(loadMessages, 500);

    // Also listen to storage events from other tabs
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) loadMessages();
      if (e.key === CONVERSATIONS_KEY) {
        setConversations(getStoredConversations());
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorage);
    };
  }, [selectedConvId]);

  // Also poll conversations for unread updates
  useEffect(() => {
    const interval = setInterval(() => {
      setConversations(getStoredConversations());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Clear unread when selecting a chat
  useEffect(() => {
    if (!selectedConvId) return;
    const convos = getStoredConversations();
    const updated = convos.map(c => {
      if (c.id === selectedConvId) {
        return {
          ...c,
          [role === 'client' ? 'unreadClient' : 'unreadFreelancer']: 0
        };
      }
      return c;
    });
    saveConversations(updated);
    setConversations(updated);
  }, [selectedConvId, role]);

  const handleSendMessage = useCallback(() => {
    if (!messageInput.trim() || !selectedConvId) return;

    const newMsg = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      sender: role,
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    // Save message
    const allMessages = getStoredMessages();
    const convMessages = allMessages[selectedConvId] || [];
    convMessages.push(newMsg);
    allMessages[selectedConvId] = convMessages;
    saveMessages(allMessages);
    setChatMessages([...convMessages]);

    // Update conversation metadata
    const convos = getStoredConversations();
    const updated = convos.map(c => {
      if (c.id === selectedConvId) {
        return {
          ...c,
          lastMessage: newMsg.text,
          lastMessageTime: newMsg.timestamp,
          [role === 'client' ? 'unreadFreelancer' : 'unreadClient']:
            (c[role === 'client' ? 'unreadFreelancer' : 'unreadClient'] || 0) + 1
        };
      }
      return c;
    });
    saveConversations(updated);
    setConversations(updated);

    setMessageInput('');
    inputRef.current?.focus();
  }, [messageInput, selectedConvId, role]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedConv = conversations.find(c => c.id === selectedConvId);

  const filteredConversations = conversations.filter(c => {
    const name = role === 'client' ? c.freelancerName : c.clientName;
    return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contract.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getUnread = (conv) => role === 'client' ? conv.unreadClient : conv.unreadFreelancer;
  const getOtherName = (conv) => role === 'client' ? conv.freelancerName : conv.clientName;
  const getOtherAvatar = (conv) => role === 'client' ? conv.freelancerAvatar : conv.clientAvatar;
  const getOtherGradient = (conv) => role === 'client' ? conv.freelancerGradient : conv.clientGradient;

  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const handleSelectChat = (conv) => {
    setSelectedConvId(conv.id);
    setShowChat(true);
  };

  // Accent colors based on role
  const accent = isFreelancer
    ? { primary: 'emerald', gradient: 'from-emerald-500 to-primary-500', text: 'text-emerald-400', bg: 'bg-emerald-500', glow: 'shadow-emerald-500/20' }
    : { primary: 'primary', gradient: 'from-primary-500 to-accent-500', text: 'text-primary-400', bg: 'bg-primary-500', glow: 'shadow-primary-500/20' };

  return (
    <div className="max-w-[1400px] mx-auto h-[calc(100vh-120px)]">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors group mb-4"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </motion.button>

      <motion.div {...fadeUp(0)} className="h-[calc(100%-40px)] rounded-2xl bg-dark-800/40 border border-dark-700/50 overflow-hidden flex">

        {/* ─── CONVERSATION LIST ─── */}
        <div className={`w-full md:w-[340px] border-r border-dark-700/30 flex flex-col ${showChat ? 'hidden md:flex' : 'flex'}`}>
          {/* Header */}
          <div className="px-5 pt-5 pb-4 border-b border-dark-700/30">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare size={22} className={accent.text} />
                Messages
              </h1>
              <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                isFreelancer 
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                  : 'bg-primary-500/15 text-primary-400 border border-primary-500/20'
              }`}>
                {isFreelancer ? '🟢 Freelancer' : '🔵 Client'}
              </div>
            </div>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-500" size={16} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-dark-900/50 border border-dark-700/50 rounded-xl text-sm text-dark-200 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all placeholder:text-dark-500"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                <MessageSquare size={32} className="text-dark-600 mb-3" />
                <p className="text-sm text-dark-400 font-medium">No conversations yet</p>
                <p className="text-xs text-dark-600 mt-1">Conversations will appear here when you create contracts</p>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const unread = getUnread(conv);
                return (
                  <button
                    key={conv.id}
                    onClick={() => handleSelectChat(conv)}
                    className={`w-full flex items-start gap-3 px-5 py-4 hover:bg-dark-800/50 transition-all relative ${
                      selectedConvId === conv.id
                        ? `bg-dark-800/60 border-l-2 ${isFreelancer ? 'border-l-emerald-500' : 'border-l-primary-500'}`
                        : 'border-l-2 border-l-transparent'
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${getOtherGradient(conv)} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                        {getOtherAvatar(conv)}
                      </div>
                      {conv.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-dark-800" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="text-sm font-semibold text-white truncate">{getOtherName(conv)}</h3>
                        <span className="text-[10px] text-dark-500 shrink-0 ml-2">{formatTime(conv.lastMessageTime)}</span>
                      </div>
                      <p className="text-xs text-dark-500 truncate mb-1">
                        <span className={`inline-flex items-center gap-1 ${isFreelancer ? 'text-emerald-500/60' : 'text-primary-500/60'}`}>
                          <Shield size={10} /> {conv.contract}
                        </span>
                      </p>
                      <p className="text-xs text-dark-400 truncate">{conv.lastMessage}</p>
                    </div>

                    {/* Unread Badge */}
                    {unread > 0 && (
                      <span className={`shrink-0 mt-1 ${isFreelancer ? 'bg-emerald-500' : 'bg-primary-500'} text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse`}>
                        {unread}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ─── CHAT AREA ─── */}
        <div className={`flex-1 flex flex-col ${!showChat ? 'hidden md:flex' : 'flex'}`}>
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-dark-700/30 bg-dark-900/30">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowChat(false)}
                    className="md:hidden text-dark-400 hover:text-white transition-colors mr-1"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getOtherGradient(selectedConv)} flex items-center justify-center text-white font-bold text-sm`}>
                      {getOtherAvatar(selectedConv)}
                    </div>
                    {selectedConv.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-dark-900" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{getOtherName(selectedConv)}</h3>
                    <p className="text-[11px] text-dark-500 flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${selectedConv.online ? 'bg-emerald-500' : 'bg-dark-600'}`} />
                      {selectedConv.online ? 'Online' : 'Offline'}
                      <span className="text-dark-700">•</span>
                      {selectedConv.contract}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {/* Role indicator */}
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg mr-2 ${
                    isFreelancer
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                  }`}>
                    {isFreelancer ? 'You: Freelancer' : 'You: Client'}
                  </span>
                  <button className="p-2 text-dark-400 hover:text-dark-200 hover:bg-dark-800/50 rounded-lg transition-colors">
                    <Phone size={18} />
                  </button>
                  <button className="p-2 text-dark-400 hover:text-dark-200 hover:bg-dark-800/50 rounded-lg transition-colors">
                    <Video size={18} />
                  </button>
                  <button className="p-2 text-dark-400 hover:text-dark-200 hover:bg-dark-800/50 rounded-lg transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {/* Encrypted Notice */}
                <div className="flex justify-center mb-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800/60 border border-dark-700/30">
                    <Shield size={12} className="text-emerald-400" />
                    <span className="text-[11px] text-dark-500">Messages are end-to-end secured via AutoTrust</span>
                  </div>
                </div>

                {chatMessages.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${accent.gradient} bg-opacity-20 flex items-center justify-center mb-4 opacity-30`}>
                      <MessageSquare size={28} className="text-white" />
                    </div>
                    <p className="text-sm text-dark-400 font-medium">No messages yet</p>
                    <p className="text-xs text-dark-600 mt-1">Send the first message to start the conversation!</p>
                  </div>
                )}

                {/* Date Separator */}
                {chatMessages.length > 0 && (
                  <div className="flex items-center gap-3 my-2">
                    <div className="flex-1 h-px bg-dark-700/30" />
                    <span className="text-[10px] font-bold text-dark-600 uppercase tracking-wider">Today</span>
                    <div className="flex-1 h-px bg-dark-700/30" />
                  </div>
                )}

                {chatMessages.map((msg, idx) => {
                  const isMe = msg.sender === role;
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      {/* Other user avatar */}
                      {!isMe && (
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getOtherGradient(selectedConv)} flex items-center justify-center text-white text-[10px] font-bold mr-2 mt-1 shrink-0`}>
                          {getOtherAvatar(selectedConv)}
                        </div>
                      )}

                      <div className={`max-w-[75%] ${isMe ? 'order-1' : ''}`}>
                        {/* Sender Label */}
                        <p className={`text-[10px] font-semibold mb-1 ${isMe ? 'text-right' : 'text-left'} ${
                          isMe
                            ? (isFreelancer ? 'text-emerald-500/60' : 'text-primary-500/60')
                            : (isFreelancer ? 'text-primary-500/60' : 'text-emerald-500/60')
                        }`}>
                          {isMe ? 'You' : getOtherName(selectedConv)}
                          <span className="text-dark-600 ml-1.5">
                            {msg.sender === 'client' ? '(Client)' : '(Freelancer)'}
                          </span>
                        </p>

                        <div
                          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                            isMe
                              ? `bg-gradient-to-r ${accent.gradient} text-white rounded-br-md shadow-lg ${accent.glow}`
                              : 'bg-dark-800 text-dark-200 border border-dark-700/50 rounded-bl-md'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <div className={`flex items-center gap-1.5 mt-1 ${isMe ? 'justify-end' : ''}`}>
                          <span className="text-[10px] text-dark-600">{msg.time}</span>
                          {isMe && (
                            <CheckCheck size={12} className={accent.text} />
                          )}
                        </div>
                      </div>

                      {/* My avatar */}
                      {isMe && (
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${
                          isFreelancer ? 'from-emerald-500 to-primary-500' : 'from-primary-500 to-accent-500'
                        } flex items-center justify-center text-white text-[10px] font-bold ml-2 mt-1 shrink-0`}>
                          {isFreelancer ? 'FL' : 'CL'}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="px-5 py-4 border-t border-dark-700/30 bg-dark-900/30">
                <div className="flex items-end gap-3">
                  <div className="flex gap-1">
                    <button className="p-2.5 text-dark-400 hover:text-dark-200 hover:bg-dark-800/50 rounded-xl transition-colors">
                      <Paperclip size={18} />
                    </button>
                    <button className="p-2.5 text-dark-400 hover:text-dark-200 hover:bg-dark-800/50 rounded-xl transition-colors">
                      <Image size={18} />
                    </button>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder={`Message as ${isFreelancer ? 'Freelancer' : 'Client'}...`}
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className={`w-full px-4 py-3 bg-dark-800/50 border border-dark-700/50 rounded-xl text-sm text-dark-200 outline-none transition-all placeholder:text-dark-500 ${
                        isFreelancer
                          ? 'focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10'
                          : 'focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/10'
                      }`}
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300 transition-colors">
                      <Smile size={18} />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className={`p-3 bg-gradient-to-r ${accent.gradient} text-white rounded-xl transition-all shadow-lg ${accent.glow} active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* No Chat Selected */
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${
                isFreelancer ? 'from-emerald-500/20 to-primary-500/20 border-emerald-500/20' : 'from-primary-500/20 to-accent-500/20 border-primary-500/20'
              } border flex items-center justify-center mb-5`}>
                <MessageSquare size={36} className={accent.text} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Select a Conversation</h3>
              <p className="text-sm text-dark-400 max-w-xs">
                {isFreelancer
                  ? 'Choose a conversation from the left to start messaging your clients.'
                  : 'Choose a conversation from the left to start messaging your freelancers.'
                }
              </p>
              <div className={`mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                isFreelancer
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
              }`}>
                <Zap size={12} />
                Logged in as {isFreelancer ? 'Freelancer' : 'Client'}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
