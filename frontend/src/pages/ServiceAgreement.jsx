import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft, FileText, User, Calendar, DollarSign, Shield, Scale,
  AlertTriangle, CheckCircle, Upload, Download, Eye, Edit3,
  Briefcase, Clock, Lock, Gavel, FileCheck, Stamp, PenTool,
  ChevronDown, ChevronUp, Info, X, Check, Send, CreditCard,
  Building, Phone, Mail, MapPin, Hash
} from 'lucide-react';

// ── Section Accordion ─────────────────────────────────────────────
function SectionAccordion({ icon: Icon, title, number, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0">
          <Icon size={18} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-primary-600 uppercase tracking-wider">Section {number}</p>
          <h3 className="text-sm font-bold text-slate-800">{title}</h3>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={20} className="text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-5 bg-white space-y-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Input Field Component ─────────────────────────────────────────
function FormInput({ icon: Icon, label, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />}
        <input
          {...props}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all outline-none text-sm`}
        />
      </div>
    </div>
  );
}

function FormTextarea({ label, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{label}</label>}
      <textarea
        {...props}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all outline-none text-sm resize-none"
      />
    </div>
  );
}

function FormSelect({ icon: Icon, label, children, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />}
        <select
          {...props}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all outline-none text-sm appearance-none`}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
      </div>
    </div>
  );
}

// ── Milestone Row ────────────────────────────────────────────────
function MilestoneRow({ milestone, index, onChange, onRemove }) {
  return (
    <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
      <div className="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
        {index + 1}
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          type="text"
          placeholder="Milestone title"
          value={milestone.title}
          onChange={(e) => onChange(index, 'title', e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-primary-400 transition-colors"
        />
        <input
          type="date"
          value={milestone.date}
          onChange={(e) => onChange(index, 'date', e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-primary-400 transition-colors"
        />
        <input
          type="text"
          placeholder="Amount (₹)"
          value={milestone.amount}
          onChange={(e) => onChange(index, 'amount', e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-primary-400 transition-colors"
        />
      </div>
      <button type="button" onClick={() => onRemove(index)} className="p-1.5 rounded-lg hover:bg-danger-50 text-slate-400 hover:text-danger-500 transition-colors mt-0.5">
        <X size={16} />
      </button>
    </div>
  );
}

// ── Signature Pad Placeholder ────────────────────────────────────
function SignaturePad({ label, signature, onSign, onClear }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{label}</label>
      <div className="relative border-2 border-dashed border-slate-200 rounded-xl h-28 flex items-center justify-center bg-slate-50 hover:border-primary-300 transition-colors cursor-pointer group overflow-hidden">
        {signature ? (
          <>
            <p className="text-lg font-signature text-slate-700 italic" style={{ fontFamily: "'Dancing Script', cursive" }}>{signature}</p>
            <button
              type="button"
              onClick={onClear}
              className="absolute top-2 right-2 p-1 rounded-lg bg-white/80 hover:bg-danger-50 text-slate-400 hover:text-danger-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <div className="text-center" onClick={onSign}>
            <PenTool size={24} className="mx-auto text-slate-300 mb-1 group-hover:text-primary-400 transition-colors" />
            <p className="text-xs text-slate-400 group-hover:text-primary-500 transition-colors">Click to sign</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════
export default function ServiceAgreement() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefill = location.state || {};
  const documentRef = useRef(null);
  const [mode, setMode] = useState('form'); // 'form' | 'preview'
  const [stampFile, setStampFile] = useState(null);
  const [stampPreview, setStampPreview] = useState(null);

  const [form, setForm] = useState({
    // Parties
    freelancerName: '',
    freelancerEmail: '',
    freelancerPhone: '',
    freelancerAddress: '',
    freelancerPan: '',
    clientName: '',
    clientEmail: prefill.clientEmail || '',
    clientPhone: '',
    clientAddress: '',
    clientCompany: '',
    clientGstin: '',

    // Scope of Work
    projectTitle: prefill.projectTitle || '',
    scopeDescription: prefill.scopeDescription || '',
    deliverables: '',

    // Payment
    totalAmount: prefill.totalAmount || '',
    currency: 'INR',
    paymentMethod: 'Bank Transfer',
    paymentSchedule: 'milestone',
    advancePercentage: '30',
    latePenalty: '1.5',
    latePenaltyType: 'percentage',

    // Duration
    startDate: '',
    endDate: prefill.endDate || '',

    // Responsibilities
    freelancerResponsibilities: 'Deliver all agreed-upon services within the specified timelines.\nMaintain regular communication with the client regarding progress.\nEnsure quality standards as discussed and agreed upon.\nMake necessary revisions as per the agreed revision policy.',
    clientResponsibilities: 'Provide all necessary information, assets, and access required for the project.\nMake payments as per the agreed schedule.\nProvide timely feedback and approvals to avoid delays.\nDesignate a single point of contact for communication.',

    // Confidentiality
    confidentialityPeriod: '2',

    // Termination
    terminationNoticeDays: '15',

    // Dispute
    jurisdictionCity: 'New Delhi',
    jurisdictionState: 'Delhi',

    // Signatures
    freelancerSignature: '',
    clientSignature: '',
    agreementDate: new Date().toISOString().split('T')[0],
  });

  const [milestones, setMilestones] = useState([
    { title: '', date: '', amount: '' }
  ]);

  const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const addMilestone = () => setMilestones(prev => [...prev, { title: '', date: '', amount: '' }]);
  const removeMilestone = (index) => setMilestones(prev => prev.filter((_, i) => i !== index));
  const updateMilestone = (index, key, value) => {
    setMilestones(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  const handleStampUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStampFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setStampPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSign = (party) => {
    const name = party === 'freelancer' ? form.freelancerName : form.clientName;
    if (name) {
      updateForm(party === 'freelancer' ? 'freelancerSignature' : 'clientSignature', name);
    } else {
      alert(`Please enter the ${party === 'freelancer' ? 'freelancer' : 'client'} name first.`);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '_______________';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatCurrency = (amount) => {
    if (!amount) return '₹_______________';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: form.currency || 'INR' }).format(amount);
  };

  // ── FORM VIEW ──────────────────────────────────────────────────
  const renderForm = () => (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setMode('preview'); }}>
      {/* Section 1: Parties */}
      <SectionAccordion icon={User} title="Parties Involved" number="1" defaultOpen={true}>
        <div className="bg-primary-50/50 p-4 rounded-xl border border-primary-100 mb-4">
          <p className="text-xs font-bold text-primary-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Briefcase size={14} /> Freelancer Details
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormInput icon={User} label="Full Name" placeholder="Enter freelancer name" value={form.freelancerName} onChange={(e) => updateForm('freelancerName', e.target.value)} required />
            <FormInput icon={Mail} label="Email" type="email" placeholder="freelancer@email.com" value={form.freelancerEmail} onChange={(e) => updateForm('freelancerEmail', e.target.value)} />
            <FormInput icon={Phone} label="Phone" placeholder="+91 XXXXX XXXXX" value={form.freelancerPhone} onChange={(e) => updateForm('freelancerPhone', e.target.value)} />
            <FormInput icon={Hash} label="PAN Number" placeholder="ABCDE1234F" value={form.freelancerPan} onChange={(e) => updateForm('freelancerPan', e.target.value)} />
          </div>
          <div className="mt-3">
            <FormTextarea label="Address" rows={2} placeholder="Full address..." value={form.freelancerAddress} onChange={(e) => updateForm('freelancerAddress', e.target.value)} />
          </div>
        </div>

        <div className="bg-accent-50/50 p-4 rounded-xl border border-accent-100">
          <p className="text-xs font-bold text-accent-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Building size={14} /> Client Details
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormInput icon={User} label="Full Name / Company" placeholder="Enter client name" value={form.clientName} onChange={(e) => updateForm('clientName', e.target.value)} required />
            <FormInput icon={Mail} label="Email" type="email" placeholder="client@company.com" value={form.clientEmail} onChange={(e) => updateForm('clientEmail', e.target.value)} />
            <FormInput icon={Phone} label="Phone" placeholder="+91 XXXXX XXXXX" value={form.clientPhone} onChange={(e) => updateForm('clientPhone', e.target.value)} />
            <FormInput icon={Building} label="Company Name" placeholder="Company Pvt. Ltd." value={form.clientCompany} onChange={(e) => updateForm('clientCompany', e.target.value)} />
            <FormInput icon={Hash} label="GSTIN (if applicable)" placeholder="22AAAAA0000A1Z5" value={form.clientGstin} onChange={(e) => updateForm('clientGstin', e.target.value)} />
          </div>
          <div className="mt-3">
            <FormTextarea label="Address" rows={2} placeholder="Full address..." value={form.clientAddress} onChange={(e) => updateForm('clientAddress', e.target.value)} />
          </div>
        </div>
      </SectionAccordion>

      {/* Section 2: Scope of Work */}
      <SectionAccordion icon={Briefcase} title="Scope of Work" number="2">
        <FormInput icon={FileText} label="Project Title" placeholder="e.g. Website Redesign Project" value={form.projectTitle} onChange={(e) => updateForm('projectTitle', e.target.value)} required />
        <FormTextarea label="Detailed Scope of Services" rows={4} placeholder="Describe the services the freelancer will provide in detail..." value={form.scopeDescription} onChange={(e) => updateForm('scopeDescription', e.target.value)} required />
        <FormTextarea label="Deliverables" rows={3} placeholder="List all deliverables (one per line)..." value={form.deliverables} onChange={(e) => updateForm('deliverables', e.target.value)} />

        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 block">Milestones & Timeline</label>
          <div className="space-y-2">
            {milestones.map((m, i) => (
              <MilestoneRow key={i} milestone={m} index={i} onChange={updateMilestone} onRemove={removeMilestone} />
            ))}
          </div>
          <button type="button" onClick={addMilestone} className="mt-2 text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1.5 transition-colors">
            <CheckCircle size={14} /> + Add Milestone
          </button>
        </div>
      </SectionAccordion>

      {/* Section 3: Payment Terms */}
      <SectionAccordion icon={DollarSign} title="Payment Terms" number="3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormInput icon={DollarSign} label="Total Payment Amount" type="number" placeholder="50000" value={form.totalAmount} onChange={(e) => updateForm('totalAmount', e.target.value)} required />
          <FormSelect icon={CreditCard} label="Currency" value={form.currency} onChange={(e) => updateForm('currency', e.target.value)}>
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </FormSelect>
          <FormSelect icon={CreditCard} label="Payment Method" value={form.paymentMethod} onChange={(e) => updateForm('paymentMethod', e.target.value)}>
            <option>Bank Transfer</option>
            <option>UPI</option>
            <option>PayPal</option>
            <option>Cheque</option>
            <option>Other</option>
          </FormSelect>
          <FormSelect icon={Clock} label="Payment Schedule" value={form.paymentSchedule} onChange={(e) => updateForm('paymentSchedule', e.target.value)}>
            <option value="milestone">Milestone-based</option>
            <option value="advance">Full Advance</option>
            <option value="completion">After Completion</option>
            <option value="split">Advance + Completion</option>
          </FormSelect>
        </div>
        {(form.paymentSchedule === 'split' || form.paymentSchedule === 'milestone') && (
          <FormInput label="Advance Payment (%)" type="number" min="0" max="100" placeholder="30" value={form.advancePercentage} onChange={(e) => updateForm('advancePercentage', e.target.value)} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormInput label="Late Payment Penalty (%)" type="number" step="0.1" placeholder="1.5" value={form.latePenalty} onChange={(e) => updateForm('latePenalty', e.target.value)} />
          <FormSelect label="Penalty Type" value={form.latePenaltyType} onChange={(e) => updateForm('latePenaltyType', e.target.value)}>
            <option value="percentage">% per week of delay</option>
            <option value="fixed">Fixed amount per week</option>
            <option value="none">No penalty</option>
          </FormSelect>
        </div>
      </SectionAccordion>

      {/* Section 4: Duration */}
      <SectionAccordion icon={Calendar} title="Agreement Duration" number="4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormInput icon={Calendar} label="Start Date" type="date" value={form.startDate} onChange={(e) => updateForm('startDate', e.target.value)} required />
          <FormInput icon={Calendar} label="End Date" type="date" value={form.endDate} onChange={(e) => updateForm('endDate', e.target.value)} required />
        </div>
      </SectionAccordion>

      {/* Section 5: Responsibilities */}
      <SectionAccordion icon={CheckCircle} title="Responsibilities" number="5">
        <FormTextarea label="Freelancer Responsibilities" rows={4} placeholder="List freelancer responsibilities..." value={form.freelancerResponsibilities} onChange={(e) => updateForm('freelancerResponsibilities', e.target.value)} />
        <FormTextarea label="Client Responsibilities" rows={4} placeholder="List client responsibilities..." value={form.clientResponsibilities} onChange={(e) => updateForm('clientResponsibilities', e.target.value)} />
      </SectionAccordion>

      {/* Section 6: Confidentiality */}
      <SectionAccordion icon={Lock} title="Confidentiality Clause" number="6">
        <div className="bg-warning-50 p-3 rounded-xl border border-warning-100 flex gap-3 mb-2">
          <Shield size={18} className="text-warning-600 shrink-0 mt-0.5" />
          <p className="text-xs text-warning-800 leading-relaxed">Both parties agree to maintain strict confidentiality of all proprietary and sensitive business information shared during this engagement.</p>
        </div>
        <FormInput label="Confidentiality Period (years after termination)" type="number" placeholder="2" value={form.confidentialityPeriod} onChange={(e) => updateForm('confidentialityPeriod', e.target.value)} />
      </SectionAccordion>

      {/* Section 7: Termination */}
      <SectionAccordion icon={AlertTriangle} title="Termination Clause" number="7">
        <FormInput label="Notice Period (days)" type="number" placeholder="15" value={form.terminationNoticeDays} onChange={(e) => updateForm('terminationNoticeDays', e.target.value)} />
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-600 leading-relaxed">Either party may terminate this agreement by providing written notice of <strong>{form.terminationNoticeDays || '15'} days</strong>. Upon termination, the freelancer shall be compensated for all work completed up to the termination date.</p>
        </div>
      </SectionAccordion>

      {/* Section 8: Dispute Resolution */}
      <SectionAccordion icon={Gavel} title="Dispute Resolution" number="8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormInput icon={MapPin} label="Jurisdiction City" placeholder="New Delhi" value={form.jurisdictionCity} onChange={(e) => updateForm('jurisdictionCity', e.target.value)} />
          <FormInput icon={MapPin} label="Jurisdiction State" placeholder="Delhi" value={form.jurisdictionState} onChange={(e) => updateForm('jurisdictionState', e.target.value)} />
        </div>
        <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 flex gap-3">
          <Scale size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 leading-relaxed">All disputes shall first be attempted to resolve through mutual discussion. If unresolved, the dispute shall be subject to arbitration and the jurisdiction of the courts in <strong>{form.jurisdictionCity || '___'}, {form.jurisdictionState || '___'}</strong>, governed by Indian law.</p>
        </div>
      </SectionAccordion>

      {/* Section 9: Liability */}
      <SectionAccordion icon={Shield} title="Limitation of Liability" number="9">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
          <p className="text-xs text-slate-600 leading-relaxed">• The freelancer's total liability under this agreement shall not exceed the total contract value.</p>
          <p className="text-xs text-slate-600 leading-relaxed">• Neither party shall be liable for indirect, incidental, or consequential damages.</p>
          <p className="text-xs text-slate-600 leading-relaxed">• Force majeure events shall exempt the affected party from liability for non-performance.</p>
        </div>
      </SectionAccordion>

      {/* Section 10: Acceptance */}
      <SectionAccordion icon={FileCheck} title="Acceptance & Validity" number="10">
        <div className="bg-success-50 p-3 rounded-xl border border-success-100 flex gap-3">
          <CheckCircle size={18} className="text-success-600 shrink-0 mt-0.5" />
          <p className="text-xs text-success-800 leading-relaxed">This agreement becomes valid and binding upon acceptance of terms by both parties, either through physical signatures, digital signatures, or electronic acceptance via the Auto-Trust platform.</p>
        </div>
      </SectionAccordion>

      {/* Section 11: Digital Agreement */}
      <SectionAccordion icon={Shield} title="Digital Agreement Feature" number="11">
        <div className="bg-primary-50 p-3 rounded-xl border border-primary-100 flex gap-3">
          <Info size={18} className="text-primary-600 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <p className="text-xs text-primary-800 leading-relaxed font-semibold">This agreement can be digitally signed and is legally valid under the Information Technology Act, 2000 (India).</p>
            <p className="text-xs text-primary-700 leading-relaxed">Digital signatures provided through the Auto-Trust platform carry the same legal weight as physical signatures for the purpose of this agreement.</p>
          </div>
        </div>
      </SectionAccordion>

      {/* Section 12: Signatures */}
      <SectionAccordion icon={PenTool} title="Digital Signatures" number="12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SignaturePad
            label="Freelancer Signature"
            signature={form.freelancerSignature}
            onSign={() => handleSign('freelancer')}
            onClear={() => updateForm('freelancerSignature', '')}
          />
          <SignaturePad
            label="Client Signature"
            signature={form.clientSignature}
            onSign={() => handleSign('client')}
            onClear={() => updateForm('clientSignature', '')}
          />
        </div>
        <FormInput icon={Calendar} label="Agreement Date" type="date" value={form.agreementDate} onChange={(e) => updateForm('agreementDate', e.target.value)} />
      </SectionAccordion>

      {/* Section 13: Stamp */}
      <SectionAccordion icon={Stamp} title="Official Stamp / Seal" number="13">
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-primary-300 transition-colors">
          {stampPreview ? (
            <div className="space-y-3">
              <img src={stampPreview} alt="Uploaded stamp" className="w-28 h-28 mx-auto object-contain rounded-xl border border-slate-100 bg-white p-2" />
              <p className="text-xs text-slate-500">{stampFile?.name}</p>
              <button type="button" onClick={() => { setStampFile(null); setStampPreview(null); }} className="text-xs text-danger-500 hover:text-danger-600 font-semibold">
                Remove Stamp
              </button>
            </div>
          ) : (
            <label className="cursor-pointer space-y-2 block">
              <Upload size={28} className="mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-slate-500">Upload Official Stamp / Seal</p>
              <p className="text-xs text-slate-400">PNG, JPG, or PDF (max 2MB)</p>
              <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleStampUpload} />
            </label>
          )}
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex gap-3 mt-2">
          <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">This agreement may include a digital or physical stamp for verification purposes. The stamp/seal uploaded here will appear on the generated agreement document.</p>
        </div>
      </SectionAccordion>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-200">
        <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">
          Cancel
        </button>
        <button
          type="submit"
          className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold text-sm shadow-lg shadow-primary-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Eye size={18} />
          Preview Agreement
        </button>
      </div>
    </form>
  );

  // ── PREVIEW / DOCUMENT VIEW ────────────────────────────────────
  const renderPreview = () => (
    <div ref={documentRef} className="space-y-0">
      {/* Document Header */}
      <div className="bg-white rounded-t-2xl border border-slate-200 border-b-0">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(168,85,247,0.3) 0%, transparent 50%)' }} />
          <div className="relative px-8 py-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 border border-white/10">
              <Shield size={14} className="text-primary-300" />
              <span className="text-xs font-semibold text-primary-200 uppercase tracking-widest">Auto-Trust Platform</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
              Freelancer–Client Service Agreement
            </h1>
            <p className="text-sm text-slate-300">
              Agreement Date: <span className="font-semibold text-white">{formatDate(form.agreementDate)}</span>
            </p>
            {form.projectTitle && (
              <div className="mt-4 inline-block bg-white/10 backdrop-blur-sm px-5 py-2 rounded-xl border border-white/10">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Project</p>
                <p className="text-base font-bold text-white">{form.projectTitle}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Document Body */}
      <div className="bg-white border-x border-slate-200 px-8 py-8 space-y-8" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* Preamble */}
        <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
          <p>
            This Freelancer–Client Service Agreement ("<strong>Agreement</strong>") is entered into as of{' '}
            <strong>{formatDate(form.agreementDate)}</strong>, by and between the following parties:
          </p>
        </div>

        {/* 1. Parties */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">1</div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Parties Involved</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 p-5 rounded-xl border border-primary-100">
              <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-3">The Freelancer</p>
              <dl className="space-y-2 text-sm">
                <div><dt className="text-[10px] text-slate-400 uppercase">Name</dt><dd className="font-semibold text-slate-800">{form.freelancerName || '—'}</dd></div>
                {form.freelancerEmail && <div><dt className="text-[10px] text-slate-400 uppercase">Email</dt><dd className="text-slate-700">{form.freelancerEmail}</dd></div>}
                {form.freelancerPhone && <div><dt className="text-[10px] text-slate-400 uppercase">Phone</dt><dd className="text-slate-700">{form.freelancerPhone}</dd></div>}
                {form.freelancerPan && <div><dt className="text-[10px] text-slate-400 uppercase">PAN</dt><dd className="text-slate-700">{form.freelancerPan}</dd></div>}
                {form.freelancerAddress && <div><dt className="text-[10px] text-slate-400 uppercase">Address</dt><dd className="text-slate-700">{form.freelancerAddress}</dd></div>}
              </dl>
            </div>
            <div className="bg-gradient-to-br from-accent-50 to-purple-50 p-5 rounded-xl border border-accent-100">
              <p className="text-[10px] font-bold text-accent-600 uppercase tracking-widest mb-3">The Client</p>
              <dl className="space-y-2 text-sm">
                <div><dt className="text-[10px] text-slate-400 uppercase">Name</dt><dd className="font-semibold text-slate-800">{form.clientName || '—'}</dd></div>
                {form.clientCompany && <div><dt className="text-[10px] text-slate-400 uppercase">Company</dt><dd className="text-slate-700">{form.clientCompany}</dd></div>}
                {form.clientEmail && <div><dt className="text-[10px] text-slate-400 uppercase">Email</dt><dd className="text-slate-700">{form.clientEmail}</dd></div>}
                {form.clientPhone && <div><dt className="text-[10px] text-slate-400 uppercase">Phone</dt><dd className="text-slate-700">{form.clientPhone}</dd></div>}
                {form.clientGstin && <div><dt className="text-[10px] text-slate-400 uppercase">GSTIN</dt><dd className="text-slate-700">{form.clientGstin}</dd></div>}
                {form.clientAddress && <div><dt className="text-[10px] text-slate-400 uppercase">Address</dt><dd className="text-slate-700">{form.clientAddress}</dd></div>}
              </dl>
            </div>
          </div>
        </section>

        {/* 2. Scope of Work */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">2</div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Scope of Work</h2>
          </div>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4 text-sm text-slate-700 leading-relaxed">
            {form.scopeDescription && (
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Description of Services</p>
                <p className="whitespace-pre-wrap">{form.scopeDescription}</p>
              </div>
            )}
            {form.deliverables && (
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Deliverables</p>
                <ul className="list-disc list-inside space-y-1">
                  {form.deliverables.split('\n').filter(Boolean).map((d, i) => (
                    <li key={i}>{d.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
            {milestones.filter(m => m.title).length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Milestones & Timeline</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="py-2 pr-4 text-[10px] font-bold text-slate-500 uppercase">#</th>
                        <th className="py-2 pr-4 text-[10px] font-bold text-slate-500 uppercase">Milestone</th>
                        <th className="py-2 pr-4 text-[10px] font-bold text-slate-500 uppercase">Due Date</th>
                        <th className="py-2 text-[10px] font-bold text-slate-500 uppercase text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {milestones.filter(m => m.title).map((m, i) => (
                        <tr key={i} className="border-b border-slate-100">
                          <td className="py-2 pr-4 font-semibold text-slate-600">{i + 1}</td>
                          <td className="py-2 pr-4">{m.title}</td>
                          <td className="py-2 pr-4 text-slate-500">{formatDate(m.date)}</td>
                          <td className="py-2 text-right font-semibold">{m.amount ? formatCurrency(m.amount) : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 3. Payment Terms */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">3</div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Payment Terms</h2>
          </div>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-3 text-sm text-slate-700 leading-relaxed">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4 border-b border-slate-200">
              <div className="text-center bg-white p-3 rounded-xl border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Total Amount</p>
                <p className="text-lg font-extrabold text-slate-900 mt-1">{formatCurrency(form.totalAmount)}</p>
              </div>
              <div className="text-center bg-white p-3 rounded-xl border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Method</p>
                <p className="text-sm font-semibold text-slate-700 mt-1">{form.paymentMethod}</p>
              </div>
              <div className="text-center bg-white p-3 rounded-xl border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Schedule</p>
                <p className="text-sm font-semibold text-slate-700 mt-1 capitalize">{form.paymentSchedule}</p>
              </div>
              <div className="text-center bg-white p-3 rounded-xl border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Late Penalty</p>
                <p className="text-sm font-semibold text-slate-700 mt-1">
                  {form.latePenaltyType === 'none' ? 'None' : `${form.latePenalty}% per week`}
                </p>
              </div>
            </div>
            {(form.paymentSchedule === 'split' || form.paymentSchedule === 'milestone') && (
              <p>An advance payment of <strong>{form.advancePercentage}%</strong> ({formatCurrency((form.totalAmount * form.advancePercentage / 100) || 0)}) shall be made before commencement of work.</p>
            )}
            <p>Payment shall be made via <strong>{form.paymentMethod}</strong>. All payments are subject to applicable taxes as per Indian law.</p>
            {form.latePenaltyType !== 'none' && (
              <p>In case of delayed payment beyond the agreed schedule, a penalty of <strong>{form.latePenalty}%</strong> per week of the outstanding amount shall be applicable.</p>
            )}
          </div>
        </section>

        {/* 4. Duration */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">4</div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Duration of Agreement</h2>
          </div>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed">
            <p>This Agreement shall commence on <strong>{formatDate(form.startDate)}</strong> and shall remain in effect until <strong>{formatDate(form.endDate)}</strong>, unless terminated earlier in accordance with Section 7 of this Agreement.</p>
          </div>
        </section>

        {/* 5. Responsibilities */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">5</div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Responsibilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary-50/50 p-5 rounded-xl border border-primary-100">
              <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-3">Freelancer Responsibilities</p>
              <ul className="space-y-2 text-sm text-slate-700">
                {(form.freelancerResponsibilities || '').split('\n').filter(Boolean).map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={14} className="text-primary-500 shrink-0 mt-0.5" />
                    <span>{r.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-accent-50/50 p-5 rounded-xl border border-accent-100">
              <p className="text-[10px] font-bold text-accent-600 uppercase tracking-widest mb-3">Client Responsibilities</p>
              <ul className="space-y-2 text-sm text-slate-700">
                {(form.clientResponsibilities || '').split('\n').filter(Boolean).map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={14} className="text-accent-500 shrink-0 mt-0.5" />
                    <span>{r.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Confidentiality */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">6</div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Confidentiality</h2>
          </div>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed space-y-3">
            <p>Both parties agree to maintain strict confidentiality regarding all proprietary information, trade secrets, business strategies, client data, technical specifications, and any other sensitive information disclosed during the course of this Agreement.</p>
            <p>This confidentiality obligation shall survive the termination of this Agreement and remain in effect for a period of <strong>{form.confidentialityPeriod || '2'} year(s)</strong> following the end of the engagement.</p>
            <p>Neither party shall disclose, publish, or otherwise reveal any confidential information to any third party without prior written consent of the disclosing party, except as may be required by law.</p>
          </div>
        </section>

        {/* 7. Termination */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">7</div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Termination</h2>
          </div>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed space-y-3">
            <p>Either party may terminate this Agreement by providing <strong>{form.terminationNoticeDays || '15'} days</strong> written notice to the other party.</p>
            <p>Upon termination:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>The Freelancer shall be compensated for all work completed up to the date of termination.</li>
              <li>All materials and deliverables produced shall be handed over to the Client upon receipt of pending payments.</li>
              <li>Any advance payment for undelivered work shall be refunded proportionally.</li>
            </ul>
            <p>Immediate termination without notice is permissible in cases of material breach, fraud, or illegal activity by either party.</p>
          </div>
        </section>

        {/* 8. Dispute Resolution */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">8</div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Dispute Resolution</h2>
          </div>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed space-y-3">
            <p>In the event of any dispute or disagreement arising out of or in connection with this Agreement, the parties shall first attempt to resolve the matter amicably through <strong>mutual discussion and negotiation</strong>.</p>
            <p>If the dispute cannot be resolved through negotiation within <strong>30 days</strong>, the matter shall be referred to <strong>arbitration</strong> in accordance with the Arbitration and Conciliation Act, 1996 (India).</p>
            <p>The courts of <strong>{form.jurisdictionCity || '___'}, {form.jurisdictionState || '___'}</strong> shall have exclusive jurisdiction over any legal proceedings arising from this Agreement. This Agreement shall be governed by and construed in accordance with the laws of <strong>India</strong>.</p>
          </div>
        </section>

        {/* 9. Liability */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">9</div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Limitation of Liability</h2>
          </div>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed space-y-3">
            <p>The Freelancer's total aggregate liability under this Agreement shall not exceed the <strong>total contract value</strong> ({formatCurrency(form.totalAmount)}).</p>
            <p>Neither party shall be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.</p>
            <p>Neither party shall be held liable for any failure or delay in performance resulting from causes beyond their reasonable control, including but not limited to acts of God, natural disasters, pandemics, government restrictions, or internet service failures (<strong>Force Majeure</strong>).</p>
          </div>
        </section>

        {/* 10. Acceptance */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">10</div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Acceptance</h2>
          </div>
          <div className="bg-success-50 p-5 rounded-xl border border-success-100 text-sm text-slate-700 leading-relaxed space-y-3">
            <p>This Agreement shall become effective and legally binding upon the <strong>acceptance of its terms by both parties</strong>. Acceptance may be demonstrated through:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Physical signatures on a printed copy of this document</li>
              <li>Digital signatures through the Auto-Trust platform</li>
              <li>Electronic acceptance via email confirmation</li>
            </ul>
            <p>Both parties acknowledge that they have read, understood, and agree to all terms and conditions set forth in this Agreement.</p>
          </div>
        </section>

        {/* 11. Digital Agreement */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">11</div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Digital Agreement Validity</h2>
          </div>
          <div className="bg-primary-50 p-5 rounded-xl border border-primary-100 text-sm text-slate-700 leading-relaxed space-y-3">
            <p>This Agreement may be executed in digital form and is legally valid under the <strong>Information Technology Act, 2000</strong> (India) and the <strong>Indian Contract Act, 1872</strong>.</p>
            <p>Digital signatures provided through the <strong>Auto-Trust platform</strong> are considered valid and carry the same legal weight as handwritten signatures for the purposes of this Agreement.</p>
            <p>Electronic records of this Agreement, including any amendments or modifications, shall be deemed as original documents for all legal purposes.</p>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t-2 border-slate-200 pt-8" />

        {/* 12. Signatures */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">12</div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Signatures</h2>
          </div>
          <p className="text-sm text-slate-600 mb-6">IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first written above.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">The Freelancer</p>
              <div className="h-24 border-b-2 border-slate-300 flex items-end justify-center pb-2">
                {form.freelancerSignature ? (
                  <p className="text-2xl italic text-slate-700" style={{ fontFamily: "'Dancing Script', cursive" }}>{form.freelancerSignature}</p>
                ) : (
                  <p className="text-xs text-slate-300 italic">Signature</p>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Name:</span>
                  <span className="font-semibold text-slate-700">{form.freelancerName || '_______________'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Date:</span>
                  <span className="font-semibold text-slate-700">{formatDate(form.agreementDate)}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-accent-600 uppercase tracking-widest">The Client</p>
              <div className="h-24 border-b-2 border-slate-300 flex items-end justify-center pb-2">
                {form.clientSignature ? (
                  <p className="text-2xl italic text-slate-700" style={{ fontFamily: "'Dancing Script', cursive" }}>{form.clientSignature}</p>
                ) : (
                  <p className="text-xs text-slate-300 italic">Signature</p>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Name:</span>
                  <span className="font-semibold text-slate-700">{form.clientName || '_______________'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Date:</span>
                  <span className="font-semibold text-slate-700">{formatDate(form.agreementDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 13. Stamp */}
        <section className="pt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">13</div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Official Stamp / Seal</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-36 h-36 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center bg-slate-50">
              {stampPreview ? (
                <img src={stampPreview} alt="Official stamp" className="w-28 h-28 object-contain" />
              ) : (
                <div className="text-center">
                  <Stamp size={32} className="mx-auto text-slate-200 mb-1" />
                  <p className="text-[10px] text-slate-300 uppercase">Stamp / Seal</p>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 italic leading-relaxed max-w-md">
              This agreement may include a digital or physical stamp for verification purposes. 
              The presence of an official stamp or seal further authenticates this document 
              but is not a mandatory requirement for the validity of this agreement.
            </p>
          </div>
        </section>
      </div>

      {/* Document Footer */}
      <div className="bg-slate-50 rounded-b-2xl border border-slate-200 border-t-0 px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Generated via</p>
            <p className="text-sm font-bold text-slate-700">Auto-Trust Platform</p>
          </div>
          <p className="text-[10px] text-slate-400 text-center">
            This document is confidential and intended solely for the parties identified herein. 
            Unauthorized reproduction or distribution is prohibited.
          </p>
          <div className="text-center md:text-right">
            <p className="text-[10px] text-slate-400">Document ID</p>
            <p className="text-xs font-mono font-semibold text-slate-500">AT-{Date.now().toString(36).toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 pt-8">
        <button
          onClick={() => setMode('form')}
          className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors flex items-center justify-center gap-2"
        >
          <Edit3 size={16} />
          Edit Agreement
        </button>
        <button
          onClick={() => {
            if (window.print) window.print();
          }}
          className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold text-sm shadow-lg shadow-primary-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Download size={16} />
          Download / Print
        </button>
        <button
          onClick={() => navigate('/create-contract')}
          className="px-6 py-2.5 rounded-xl bg-success-500 hover:bg-success-600 text-white font-semibold text-sm shadow-lg shadow-success-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Send size={16} />
          Generate Smart Contract
        </button>
      </div>
    </div>
  );

  // ── MAIN RENDER ────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Back & Title */}
      <motion.button
        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors group mb-6"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </motion.button>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">Agreement</span>
            </h1>
            <p className="text-slate-500 mt-1 text-sm">Create a legally-structured freelancer-client agreement</p>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setMode('form')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${mode === 'form' ? 'bg-white shadow-sm text-primary-700' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Edit3 size={14} /> Form
            </button>
            <button
              onClick={() => setMode('preview')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${mode === 'preview' ? 'bg-white shadow-sm text-primary-700' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Eye size={14} /> Preview
            </button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {mode === 'form' ? renderForm() : renderPreview()}
      </motion.div>
    </div>
  );
}
