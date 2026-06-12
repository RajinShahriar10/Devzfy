"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Mail, Trash2, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMessages() {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setMessages(data.messages || []);
    } catch {
      console.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  async function deleteMessage(id: string) {
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessages(messages.filter((m) => m.id !== id));
      }
    } catch {
      console.error("Failed to delete message");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-sm text-gray-400 mt-1">View and manage contact messages.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No messages yet.</div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <GlassCard key={msg.id} hover={false}>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{msg.name}</h3>
                        {!msg.read && (
                          <Badge variant="default" className="text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-purple-400">{msg.subject}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(new Date(msg.createdAt))}
                      </span>
                      <a
                        href={`mailto:${msg.email}`}
                        className="p-1.5 text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mt-2 whitespace-pre-wrap">{msg.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{msg.email}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
