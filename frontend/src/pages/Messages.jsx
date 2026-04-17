import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare, Search, Send, Paperclip, Smile, MoreVertical,
  Phone, Video, ArrowLeft, Circle, CheckCheck, Image, File,
  Star, Pin, Archive, Trash2, Plus, Users, Shield
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }
});

const conversations = [];

const chatMessages = [];

export default function Messages() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showChat, setShowChat] = useState(false);

  const filteredConversations = conversations.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.contract.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectChat = (conv) => {
    setSelectedChat(conv);
    setShowChat(true);
  };

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
                <MessageSquare size={22} className="text-primary-400" />
                Messages
              </h1>
              <button className="w-9 h-9 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 hover:bg-primary-500/20 transition-colors">
                <Plus size={18} />
              </button>
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
                <p className="text-sm text-dark-400 font-medium">No conversations found</p>
                <p className="text-xs text-dark-600 mt-1">Try a different search term</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => handleSelectChat(conv)}
                  className={`w-full flex items-start gap-3 px-5 py-4 hover:bg-dark-800/50 transition-all relative ${
                    selectedChat?.id === conv.id ? 'bg-dark-800/60 border-l-2 border-l-primary-500' : 'border-l-2 border-l-transparent'
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${conv.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-dark-800" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="text-sm font-semibold text-white truncate">{conv.name}</h3>
                      <span className="text-[10px] text-dark-500 shrink-0 ml-2">{conv.time}</span>
                    </div>
                    <p className="text-xs text-dark-500 truncate mb-1">{conv.contract}</p>
                    <p className="text-xs text-dark-400 truncate">{conv.lastMessage}</p>
                  </div>

                  {/* Unread Badge */}
                  {conv.unread > 0 && (
                    <span className="shrink-0 mt-1 bg-primary-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* ─── CHAT AREA ─── */}
        <div className={`flex-1 flex flex-col ${!showChat ? 'hidden md:flex' : 'flex'}`}>
          {selectedChat ? (
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
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedChat.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                      {selectedChat.avatar}
                    </div>
                    {selectedChat.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-dark-900" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{selectedChat.name}</h3>
                    <p className="text-[11px] text-dark-500 flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${selectedChat.online ? 'bg-emerald-500' : 'bg-dark-600'}`} />
                      {selectedChat.online ? 'Online' : 'Offline'}
                      <span className="text-dark-700">•</span>
                      {selectedChat.contract}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
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
                {/* Date Separator */}
                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-dark-700/30" />
                  <span className="text-[10px] font-bold text-dark-600 uppercase tracking-wider">Today</span>
                  <div className="flex-1 h-px bg-dark-700/30" />
                </div>

                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[75%] ${msg.sender === 'me' ? 'order-1' : ''}`}>
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.sender === 'me'
                            ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-br-md shadow-lg shadow-primary-500/10'
                            : 'bg-dark-800 text-dark-200 border border-dark-700/50 rounded-bl-md'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div className={`flex items-center gap-1.5 mt-1 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                        <span className="text-[10px] text-dark-600">{msg.time}</span>
                        {msg.sender === 'me' && (
                          <CheckCheck size={12} className={msg.status === 'read' ? 'text-primary-400' : 'text-dark-600'} />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
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
                      type="text"
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700/50 rounded-xl text-sm text-dark-200 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all placeholder:text-dark-500"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300 transition-colors">
                      <Smile size={18} />
                    </button>
                  </div>
                  <button className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:from-primary-600 hover:to-accent-600 transition-all shadow-lg shadow-primary-500/20 active:scale-95">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* No Chat Selected */
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/20 flex items-center justify-center mb-5">
                <MessageSquare size={36} className="text-primary-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Select a Conversation</h3>
              <p className="text-sm text-dark-400 max-w-xs">Choose a conversation from the left to start messaging your freelancers and support team.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
