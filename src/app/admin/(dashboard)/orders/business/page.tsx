"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Trash2, Copy, Check, Download, Eye, X,
  Mail, Phone, MapPin, Globe, Briefcase,
  Image, FileText, User, Calendar, Tag, Link,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BusinessOrder {
  id: string;
  orderCode: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string | null;
  address: string | null;
  businessType: string | null;
  productCategories: string | null;
  websiteFeatures: string | null;
  preferredDomain: string | null;
  designStyle: string | null;
  socialLinks: string | null;
  additionalNotes: string | null;
  logoUpload: string | null;
  businessImages: string[];
  createdAt: string;
  status: string;
}

export default function AdminBusinessOrders() {
  const [orders, setOrders] = useState<BusinessOrder[]>([]);
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<BusinessOrder | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchOrders(q = "") {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/business${q ? `?q=${encodeURIComponent(q)}` : ""}`);
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
      const res = await fetch(`/api/orders/business/${id}`, { method: "DELETE" });
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
      const res = await fetch(`/api/orders/business/${id}`, {
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

  const tagList = (items: string | null | undefined) =>
    items
      ? items.split(", ").filter(Boolean).map((item) => (
          <Badge key={item} variant="secondary" className="text-xs">
            {item}
          </Badge>
        ))
      : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Business Orders</h1>
          <p className="text-sm text-gray-400 mt-1">
            View and manage business startup package orders.
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by business name, owner, email, or order code..."
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
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center shrink-0 overflow-hidden">
                  {order.logoUpload ? (
                    <img src={order.logoUpload} alt="" className="h-full w-full object-contain" />
                  ) : (
                    <Briefcase className="h-5 w-5 text-cyan-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{order.businessName}</h3>
                    <Badge variant="secondary" className="text-xs font-mono">
                      {order.orderCode}
                    </Badge>
                    <Badge className={`text-xs ${order.status === "Delivered" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mt-0.5">{order.ownerName} &middot; {order.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(new Date(order.createdAt))}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-4">
                  <button
                    onClick={() => copyCode(order.orderCode, order.id)}
                    className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
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
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
                    {viewing.logoUpload ? (
                      <img src={viewing.logoUpload} alt="" className="h-full w-full object-contain" />
                    ) : (
                      <Briefcase className="h-5 w-5 text-cyan-400" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{viewing.businessName}</h2>
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

                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" /> Business Information
                  </h3>
                  <div className="space-y-2">
                    {infoRow(<Briefcase className="h-4 w-4 text-gray-500" />, "Owner", viewing.ownerName)}
                    {infoRow(<Mail className="h-4 w-4 text-gray-500" />, "Email", viewing.email)}
                    {infoRow(<Phone className="h-4 w-4 text-gray-500" />, "Phone", viewing.phone)}
                    {infoRow(<MapPin className="h-4 w-4 text-gray-500" />, "Address", viewing.address)}
                    {infoRow(null, "Business Type", viewing.businessType)}
                    {viewing.productCategories && (
                      <div className="flex items-start gap-3 text-sm">
                        <Tag className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-gray-500">Categories:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {tagList(viewing.productCategories)}
                          </div>
                        </div>
                      </div>
                    )}
                    {infoRow(<Calendar className="h-4 w-4 text-gray-500" />, "Created", formatDate(new Date(viewing.createdAt)))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Globe className="h-4 w-4" /> Website Requirements
                  </h3>
                  <div className="space-y-2">
                    {viewing.websiteFeatures && (
                      <div className="flex items-start gap-3 text-sm">
                        <FileText className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-gray-500">Features:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {tagList(viewing.websiteFeatures)}
                          </div>
                        </div>
                      </div>
                    )}
                    {infoRow(null, "Preferred Domain", viewing.preferredDomain)}
                    {viewing.designStyle && (
                      <div className="flex items-start gap-3 text-sm">
                        <Tag className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-gray-500">Design Styles:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {tagList(viewing.designStyle)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {viewing.socialLinks && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Link className="h-4 w-4" /> Social Links
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tagList(viewing.socialLinks)}
                    </div>
                  </div>
                )}

                {viewing.additionalNotes && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Additional Notes</h3>
                    <p className="text-sm text-gray-300 bg-white/5 rounded-lg p-3">{viewing.additionalNotes}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Image className="h-4 w-4" /> Uploads
                  </h3>
                  {viewing.logoUpload && (
                    <div className="mb-3">
                      <span className="text-sm text-gray-500 block mb-2">Logo:</span>
                      <div className="flex items-center gap-3">
                        <div className="h-16 w-16 rounded-xl overflow-hidden border border-white/10">
                          <img src={viewing.logoUpload} alt="" className="h-full w-full object-contain" />
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => downloadDataURL(viewing.logoUpload!, "business-logo")}
                        >
                          <Download className="h-3.5 w-3.5 mr-1" /> Download
                        </Button>
                      </div>
                    </div>
                  )}
                  {viewing.businessImages.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-500 block mb-2">
                        Business Images ({viewing.businessImages.length}):
                      </span>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {viewing.businessImages.map((img, i) => (
                          <div key={i} className="h-20 w-20 rounded-lg overflow-hidden border border-white/10">
                            <img src={img} alt="" className="h-full w-full object-cover" />
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          viewing.businessImages.forEach((img, i) => {
                            downloadDataURL(img, `business-image-${i + 1}`);
                          });
                        }}
                      >
                        <Download className="h-3.5 w-3.5 mr-1" /> Download All ({viewing.businessImages.length})
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
