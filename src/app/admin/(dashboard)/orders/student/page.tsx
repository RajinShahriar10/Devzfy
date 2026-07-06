"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Trash2, Copy, Check, Download, ExternalLink, Eye, X,
  Calendar, Mail, Phone, MapPin, Globe, Award as AwardIcon,
  BookOpen, Briefcase, Wrench, FileText, User,
  GraduationCap, Beaker,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface StudentProject {
  id: string;
  name: string;
  techUsed: string[];
  date: string | null;
  liveUrl: string | null;
  images: string[];
}

interface StudentAward {
  id: string;
  name: string;
  date: string | null;
  image: string | null;
}

interface StudentCertificate {
  id: string;
  name: string;
  date: string | null;
  file: string | null;
}

interface StudentResearch {
  id: string;
  title: string;
  role: string | null;
  date: string | null;
  conference: string | null;
  publicationUrl: string | null;
}

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
  activities: string[];
  additionalNotes: string | null;
  createdAt: string;
  awards: StudentAward[];
  certificates: StudentCertificate[];
  research: StudentResearch[];
  status: string;
  projects: StudentProject[];
}

export default function AdminStudentOrders() {
  const [orders, setOrders] = useState<StudentOrder[]>([]);
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<StudentOrder | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
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

  useEffect(() => { fetchOrders(); }, []);

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

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/orders/student/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
        if (viewing?.id === id) setViewing({ ...viewing, status });
      }
    } catch {
      console.error("Failed to update order");
    } finally {
      setUpdatingId(null);
    }
  }

  async function downloadImage(url: string, filename: string) {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const ext = blob.type === "image/jpeg" ? "jpg" : blob.type.split("/")[1] || "jpg";
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${filename}.${ext}`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      console.error("Failed to download image");
    }
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
          className="pl-10 bg-muted border-border text-foreground placeholder:text-muted-foreground"
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
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center shrink-0 overflow-hidden group relative">
                  {order.profileImage ? (
                    <>
                      <img src={order.profileImage} alt="" className="h-full w-full object-cover" />
                      <button
                        onClick={() => downloadImage(order.profileImage!, `${order.fullName}-profile`)}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Download profile image"
                      >
                        <Download className="h-4 w-4 text-white" />
                      </button>
                    </>
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
                    <Badge className={`text-xs ${order.status === "Delivered" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mt-0.5">{order.email}</p>
                  <div className="flex items-center gap-3 mt-1">
                    {order.githubUrl && (
                      <a href={order.githubUrl} target="_blank" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" /> GitHub
                      </a>
                    )}
                    {order.linkedinUrl && (
                      <a href={order.linkedinUrl} target="_blank" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" /> LinkedIn
                      </a>
                    )}
                  </div>
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
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center shrink-0 overflow-hidden group relative">
                    {viewing.profileImage ? (
                      <>
                        <img src={viewing.profileImage} alt="" className="h-full w-full object-cover" />
                        <button
                          onClick={() => downloadImage(viewing.profileImage!, `${viewing.fullName}-profile`)}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                          title="Download profile image"
                        >
                          <Download className="h-4 w-4 text-white" />
                        </button>
                      </>
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
                {/* Status */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" /> Order Status
                  </h3>
                  <div className="flex items-center gap-3">
                    <Badge className={`text-sm px-3 py-1 ${viewing.status === "Delivered" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                      {viewing.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={updatingId === viewing.id || viewing.status === "pending"}
                        onClick={() => updateStatus(viewing.id, "pending")}
                      >
                        Mark Pending
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={updatingId === viewing.id || viewing.status === "Delivered"}
                        onClick={() => updateStatus(viewing.id, "Delivered")}
                      >
                        Mark Delivered
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
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

                {/* Links */}
                {(viewing.githubUrl || viewing.linkedinUrl) && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Globe className="h-4 w-4" /> Links
                    </h3>
                    <div className="space-y-2">
                      {viewing.githubUrl && (
                        <a href={viewing.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 break-all">
                          <ExternalLink className="h-3.5 w-3.5 shrink-0" /> {viewing.githubUrl}
                        </a>
                      )}
                      {viewing.linkedinUrl && (
                        <a href={viewing.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 break-all">
                          <ExternalLink className="h-3.5 w-3.5 shrink-0" /> {viewing.linkedinUrl}
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Education */}
                {(viewing.degree || viewing.institution) && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" /> Education
                    </h3>
                    <div className="space-y-2">
                      {infoRow(null, "Degree", viewing.degree)}
                      {infoRow(null, "Institution", viewing.institution)}
                      {infoRow(null, "Start", viewing.educationStartDate)}
                      {infoRow(null, "End", viewing.educationEndDate)}
                    </div>
                  </div>
                )}

                {/* Experience */}
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

                {/* Skills */}
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

                {/* Projects */}
                {viewing.projects.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> Projects
                    </h3>
                    <div className="space-y-3">
                      {viewing.projects.map((proj, i) => (
                        <div key={proj.id} className="glass rounded-lg p-3 space-y-2">
                          <p className="text-sm font-medium text-gray-200">#{i + 1} {proj.name}</p>
                          {proj.techUsed.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {proj.techUsed.map((t) => (
                                <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                              ))}
                            </div>
                          )}
                          {proj.date && <p className="text-xs text-gray-400">Date: {proj.date}</p>}
                          {proj.liveUrl && (
                            <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300">
                              <ExternalLink className="h-3 w-3" /> Live URL
                            </a>
                          )}
                          {proj.images.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {proj.images.map((img, idx) => (
                                <div key={idx} className="h-16 w-16 rounded-lg overflow-hidden border border-white/10 group relative">
                                  <img src={img} alt="" className="h-full w-full object-cover" />
                                  <button
                                    onClick={() => downloadImage(img, `${proj.name}-image-${idx + 1}`)}
                                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Download image"
                                  >
                                    <Download className="h-4 w-4 text-white" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Awards */}
                {viewing.awards.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <AwardIcon className="h-4 w-4" /> Awards
                    </h3>
                    <div className="space-y-3">
                      {viewing.awards.map((aw, i) => (
                        <div key={aw.id} className="glass rounded-lg p-3 space-y-2">
                          <p className="text-sm font-medium text-gray-200">#{i + 1} {aw.name}</p>
                          {aw.date && <p className="text-xs text-gray-400">Date: {aw.date}</p>}
                          {aw.image && (
                            <div className="flex items-center gap-2">
                              <div className="h-16 w-16 rounded-lg overflow-hidden border border-white/10">
                                <img src={aw.image} alt={aw.name} className="h-full w-full object-cover" />
                              </div>
                              <Button variant="secondary" size="sm" onClick={() => downloadDataURL(aw.image!, `award-${i + 1}`)}>
                                <Download className="h-3.5 w-3.5 mr-1" /> Download
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activities */}
                {viewing.activities.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" /> Extracurricular Activities
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {viewing.activities.map((a, i) => (
                        <li key={i} className="text-sm text-gray-300">{a}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Certificates */}
                {viewing.certificates.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4" /> Certificates
                    </h3>
                    <div className="space-y-3">
                      {viewing.certificates.map((cert, i) => (
                        <div key={cert.id} className="glass rounded-lg p-3 space-y-2">
                          <p className="text-sm font-medium text-gray-200">#{i + 1} {cert.name}</p>
                          {cert.date && <p className="text-xs text-gray-400">Date: {cert.date}</p>}
                          {cert.file && (
                            <div className="flex items-center gap-2">
                              {cert.file.startsWith("data:image") ? (
                                <div className="h-16 w-16 rounded-lg overflow-hidden border border-white/10">
                                  <img src={cert.file} alt={cert.name} className="h-full w-full object-cover" />
                                </div>
                              ) : null}
                              <Button variant="secondary" size="sm" onClick={() => downloadDataURL(cert.file!, `certificate-${i + 1}`)}>
                                <Download className="h-3.5 w-3.5 mr-1" /> Download
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Research */}
                {viewing.research.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Beaker className="h-4 w-4" /> Research
                    </h3>
                    <div className="space-y-3">
                      {viewing.research.map((r, i) => (
                        <div key={r.id} className="glass rounded-lg p-3 space-y-2">
                          <p className="text-sm font-medium text-gray-200">#{i + 1} {r.title}</p>
                          {r.role && <p className="text-xs text-gray-400">Role: {r.role}</p>}
                          {r.date && <p className="text-xs text-gray-400">Date: {r.date}</p>}
                          {r.conference && <p className="text-xs text-gray-400">Conference: {r.conference}</p>}
                          {r.publicationUrl && (
                            <a href={r.publicationUrl} target="_blank" className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300">
                              <ExternalLink className="h-3 w-3" /> Publication Link
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Notes */}
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
