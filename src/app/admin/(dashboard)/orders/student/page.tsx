"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Trash2,
  Copy,
  Check,
  Download,
  ExternalLink,
  Eye,
  X,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  BookOpen,
  Briefcase,
  Wrench,
  FileText,
  User,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface StudentOrder {
  id: string;
  orderCode: string;
  fullName: string;
  profileImage: string | null;
  address: string | null;
  email: string;
  phone: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  degree: string | null;
  institution: string | null;
  educationStartDate: string | null;
  educationEndDate: string | null;
  company: string | null;
  position: string | null;
  duration: string | null;
  experienceDescription: string | null;
  skills: string[];
  awardName: string | null;
  awardDate: string | null;
  awardImage: string | null;
  activities: string[];
  certificateName: string | null;
  certificateDate: string | null;
  certificateFile: string | null;
  researchTitle: string | null;
  researchRole: string | null;
  researchDate: string | null;
  conferenceName: string | null;
  publicationLink: string | null;
  additionalNotes: string | null;
  createdAt: string;
}

export default function AdminStudentOrders() {
  const [orders, setOrders] = useState<StudentOrder[]>([]);
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<StudentOrder | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchOrders(q = "") {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/student${q ? `?q=${encodeURIComponent(q)}` : ""}`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchOrders(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  async function deleteOrder(id: string) {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`/api/orders/student/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.filter((o) => o.id !== id));
        if (viewing?.id === id) setViewing(null);
      }
    } catch {
      console.error("Failed to delete order");
    }
  }

  function copyCode(code: string, id: string) {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function downloadDataURL(dataURL: string, filename: string) {
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = filename;
    a.click();
  }

  const infoRow = (icon: React.ReactNode, label: string, value: string | null | undefined) =>
    value ? (
      <div className="flex items-start gap-3 text-sm">
        <div className="mt-0.5 shrink-0">{icon}</div>
        <div>
          <span className="text-gray-500">{label}:</span>{" "}
          <span className="text-gray-200">{value}</span>
        </div>
      </div>
    ) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Student Orders</h1>
          <p className="text-sm text-gray-400 mt-1">
            View and manage student package orders.
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or order code..."
          className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-500"
        />
      </div>

      {loading && orders.length === 0 ? (
        <div className="text-center py-12 text-gray-400">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          {search ? "No orders match your search." : "No orders yet."}
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <GlassCard key={order.id} hover={false}>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center shrink-0 overflow-hidden">
                  {order.profileImage ? (
                    <img src={order.profileImage} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 text-purple-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{order.fullName}</h3>
                    <Badge variant="secondary" className="text-xs font-mono">
                      {order.orderCode}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mt-0.5">{order.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(new Date(order.createdAt))}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-4">
                  <button
                    onClick={() => copyCode(order.orderCode, order.id)}
                    className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                    title="Copy order code"
                  >
                    {copiedId === order.id ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setViewing(order)}
                    className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete order"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      <AnimatePresence>
        {viewing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setViewing(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass rounded-2xl p-6 lg:p-8 z-10"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
                    {viewing.profileImage ? (
                      <img src={viewing.profileImage} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-5 w-5 text-purple-400" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{viewing.fullName}</h2>
                    <Badge variant="secondary" className="text-xs font-mono mt-1">
                      {viewing.orderCode}
                    </Badge>
                  </div>
                </div>
                <button onClick={() => setViewing(null)} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" /> Personal Information
                  </h3>
                  <div className="space-y-2">
                    {infoRow(<Mail className="h-4 w-4 text-gray-500" />, "Email", viewing.email)}
                    {infoRow(<Phone className="h-4 w-4 text-gray-500" />, "Phone", viewing.phone)}
                    {infoRow(<MapPin className="h-4 w-4 text-gray-500" />, "Address", viewing.address)}
                    {infoRow(<Calendar className="h-4 w-4 text-gray-500" />, "Created", formatDate(new Date(viewing.createdAt)))}
                  </div>
                </div>

                {(viewing.githubUrl || viewing.linkedinUrl) && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Globe className="h-4 w-4" /> Links
                    </h3>
                    <div className="space-y-2">
                      {viewing.githubUrl && (
                        <a href={viewing.githubUrl} target="_blank" className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300">
                          <ExternalLink className="h-3.5 w-3.5" /> GitHub
                        </a>
                      )}
                      {viewing.linkedinUrl && (
                        <a href={viewing.linkedinUrl} target="_blank" className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300">
                          <ExternalLink className="h-3.5 w-3.5" /> LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {(viewing.degree || viewing.institution) && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" /> Education
                    </h3>
                    <div className="space-y-2">
                      {infoRow(null, "Degree", viewing.degree)}
                      {infoRow(null, "Institution", viewing.institution)}
                      {infoRow(null, "Start", viewing.educationStartDate)}
                      {infoRow(null, "End", viewing.educationEndDate)}
                    </div>
                  </div>
                )}

                {viewing.company && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> Experience
                    </h3>
                    <div className="space-y-2">
                      {infoRow(null, "Company", viewing.company)}
                      {infoRow(null, "Position", viewing.position)}
                      {infoRow(null, "Duration", viewing.duration)}
                      {infoRow(null, "Description", viewing.experienceDescription)}
                    </div>
                  </div>
                )}

                {viewing.skills.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Wrench className="h-4 w-4" /> Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {viewing.skills.map((s) => (
                        <Badge key={s} variant="secondary">{s}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {viewing.awardName && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" /> Awards
                    </h3>
                    <div className="space-y-2">
                      {infoRow(null, "Award", viewing.awardName)}
                      {infoRow(null, "Date", viewing.awardDate)}
                      {viewing.awardImage && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Image:</span>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => downloadDataURL(viewing.awardImage!, "award-image")}
                          >
                            <Download className="h-3.5 w-3.5 mr-1" /> Download
                          </Button>
                        </div>
                      )}
                    </div>
                    {viewing.activities.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-500 mb-2">Activities:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {viewing.activities.map((a, i) => (
                            <li key={i} className="text-sm text-gray-300">{a}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {(viewing.certificateName || viewing.researchTitle) && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4" /> Certificates & Research
                    </h3>
                    {viewing.certificateName && (
                      <div className="space-y-2 mb-3">
                        {infoRow(null, "Certificate", viewing.certificateName)}
                        {infoRow(null, "Date", viewing.certificateDate)}
                        {viewing.certificateFile && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">File:</span>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => downloadDataURL(viewing.certificateFile!, "certificate-file")}
                            >
                              <Download className="h-3.5 w-3.5 mr-1" /> Download
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                    {viewing.researchTitle && (
                      <div className="space-y-2">
                        {infoRow(null, "Title", viewing.researchTitle)}
                        {infoRow(null, "Role", viewing.researchRole)}
                        {infoRow(null, "Date", viewing.researchDate)}
                        {infoRow(null, "Conference", viewing.conferenceName)}
                        {viewing.publicationLink && (
                          <a href={viewing.publicationLink} target="_blank" className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300">
                            <ExternalLink className="h-3.5 w-3.5" /> Publication Link
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {viewing.additionalNotes && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Additional Notes</h3>
                    <p className="text-sm text-gray-300 bg-white/5 rounded-lg p-3">
                      {viewing.additionalNotes}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
