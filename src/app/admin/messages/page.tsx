"use client";

import React, { useState } from 'react';
import { MoreHorizontal, Send, Phone, Mail, Paperclip, Smile, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const DISCUSSIONS = [
  { id: 1, name: 'Ivan Magalhaes', time: '10m', message: 'Definiteness of purpose is the starting point', avatar: 'https://i.pravatar.cc/150?u=11' },
  { id: 2, name: 'Anje Keizer', time: '1m', message: 'Nothing is impossible, the word itself says', avatar: 'https://i.pravatar.cc/150?u=12', active: true },
  { id: 3, name: 'Ester Bednarova', time: '12h', message: 'When I stand before at the end of my life', avatar: 'https://i.pravatar.cc/150?u=13' },
  { id: 4, name: 'Jel Chibuzo', time: '1d', message: 'When I let go of what I am, I become what I might be', avatar: 'https://i.pravatar.cc/150?u=14' },
  { id: 5, name: 'Shen Zhi', time: '2d', message: 'It does not matter how slowly you go as long as you', avatar: 'https://i.pravatar.cc/150?u=15' },
  { id: 6, name: 'Aaron Almaraz', time: '2d', message: 'Do what you can, where you are, with what you have', avatar: 'https://i.pravatar.cc/150?u=16' },
  { id: 7, name: 'Darren Adams', time: '1d', message: "You can't fall if you don't climb. But there's no joy", avatar: 'https://i.pravatar.cc/150?u=17' },
];

const CHAT_HISTORY = [
  { id: 1, sender: 'them', message: 'What is your favorite fruit?', time: '8:00 PM', avatar: 'https://i.pravatar.cc/150?u=16' },
  { id: 2, sender: 'me', message: 'Nothing is impossible, the word itself says, I\'m possible', time: '8:13 PM', avatar: 'https://i.pravatar.cc/150?u=99' },
  { id: 3, sender: 'them', message: 'The modern world is in a continuous movement and people', time: '8:15 PM', avatar: 'https://i.pravatar.cc/150?u=16' },
  { id: 4, sender: 'me', message: 'Life is about making an impact', time: '8:23 PM', avatar: 'https://i.pravatar.cc/150?u=99' },
  { id: 5, sender: 'them', message: 'Despite growth of the Internet over the past seven years', time: '8:48 PM', avatar: 'https://i.pravatar.cc/150?u=16' },
  { id: 6, sender: 'me', message: 'How slowly you go as long as you do not stop', time: '8:50 PM', avatar: 'https://i.pravatar.cc/150?u=99' },
  { id: 7, sender: 'them', message: 'I stand before at the end of my life', time: '8:53 PM', avatar: 'https://i.pravatar.cc/150?u=16' },
];

export default function MessagesPage() {
  const [activeChat] = useState(DISCUSSIONS[5]);

  return (
    <div className="w-full h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">Chat</h1>
      </div>

      {/* Main Container - 3 Columns */}
      <div className="flex flex-1 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden dark:shadow-none min-h-0">

        {/* Left Column: Discussions List */}
        <div className="w-full md:w-[320px] flex flex-col border-r border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-transparent">
          <div className="p-5 flex items-center justify-between border-b border-gray-200 dark:border-white/10">
            <h2 className="font-semibold text-gray-900 dark:text-zinc-100">Discussions</h2>
            <button className="text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {DISCUSSIONS.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-start gap-3 p-4 border-b border-gray-100 dark:border-white/5 cursor-pointer transition-colors ${activeChat.id === chat.id
                    ? 'bg-blue-50/50 dark:bg-white/10'
                    : 'hover:bg-gray-50 dark:hover:bg-white/[0.02]'
                  }`}
              >
                <Avatar className="w-10 h-10 border border-gray-200 dark:border-white/10">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 truncate pr-2">{chat.name}</h3>
                    <span className="text-xs text-gray-400 dark:text-zinc-500 flex-shrink-0">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {chat.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column: Chat Window */}
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-transparent">
          {/* Chat Header */}
          <div className="h-[72px] px-6 flex items-center justify-between border-b border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border border-gray-200 dark:border-white/10">
                <AvatarImage src={activeChat.avatar} />
                <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-zinc-100">{activeChat.name}</h2>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-gray-500 dark:text-zinc-400">Online</span>
              </div>
              <button className="text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {CHAT_HISTORY.map((msg) => {
              const isMe = msg.sender === 'me';
              return (
                <div key={msg.id} className={`flex items-end gap-3 max-w-[80%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'}`}>
                  <Avatar className="w-8 h-8 border border-gray-200 dark:border-white/10 mb-1 flex-shrink-0">
                    <AvatarImage src={msg.avatar} />
                    <AvatarFallback>{isMe ? 'M' : 'T'}</AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col gap-1 ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm ${isMe
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-zinc-100 rounded-bl-sm'
                      }`}>
                      {msg.message}
                    </div>
                    <span className="text-[11px] text-gray-400 dark:text-zinc-500 mx-1">{msg.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full p-2 pr-3">
              <button className="p-2 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 rounded-full transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Type to add your comment"
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-900 dark:text-zinc-100 dark:placeholder-zinc-500"
              />
              <button className="p-2 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 rounded-full transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors ml-1">
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Info */}
        <div className="hidden lg:flex w-[320px] flex-col border-l border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-transparent overflow-y-auto">
          {/* Cover & Avatar */}
          <div className="relative h-[140px] bg-gray-200 dark:bg-white/10 m-4 rounded-2xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=2939&auto=format&fit=crop" alt="Cover" className="w-full h-full object-cover" />
          </div>

          <div className="px-6 flex flex-col items-center -mt-12 mb-6">
            <Avatar className="w-20 h-20 border-4 border-gray-50 dark:border-[#0a0a0a] shadow-sm mb-3">
              <AvatarImage src={activeChat.avatar} />
              <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100">{activeChat.name}</h2>
            <p className="text-sm text-gray-500 dark:text-zinc-400">Developer</p>

            <div className="flex gap-2 mt-4">
              {['bg-blue-100 text-blue-600', 'bg-blue-100 text-blue-500', 'bg-blue-100 text-blue-700', 'bg-red-100 text-red-600', 'bg-gray-200 text-gray-600'].map((color, i) => (
                <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${color.replace('100', '100 dark:bg-white/10')}`}>
                  {i === 4 ? <MoreHorizontal className="w-4 h-4" /> : <div className="w-3 h-3 bg-current rounded-sm opacity-50" />}
                </div>
              ))}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="px-6 py-5 border-t border-gray-200 dark:border-white/10">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 mb-4">Pending tasks</h3>

            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-zinc-400 mb-3">
                <span className="w-4 h-4 flex items-center justify-center border border-gray-300 dark:border-white/20 rounded">
                  <MoreHorizontal className="w-2 h-2" />
                </span>
                Due: 08 Dec 2026
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-zinc-100 mb-2">Design search page</h4>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed mb-4">
                I hate peeping Toms. For one thing they usually step all over the hedges and plants.
              </p>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <Avatar key={i} className="w-6 h-6 border-2 border-white dark:border-[#121212]">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${i + 20}`} />
                    </Avatar>
                  ))}
                  <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 border-2 border-white dark:border-[#121212] flex items-center justify-center text-[10px] text-gray-500 dark:text-zinc-400 font-medium">
                    +2
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400 mb-6">
              <span>2/9 Tasks</span>
              <div className="flex gap-1">
                <button className="p-1 border border-gray-200 dark:border-white/10 rounded-md hover:bg-gray-100 dark:hover:bg-white/10">
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <button className="p-1 border border-gray-200 dark:border-white/10 rounded-md hover:bg-gray-100 dark:hover:bg-white/10">
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 gap-2 rounded-xl border-gray-200 dark:border-white/10 dark:bg-transparent dark:text-zinc-200 dark:hover:bg-white/5 transition-colors h-11">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Email
              </Button>
              <Button variant="outline" className="flex-1 gap-2 rounded-xl border-gray-200 dark:border-white/10 dark:bg-transparent dark:text-zinc-200 dark:hover:bg-white/5 transition-colors h-11">
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Call
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Dummy chevron icons for pagination (since they weren't imported at top)
function ChevronLeft(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6" /></svg>
}
function ChevronRight(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6" /></svg>
}
