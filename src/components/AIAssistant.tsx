import React, { useEffect, useRef } from 'react';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

interface AIAssistantProps {
  chatHistory: ChatMessage[];
  chatMessage: string;
  setChatMessage: (msg: string) => void;
  handleSendMessage: () => void;
  isTyping: boolean;
  userBloodType: string;
}

export const AIAssistant = ({ 
  chatHistory, 
  chatMessage, 
  setChatMessage, 
  handleSendMessage, 
  isTyping, 
  userBloodType 
}: AIAssistantProps) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  return (
  <div className="flex flex-col h-[70vh] glass-card rounded-3xl overflow-hidden animate-in zoom-in duration-300">
    <div className="bg-navy-deep p-4 text-white flex items-center gap-3">
      <span className="material-icons-round text-primary">auto_awesome</span>
      <h2 className="font-bold">Assistente Nutricional</h2>
    </div>
    
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 dark:bg-navy-darker/50">
      {chatHistory.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <span className="material-icons-round text-4xl mb-2">chat_bubble_outline</span>
          <p>Olá! Sou sua IA nutricional. Como posso ajudar com sua dieta tipo {userBloodType}?</p>
        </div>
      )}
      {chatHistory.map((msg, idx) => (
        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-800 rounded-bl-none'}`}>
            <p className="text-sm leading-relaxed">{msg.text}</p>
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm animate-pulse">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
      <div ref={chatEndRef} />
    </div>

    <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
      <input 
        value={chatMessage}
        onChange={(e) => setChatMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        placeholder="Pergunte sobre um alimento..."
        className="flex-1 rounded-full border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-6 py-3 focus:ring-primary focus:border-primary"
      />
      <button 
        onClick={handleSendMessage}
        className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
      >
        <span className="material-icons-round">send</span>
      </button>
    </div>
  </div>
  );
};
