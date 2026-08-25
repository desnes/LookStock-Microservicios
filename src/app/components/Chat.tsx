"use client";

// Chat quemado: simula mensajes en memoria en vez de conectarse por
// socket.io al backend, para que el frontend funcione de forma independiente.
import { useState } from "react";
import { useAuth } from "../../context/authContext";

interface Message {
  name: string;
  message: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    name: "Ana Torres",
    message: "¡Buenos días! ¿Cómo va el inventario de vestidos?",
    timestamp: "2026-08-24T09:00:00.000Z",
  },
  {
    name: "Luis Ramos",
    message: "Todo en orden, quedan 24 unidades del Vestido Floral.",
    timestamp: "2026-08-24T09:02:00.000Z",
  },
];

const initials = (name: string) => name.slice(0, 2).toUpperCase();

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const { user } = useAuth();
  const myName = user?.name || "Tú";

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        name: myName,
        message,
        timestamp: new Date().toISOString(),
      },
    ]);
    setMessage("");
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => {
          const isMine = msg.name === myName;
          return (
            <div key={idx} className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"}`}>
              {!isMine && (
                <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-semibold shrink-0">
                  {initials(msg.name)}
                </div>
              )}
              <div className={`max-w-xs sm:max-w-md ${isMine ? "items-end" : "items-start"} flex flex-col`}>
                {!isMine && <span className="text-xs text-slate-400 mb-1 px-1">{msg.name}</span>}
                <div
                  className={`px-4 py-2 rounded-2xl text-sm ${
                    isMine ? "bg-blue-600 text-white rounded-br-sm" : "bg-slate-100 text-slate-800 rounded-bl-sm"
                  }`}
                >
                  {msg.message}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-slate-200 p-4 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escribe un mensaje..."
          className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
