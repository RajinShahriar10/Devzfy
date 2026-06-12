"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Upload, Loader2, Send, Copy, Check, Plus, Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function BusinessOrderForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [copied, setCopied] = useState(false);

  const [logoData, setLogoData] = useState("");
  const [businessImages, setBusinessImages] = useState<string[]>([]);

  function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setLogoData(await readFileAsDataURL(file));
  }

  async function handleBusinessImagesUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const results: string[] = [];
    for (let i = 0; i < files.length; i++) {
      results.push(await readFileAsDataURL(files[i]));
    }
    setBusinessImages([...businessImages, ...results]);
  }

  function removeBusinessImage(index: number) {
    setBusinessImages(businessImages.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    const payload: Record<string, unknown> = {};
    for (const [key, val] of fd.entries()) {
      if (val instanceof File) continue;
      payload[key] = val;
    }
    payload.logoUpload = logoData || null;
    payload.businessImages = businessImages;

    try {
      const res = await fetch("/api/orders/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setOrderCode(data.orderCode);
        setSubmitted(true);
      } else {
        alert("Failed to submit order. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetAndClose() {
    setSubmitted(false);
    setOrderCode("");
    setCopied(false);
    setLogoData("");
    setBusinessImages([]);
    onClose();
  }

  function copyCode() {
    navigator.clipboard.writeText(orderCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const inputClass = "bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:ring-cyan-500/50 focus:border-cyan-500";
  const fileClass = "file:bg-cyan-500/20 file:border-0 file:text-white file:rounded-lg file:px-3 file:py-1 file:text-sm";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={resetAndClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-2xl p-6 lg:p-8 z-10"
          >
            {submitted ? (
              <div className="text-center py-8">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <Send className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Order Submitted Successfully</h3>
                <p className="text-gray-400 mb-6">Copy this order code and send it to our Facebook Page.</p>

                <div className="glass rounded-xl p-4 mb-6 inline-block">
                  <code className="text-lg font-mono font-bold text-cyan-400">{orderCode}</code>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <Button onClick={copyCode} variant={copied ? "default" : "outline"}>
                    {copied ? (
                      <><Check className="mr-2 h-4 w-4" /> Copied!</>
                    ) : (
                      <><Copy className="mr-2 h-4 w-4" /> Copy</>
                    )}
                  </Button>
                  <Button onClick={resetAndClose}>Close</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gradient">Business Order Form</h2>
                    <p className="text-sm text-gray-400 mt-1">Submit your business startup order</p>
                  </div>
                  <button onClick={resetAndClose} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gradient">Business Information</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-sm text-gray-400 mb-1 block">Business Name *</label>
                        <Input required name="businessName" className={inputClass} placeholder="Your business name" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Owner Name *</label>
                        <Input required name="ownerName" className={inputClass} placeholder="Owner's full name" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Email *</label>
                        <Input required type="email" name="email" className={inputClass} placeholder="business@email.com" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Phone</label>
                        <Input type="tel" name="phone" className={inputClass} placeholder="+880 1XXX-XXXXXX" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-sm text-gray-400 mb-1 block">Address</label>
                        <Input name="address" className={inputClass} placeholder="Business address" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Business Type</label>
                        <Input name="businessType" className={inputClass} placeholder="e.g. E-commerce, Agency, Startup" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Product Categories</label>
                        <Input name="productCategories" className={inputClass} placeholder="e.g. Electronics, Fashion, Food" />
                      </div>
                    </div>
                  </div>

                  <hr className="border-white/10" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gradient">Website Requirements</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-sm text-gray-400 mb-1 block">Website Features Needed</label>
                        <Textarea name="websiteFeatures" className={inputClass + " min-h-[80px]"} placeholder="List the features you need (e.g. product catalog, payment gateway, blog, user accounts...)" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Preferred Domain Name</label>
                        <Input name="preferredDomain" className={inputClass} placeholder="yourbusiness.com" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Preferred Design Style</label>
                        <Input name="designStyle" className={inputClass} placeholder="e.g. Modern, Minimal, Corporate, Creative" />
                      </div>
                    </div>
                  </div>

                  <hr className="border-white/10" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gradient">Additional</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-sm text-gray-400 mb-1 block">Social Links</label>
                        <Input name="socialLinks" className={inputClass} placeholder="Facebook, Instagram, LinkedIn URLs" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-sm text-gray-400 mb-1 block">Additional Notes</label>
                        <Textarea name="additionalNotes" className={inputClass + " min-h-[80px]"} placeholder="Any special requirements or messages..." />
                      </div>
                    </div>
                  </div>

                  <hr className="border-white/10" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gradient">Uploads</h3>
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Logo Upload</label>
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
                          {logoData ? (
                            <img src={logoData} alt="" className="h-full w-full object-contain" />
                          ) : (
                            <Upload className="h-5 w-5 text-cyan-400" />
                          )}
                        </div>
                        <Input type="file" accept="image/*" className={"flex-1 " + fileClass} onChange={handleLogoUpload} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Business Images Upload</label>
                      <Input type="file" accept="image/*" multiple className={fileClass} onChange={handleBusinessImagesUpload} />
                      {businessImages.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {businessImages.map((img, i) => (
                            <div key={i} className="relative group">
                              <div className="h-16 w-16 rounded-lg overflow-hidden border border-white/10">
                                <img src={img} alt="" className="h-full w-full object-cover" />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeBusinessImage(i)}
                                className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="h-3 w-3 text-white" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <Button type="submit" disabled={submitting} className="w-full">
                      {submitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                      ) : (
                        <><Send className="mr-2 h-4 w-4" /> Submit Order</>
                      )}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
