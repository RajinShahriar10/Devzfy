"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2, Upload, Loader2, Send, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface DynamicEntry {
  id: string;
  value: string;
}

interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
}

interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface AwardEntry {
  id: string;
  name: string;
  competition: string;
  date: string;
  image: string;
}

interface CertificateEntry {
  id: string;
  name: string;
  date: string;
  file: string;
}

interface ResearchEntry {
  id: string;
  title: string;
  role: string;
  date: string;
  conference: string;
  publicationUrl: string;
}

const emptyEducation = (): EducationEntry => ({ id: crypto.randomUUID?.() || String(Date.now()), degree: "", institution: "", startDate: "", endDate: "" });
const emptyExperience = (): ExperienceEntry => ({ id: crypto.randomUUID?.() || String(Date.now()), company: "", position: "", duration: "", description: "" });
const emptyAward = (): AwardEntry => ({ id: crypto.randomUUID?.() || String(Date.now()), name: "", competition: "", date: "", image: "" });
const emptyCertificate = (): CertificateEntry => ({ id: crypto.randomUUID?.() || String(Date.now()), name: "", date: "", file: "" });
const emptyResearch = (): ResearchEntry => ({ id: crypto.randomUUID?.() || String(Date.now()), title: "", role: "", date: "", conference: "", publicationUrl: "" });

export function StudentOrderForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [copied, setCopied] = useState(false);

  const [fullName, setFullName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [educations, setEducations] = useState<EducationEntry[]>([]);
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [awards, setAwards] = useState<AwardEntry[]>([]);
  const [activities, setActivities] = useState<DynamicEntry[]>([]);
  const [activityInput, setActivityInput] = useState("");
  const [certificates, setCertificates] = useState<CertificateEntry[]>([]);
  const [research, setResearch] = useState<ResearchEntry[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");

  const totalSteps = 8;

  function addSkill() {
    if (!skillInput.trim()) return;
    if (skills.includes(skillInput.trim())) { setSkillInput(""); return; }
    setSkills([...skills, skillInput.trim()]);
    setSkillInput("");
  }

  function removeSkill(skill: string) {
    setSkills(skills.filter((s) => s !== skill));
  }

  function addActivity() {
    if (!activityInput.trim()) return;
    setActivities([...activities, { id: String(Date.now()), value: activityInput.trim() }]);
    setActivityInput("");
  }

  function removeActivity(id: string) {
    setActivities(activities.filter((a) => a.id !== id));
  }

  function addEducation() { setEducations([...educations, emptyEducation()]); }
  function removeEducation(id: string) { setEducations(educations.filter((e) => e.id !== id)); }
  function updateEducation(id: string, field: keyof EducationEntry, value: string) {
    setEducations(educations.map((e) => e.id === id ? { ...e, [field]: value } : e));
  }

  function addExperience() { setExperiences([...experiences, emptyExperience()]); }
  function removeExperience(id: string) { setExperiences(experiences.filter((e) => e.id !== id)); }
  function updateExperience(id: string, field: keyof ExperienceEntry, value: string) {
    setExperiences(experiences.map((e) => e.id === id ? { ...e, [field]: value } : e));
  }

  function addAward() { setAwards([...awards, emptyAward()]); }
  function removeAward(id: string) { setAwards(awards.filter((a) => a.id !== id)); }
  function updateAward(id: string, field: keyof AwardEntry, value: string) {
    setAwards(awards.map((a) => a.id === id ? { ...a, [field]: value } : a));
  }

  function addCertificate() { setCertificates([...certificates, emptyCertificate()]); }
  function removeCertificate(id: string) { setCertificates(certificates.filter((c) => c.id !== id)); }
  function updateCertificate(id: string, field: keyof CertificateEntry, value: string) {
    setCertificates(certificates.map((c) => c.id === id ? { ...c, [field]: value } : c));
  }

  function addResearch() { setResearch([...research, emptyResearch()]); }
  function removeResearch(id: string) { setResearch(research.filter((r) => r.id !== id)); }
  function updateResearch(id: string, field: keyof ResearchEntry, value: string) {
    setResearch(research.map((r) => r.id === id ? { ...r, [field]: value } : r));
  }

  function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  function handleFile(setter: (v: string) => void) {
    return async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) setter(await readFileAsDataURL(file));
    };
  }

  function handleAwardImage(id: string) {
    return async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) updateAward(id, "image", await readFileAsDataURL(file));
    };
  }

  function handleCertificateFile(id: string) {
    return async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) updateCertificate(id, "file", await readFileAsDataURL(file));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      fullName,
      profileImage: profileImage || null,
      address: address || null,
      email,
      phone: phone || null,
      githubUrl: githubUrl || null,
      linkedinUrl: linkedinUrl || null,
      skills,
      activities: activities.map((a) => a.value),
      additionalNotes: additionalNotes || null,
      educations: educations.map(({ id, degree, institution, startDate, endDate }) => ({
        degree, institution, educationStartDate: startDate, educationEndDate: endDate,
      })),
      experiences: experiences.map(({ id, company, position, duration, description }) => ({
        company, position, duration, experienceDescription: description,
      })),
      awards: awards.map(({ id, name, competition, date, image }) => ({ name, competition: competition || null, date: date || null, image: image || null })),
      certificates: certificates.map(({ id, name, date, file }) => ({ name, date: date || null, file: file || null })),
      research: research.map(({ id, title, role, date, conference, publicationUrl }) => ({
        title, role: role || null, date: date || null, conference: conference || null, publicationUrl: publicationUrl || null,
      })),
    };

    try {
      const res = await fetch("/api/orders/student", {
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
    setStep(1);
    setSubmitted(false);
    setOrderCode("");
    setCopied(false);
    setFullName("");
    setProfileImage("");
    setAddress("");
    setEmail("");
    setPhone("");
    setGithubUrl("");
    setLinkedinUrl("");
    setEducations([]);
    setExperiences([]);
    setSkills([]);
    setAwards([]);
    setActivities([]);
    setCertificates([]);
    setResearch([]);
    setAdditionalNotes("");
    onClose();
  }

  function copyCode() {
    navigator.clipboard.writeText(orderCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const inputClass = "bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:ring-purple-500/50 focus:border-purple-500";
  const fileInputClass = "flex-1 file:bg-purple-500/20 file:border-0 file:text-white file:rounded-lg file:px-3 file:py-1 file:text-sm";

  function renderStep() {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gradient">Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-400 mb-1 block">Full Name *</label>
                <Input required value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} placeholder="Enter your full name" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-400 mb-1 block">Profile Image Upload</label>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <Upload className="h-5 w-5 text-purple-400" />
                    )}
                  </div>
                  <Input type="file" accept="image/*" className={fileInputClass} onChange={handleFile(setProfileImage)} />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-400 mb-1 block">Address</label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} placeholder="Your address" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Email *</label>
                <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Phone</label>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="+880 1XXX-XXXXXX" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gradient">Links</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">GitHub URL</label>
                <Input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className={inputClass} placeholder="https://github.com/username" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">LinkedIn URL</label>
                <Input value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className={inputClass} placeholder="https://linkedin.com/in/username" />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gradient">Education</h3>
              <Button type="button" variant="secondary" size="sm" onClick={addEducation}>
                <Plus className="h-4 w-4 mr-1" /> Add Education
              </Button>
            </div>
            {educations.length === 0 && (
              <p className="text-sm text-gray-500">No education entries. Click &quot;Add Education&quot; to add one.</p>
            )}
            {educations.map((edu, i) => (
              <div key={edu.id} className="glass rounded-xl p-4 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-400">Education #{i + 1}</span>
                  <button type="button" onClick={() => removeEducation(edu.id)} className="text-gray-400 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs text-gray-400 mb-1 block">Degree *</label>
                    <Input required value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} className={inputClass} placeholder="e.g. B.Sc. in Computer Science" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-gray-400 mb-1 block">Institution *</label>
                    <Input required value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} className={inputClass} placeholder="University / College name" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Start Date</label>
                    <Input type="date" value={edu.startDate} onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">End Date</label>
                    <Input type="date" value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gradient">Experience</h3>
              <Button type="button" variant="secondary" size="sm" onClick={addExperience}>
                <Plus className="h-4 w-4 mr-1" /> Add Experience
              </Button>
            </div>
            {experiences.length === 0 && (
              <p className="text-sm text-gray-500">No experience entries. Click &quot;Add Experience&quot; to add one.</p>
            )}
            {experiences.map((exp, i) => (
              <div key={exp.id} className="glass rounded-xl p-4 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-400">Experience #{i + 1}</span>
                  <button type="button" onClick={() => removeExperience(exp.id)} className="text-gray-400 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs text-gray-400 mb-1 block">Company</label>
                    <Input value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} className={inputClass} placeholder="Company name" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-gray-400 mb-1 block">Position</label>
                    <Input value={exp.position} onChange={(e) => updateExperience(exp.id, "position", e.target.value)} className={inputClass} placeholder="Job title" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Duration</label>
                    <Input value={exp.duration} onChange={(e) => updateExperience(exp.id, "duration", e.target.value)} className={inputClass} placeholder="e.g. Jan 2024 - Present" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-gray-400 mb-1 block">Description</label>
                    <Textarea value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} className={inputClass} placeholder="Describe your responsibilities" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gradient">Skills</h3>
            <label className="text-sm text-gray-400 mb-1 block">Add your skills</label>
            <div className="flex gap-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="e.g. React, TypeScript, Python"
                className={inputClass}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
              />
              <Button variant="secondary" onClick={addSkill} type="button" className="shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1 text-sm py-1">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="hover:text-red-400 ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {skills.length === 0 && <span className="text-xs text-gray-500">No skills added yet</span>}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gradient">Awards</h3>
                <Button type="button" variant="secondary" size="sm" onClick={addAward}>
                  <Plus className="h-4 w-4 mr-1" /> Add Award
                </Button>
              </div>
              {awards.length === 0 && (
                <p className="text-sm text-gray-500">No awards added.</p>
              )}
              {awards.map((aw, i) => (
                <div key={aw.id} className="glass rounded-xl p-4 space-y-3 relative mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-purple-400">Award #{i + 1}</span>
                    <button type="button" onClick={() => removeAward(aw.id)} className="text-gray-400 hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-xs text-gray-400 mb-1 block">Award Name</label>
                      <Input value={aw.name} onChange={(e) => updateAward(aw.id, "name", e.target.value)} className={inputClass} placeholder="Award title" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-gray-400 mb-1 block">Competition Name</label>
                      <Input value={aw.competition} onChange={(e) => updateAward(aw.id, "competition", e.target.value)} className={inputClass} placeholder="Name of the competition" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Award Date</label>
                      <Input type="date" value={aw.date} onChange={(e) => updateAward(aw.id, "date", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Award Image</label>
                      <Input type="file" accept="image/*" className={fileInputClass} onChange={handleAwardImage(aw.id)} />
                      {aw.image && <span className="text-xs text-green-400 mt-1 block">Image uploaded</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-white/10" />

            <div>
              <h4 className="font-semibold text-sm text-gray-300 mb-2">Extracurricular Activities</h4>
              <div className="flex gap-2 mb-2">
                <Input
                  value={activityInput}
                  onChange={(e) => setActivityInput(e.target.value)}
                  placeholder="Add an activity"
                  className={inputClass}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addActivity(); } }}
                />
                <Button variant="secondary" onClick={addActivity} type="button" className="shrink-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {activities.map((a) => (
                  <div key={a.id} className="flex items-center justify-between glass rounded-lg px-3 py-2">
                    <span className="text-sm">{a.value}</span>
                    <button onClick={() => removeActivity(a.id)} className="text-gray-400 hover:text-red-400">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {activities.length === 0 && <span className="text-xs text-gray-500">No activities added</span>}
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gradient">Certificates</h3>
                <Button type="button" variant="secondary" size="sm" onClick={addCertificate}>
                  <Plus className="h-4 w-4 mr-1" /> Add Certificate
                </Button>
              </div>
              {certificates.length === 0 && (
                <p className="text-sm text-gray-500">No certificates added.</p>
              )}
              {certificates.map((cert, i) => (
                <div key={cert.id} className="glass rounded-xl p-4 space-y-3 relative mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-purple-400">Certificate #{i + 1}</span>
                    <button type="button" onClick={() => removeCertificate(cert.id)} className="text-gray-400 hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-xs text-gray-400 mb-1 block">Certificate Name</label>
                      <Input value={cert.name} onChange={(e) => updateCertificate(cert.id, "name", e.target.value)} className={inputClass} placeholder="Certificate title" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Date</label>
                      <Input type="date" value={cert.date} onChange={(e) => updateCertificate(cert.id, "date", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">File Upload</label>
                      <Input type="file" accept="image/*,.pdf" className={fileInputClass} onChange={handleCertificateFile(cert.id)} />
                      {cert.file && <span className="text-xs text-green-400 mt-1 block">File uploaded</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-white/10" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gradient">Research</h3>
                <Button type="button" variant="secondary" size="sm" onClick={addResearch}>
                  <Plus className="h-4 w-4 mr-1" /> Add Research
                </Button>
              </div>
              {research.length === 0 && (
                <p className="text-sm text-gray-500">No research entries.</p>
              )}
              {research.map((res, i) => (
                <div key={res.id} className="glass rounded-xl p-4 space-y-3 relative mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-purple-400">Research #{i + 1}</span>
                    <button type="button" onClick={() => removeResearch(res.id)} className="text-gray-400 hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-xs text-gray-400 mb-1 block">Title</label>
                      <Input value={res.title} onChange={(e) => updateResearch(res.id, "title", e.target.value)} className={inputClass} placeholder="Research paper title" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-gray-400 mb-1 block">Role</label>
                      <Input value={res.role} onChange={(e) => updateResearch(res.id, "role", e.target.value)} className={inputClass} placeholder="e.g. Lead Researcher, Co-author" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Date</label>
                      <Input type="date" value={res.date} onChange={(e) => updateResearch(res.id, "date", e.target.value)} className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-gray-400 mb-1 block">Conference Name</label>
                      <Input value={res.conference} onChange={(e) => updateResearch(res.id, "conference", e.target.value)} className={inputClass} placeholder="Conference or journal name" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-gray-400 mb-1 block">Publication Link</label>
                      <Input value={res.publicationUrl} onChange={(e) => updateResearch(res.id, "publicationUrl", e.target.value)} className={inputClass} placeholder="https://doi.org/..." />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gradient">Additional Notes</h3>
            <Textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className={inputClass + " min-h-[120px]"}
              placeholder="Any additional information, special requirements, or messages..."
            />
          </div>
        );
    }
  }

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
                  <code className="text-lg font-mono font-bold text-purple-400">{orderCode}</code>
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
                    <h2 className="text-xl font-bold text-gradient">Student Order Form</h2>
                    <p className="text-sm text-gray-400 mt-1">Step {step} of {totalSteps}</p>
                  </div>
                  <button onClick={resetAndClose} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex gap-1 mb-6">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${
                      i + 1 <= step ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-white/10"
                    }`} />
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  {renderStep()}

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(Math.max(1, step - 1))}
                      disabled={step === 1}
                    >
                      Previous
                    </Button>

                    {step === totalSteps ? (
                      <Button type="submit" disabled={submitting}>
                        {submitting ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                        ) : (
                          <><Send className="mr-2 h-4 w-4" /> Submit Application</>
                        )}
                      </Button>
                    ) : (
                      <Button type="button" onClick={() => setStep(Math.min(totalSteps, step + 1))}>
                        Next
                      </Button>
                    )}
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
