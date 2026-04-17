import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import html2pdf from 'html2pdf.js';
import {
  ArrowLeft, FileText, User, Calendar, DollarSign, Shield, Scale,
  AlertTriangle, CheckCircle, Upload, Download, Eye, Edit3,
  Briefcase, Clock, Lock, Gavel, FileCheck, Stamp, PenTool,
  ChevronDown, Info, X, Check, Send, CreditCard,
  Building, Phone, Mail, MapPin, Hash, Pickaxe
} from 'lucide-react';

/* ─── Reusable Sub-components ─────────────────────────────────── */

function SectionAccordion({ icon: Icon, title, number, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-3.5 bg-slate-50/80 hover:bg-slate-100 transition-colors text-left"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0">
          <Icon size={16} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-primary-600 uppercase tracking-wider">Section {number}</p>
          <h3 className="text-sm font-bold text-slate-800">{title}</h3>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-slate-400" />
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
            <div className="px-5 py-4 bg-white space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Input({ icon: Icon, label, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />}
        <input
          {...props}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all outline-none text-sm`}
        />
      </div>
    </div>
  );
}

function Textarea({ label, ...props }) {
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

function Select({ icon: Icon, label, children, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />}
        <select
          {...props}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all outline-none text-sm appearance-none`}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
      </div>
    </div>
  );
}

function MilestoneRow({ milestone, index, onChange, onRemove }) {
  return (
    <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
      <div className="w-6 h-6 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold shrink-0 mt-1">{index + 1}</div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input type="text" placeholder="Milestone title" value={milestone.title} onChange={(e) => onChange(index, 'title', e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-primary-400 transition-colors" />
        <input type="date" value={milestone.date} onChange={(e) => onChange(index, 'date', e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-primary-400 transition-colors" />
        <input type="text" placeholder="Amount (₹)" value={milestone.amount} onChange={(e) => onChange(index, 'amount', e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-primary-400 transition-colors" />
      </div>
      <button type="button" onClick={() => onRemove(index)} className="p-1.5 rounded-lg hover:bg-danger-50 text-slate-400 hover:text-danger-500 transition-colors mt-0.5"><X size={15} /></button>
    </div>
  );
}

function SignaturePad({ label, signatureData, onSave, onClear }) {
  const canvasRef = React.useRef(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [hasDrawn, setHasDrawn] = React.useState(false);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const startDraw = (e) => {
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    setHasDrawn(true);
  };

  const endDraw = () => {
    if (isDrawing && hasDrawn) {
      onSave(canvasRef.current.toDataURL('image/png'));
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    onClear();
=======
import { Calendar, DollarSign, User, FileText, Pickaxe, Send, ArrowLeft, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function CreateContract() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    partyB: '',
    title: '',
    description: '',
    amount: '',
    deadline: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const freelancerRes = await fetch(`http://localhost:5000/api/auth/freelancer/${formData.partyB}`);
      const freelancerData = await freelancerRes.json();

      if (!freelancerRes.ok) {
        setError(freelancerData.message || 'Freelancer not found with that email.');
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          partyA: user._id,
          partyB: freelancerData._id,
          amount: Number(formData.amount),
          deadline: formData.deadline
        })
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/contracts');
      } else {
        setError(data.error || 'Failed to create contract.');
      }
    } catch (err) {
      setError('Connection error. Server may be down.');
    } finally {
      setLoading(false);
    }
>>>>>>> 55844beec01521a83b48826b336c6fadde04dea3
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-2">
        <PenTool size={13} className="text-primary-500" />
        {label}
      </label>
      <div className="relative rounded-xl overflow-hidden border-2 border-slate-200 hover:border-primary-300 transition-colors bg-white">
        {signatureData ? (
          <div className="relative group">
            <img src={signatureData} alt={label} className="w-full h-28 object-contain bg-white" />
            <button
              type="button"
              onClick={clearCanvas}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 hover:bg-danger-50 text-slate-400 hover:text-danger-500 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
            >
              <X size={14} />
            </button>
            <div className="absolute bottom-1 left-2 text-[9px] text-success-600 font-semibold uppercase tracking-wider flex items-center gap-1">
              <Check size={10} /> Signed
            </div>
          </div>
        ) : (
          <>
            <canvas
              ref={canvasRef}
              width={500}
              height={160}
              className="w-full h-28 cursor-crosshair touch-none"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={endDraw}
            />
            <div className="absolute bottom-0 left-0 right-0 border-t border-dashed border-slate-200" style={{ bottom: '20px' }} />
            <div className="absolute bottom-1 left-2 text-[9px] text-slate-300 font-medium uppercase tracking-wider flex items-center gap-1">
              <PenTool size={9} /> Draw your signature above
            </div>
            {hasDrawn && (
              <button
                type="button"
                onClick={clearCanvas}
                className="absolute top-2 right-2 p-1 rounded-lg bg-white/90 hover:bg-danger-50 text-slate-400 hover:text-danger-500 transition-all shadow-sm text-[10px] font-semibold flex items-center gap-1"
              >
                <X size={12} /> Clear
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                */
/* ═══════════════════════════════════════════════════════════════ */

export default function CreateContract() {
  const navigate = useNavigate();
  const docRef = useRef(null);
  const [mode, setMode] = useState('form'); // 'form' | 'preview'
  const [downloading, setDownloading] = useState(false);

  const SEAL_IMG = '/autotrust-seal.png';

  const [form, setForm] = useState({
    freelancerName: '', freelancerEmail: '', freelancerPhone: '', freelancerAddress: '',
    clientName: '', clientEmail: '', clientPhone: '', clientAddress: '', clientCompany: '', clientGstin: '',
    projectTitle: '', scopeDescription: '', deliverables: '',
    totalAmount: '', currency: 'INR', paymentMethod: 'Bank Transfer', paymentSchedule: 'milestone',
    advancePercentage: '30', latePenalty: '1.5', latePenaltyType: 'percentage',
    startDate: '', endDate: '',
    freelancerResponsibilities: 'Deliver all agreed-upon services within the specified timelines.\nMaintain regular communication with the client regarding progress.\nEnsure quality standards as discussed and agreed upon.\nMake necessary revisions as per the agreed revision policy.',
    clientResponsibilities: 'Provide all necessary information, assets, and access required for the project.\nMake payments as per the agreed schedule.\nProvide timely feedback and approvals to avoid delays.\nDesignate a single point of contact for communication.',
    confidentialityPeriod: '2', terminationNoticeDays: '15',
    jurisdictionCity: 'New Delhi', jurisdictionState: 'Delhi',
    freelancerSignature: '', clientSignature: '',
    agreementDate: new Date().toISOString().split('T')[0],
  });

  const [milestones, setMilestones] = useState([{ title: '', date: '', amount: '' }]);
  const u = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const addMs = () => setMilestones(p => [...p, { title: '', date: '', amount: '' }]);
  const removeMs = (i) => setMilestones(p => p.filter((_, idx) => idx !== i));
  const updateMs = (i, k, v) => setMilestones(p => { const c = [...p]; c[i] = { ...c[i], [k]: v }; return c; });

  const handleSign = (party, dataUrl) => {
    u(party === 'freelancer' ? 'freelancerSignature' : 'clientSignature', dataUrl);
  };

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '_______________';
  const fmtCur = (a) => a ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: form.currency || 'INR' }).format(a) : '₹_______________';

  // PDF Download — resolves oklch colors for html2canvas compatibility
  const downloadPDF = async () => {
    if (!docRef.current) return;
    setDownloading(true);
    try {
      const element = docRef.current;

      // Clone the element so we can modify styles without affecting UI
      const clone = element.cloneNode(true);
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.width = element.offsetWidth + 'px';
      document.body.appendChild(clone);

      // Resolve all oklch/modern colors to rgb
      const resolveColors = (el) => {
        const computed = window.getComputedStyle(el);
        const props = [
          'color', 'backgroundColor', 'borderColor',
          'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
          'outlineColor', 'textDecorationColor', 'boxShadow'
        ];
        props.forEach(prop => {
          const val = computed.getPropertyValue(prop);
          if (val && (val.includes('oklch') || val.includes('oklab') || val.includes('color('))) {
            // Create a temporary element to resolve the color
            const temp = document.createElement('div');
            temp.style[prop] = val;
            document.body.appendChild(temp);
            const resolved = window.getComputedStyle(temp).getPropertyValue(prop);
            document.body.removeChild(temp);
            el.style[prop] = resolved || val;
          }
        });

        // Also resolve background-image gradients with oklch
        const bgImage = computed.backgroundImage;
        if (bgImage && bgImage !== 'none' && (bgImage.includes('oklch') || bgImage.includes('oklab'))) {
          el.style.backgroundImage = 'none';
          el.style.backgroundColor = computed.backgroundColor;
        }

        for (const child of el.children) {
          resolveColors(child);
        }
      };

      resolveColors(clone);

      // Remove action buttons from clone
      const actionBtns = clone.querySelectorAll('[data-no-pdf]');
      actionBtns.forEach(btn => btn.remove());

      const filename = `AutoTrust_Agreement_${form.projectTitle?.replace(/\s+/g, '_') || 'Contract'}_${new Date().toISOString().split('T')[0]}.pdf`;

      const opt = {
        margin: [0, 0, 0, 0],
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
          backgroundColor: '#ffffff',
          removeContainer: true,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      await html2pdf().set(opt).from(clone).save();
      document.body.removeChild(clone);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('PDF download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  /* ─── FORM VIEW ─────────────────────────────────────────────── */
  const renderForm = () => (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setMode('preview'); }}>

      {/* 1 — Parties */}
      <SectionAccordion icon={User} title="Parties Involved" number="1" defaultOpen={true}>
        <div className="bg-primary-50/50 p-4 rounded-xl border border-primary-100 mb-3">
          <p className="text-xs font-bold text-primary-700 uppercase tracking-wider mb-3 flex items-center gap-2"><Briefcase size={13} /> Freelancer Details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input icon={User} label="Full Name" placeholder="Enter freelancer name" value={form.freelancerName} onChange={(e) => u('freelancerName', e.target.value)} required />
            <Input icon={Mail} label="Email" type="email" placeholder="freelancer@email.com" value={form.freelancerEmail} onChange={(e) => u('freelancerEmail', e.target.value)} />
            <Input icon={Phone} label="Phone" placeholder="+91 XXXXX XXXXX" value={form.freelancerPhone} onChange={(e) => u('freelancerPhone', e.target.value)} />
          </div>
          <div className="mt-3">
            <Textarea label="Address" rows={2} placeholder="Full address..." value={form.freelancerAddress} onChange={(e) => u('freelancerAddress', e.target.value)} />
          </div>
        </div>
        <div className="bg-accent-50/50 p-4 rounded-xl border border-accent-100">
          <p className="text-xs font-bold text-accent-700 uppercase tracking-wider mb-3 flex items-center gap-2"><Building size={13} /> Client Details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input icon={User} label="Full Name / Company" placeholder="Enter client name" value={form.clientName} onChange={(e) => u('clientName', e.target.value)} required />
            <Input icon={Mail} label="Email" type="email" placeholder="client@company.com" value={form.clientEmail} onChange={(e) => u('clientEmail', e.target.value)} />
            <Input icon={Phone} label="Phone" placeholder="+91 XXXXX XXXXX" value={form.clientPhone} onChange={(e) => u('clientPhone', e.target.value)} />
            <Input icon={Building} label="Company Name" placeholder="Company Pvt. Ltd." value={form.clientCompany} onChange={(e) => u('clientCompany', e.target.value)} />
            <Input icon={Hash} label="GSTIN (if applicable)" placeholder="22AAAAA0000A1Z5" value={form.clientGstin} onChange={(e) => u('clientGstin', e.target.value)} />
          </div>
          <div className="mt-3">
            <Textarea label="Address" rows={2} placeholder="Full address..." value={form.clientAddress} onChange={(e) => u('clientAddress', e.target.value)} />
          </div>
        </div>
      </SectionAccordion>

      {/* 2 — Scope of Work */}
      <SectionAccordion icon={Briefcase} title="Scope of Work" number="2">
        <Input icon={FileText} label="Project Title" placeholder="e.g. Website Redesign Project" value={form.projectTitle} onChange={(e) => u('projectTitle', e.target.value)} required />
        <Textarea label="Detailed Scope of Services" rows={4} placeholder="Describe the services the freelancer will provide in detail..." value={form.scopeDescription} onChange={(e) => u('scopeDescription', e.target.value)} required />
        <Textarea label="Deliverables" rows={3} placeholder="List all deliverables (one per line)..." value={form.deliverables} onChange={(e) => u('deliverables', e.target.value)} />
        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 block">Milestones & Timeline</label>
          <div className="space-y-2">
            {milestones.map((m, i) => <MilestoneRow key={i} milestone={m} index={i} onChange={updateMs} onRemove={removeMs} />)}
          </div>
          <button type="button" onClick={addMs} className="mt-2 text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1.5 transition-colors"><CheckCircle size={13} /> + Add Milestone</button>
        </div>
      </SectionAccordion>

      {/* 3 — Payment */}
      <SectionAccordion icon={DollarSign} title="Payment Terms" number="3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input icon={DollarSign} label="Total Payment Amount" type="number" placeholder="50000" value={form.totalAmount} onChange={(e) => u('totalAmount', e.target.value)} required />
          <Select icon={CreditCard} label="Currency" value={form.currency} onChange={(e) => u('currency', e.target.value)}>
            <option value="INR">INR (₹)</option><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option>
          </Select>
          <Select icon={CreditCard} label="Payment Method" value={form.paymentMethod} onChange={(e) => u('paymentMethod', e.target.value)}>
            <option>Bank Transfer</option><option>UPI</option><option>PayPal</option><option>Cheque</option><option>Other</option>
          </Select>
          <Select icon={Clock} label="Payment Schedule" value={form.paymentSchedule} onChange={(e) => u('paymentSchedule', e.target.value)}>
            <option value="milestone">Milestone-based</option><option value="advance">Full Advance</option><option value="completion">After Completion</option><option value="split">Advance + Completion</option>
          </Select>
        </div>
        {(form.paymentSchedule === 'split' || form.paymentSchedule === 'milestone') && (
          <Input label="Advance Payment (%)" type="number" min="0" max="100" placeholder="30" value={form.advancePercentage} onChange={(e) => u('advancePercentage', e.target.value)} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input label="Late Payment Penalty (%)" type="number" step="0.1" placeholder="1.5" value={form.latePenalty} onChange={(e) => u('latePenalty', e.target.value)} />
          <Select label="Penalty Type" value={form.latePenaltyType} onChange={(e) => u('latePenaltyType', e.target.value)}>
            <option value="percentage">% per week of delay</option><option value="fixed">Fixed amount per week</option><option value="none">No penalty</option>
          </Select>
        </div>
      </SectionAccordion>

      {/* 4 — Duration */}
      <SectionAccordion icon={Calendar} title="Agreement Duration" number="4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input icon={Calendar} label="Start Date" type="date" value={form.startDate} onChange={(e) => u('startDate', e.target.value)} required />
          <Input icon={Calendar} label="End Date" type="date" value={form.endDate} onChange={(e) => u('endDate', e.target.value)} required />
        </div>
      </SectionAccordion>

      {/* 5 — Responsibilities */}
      <SectionAccordion icon={CheckCircle} title="Responsibilities" number="5">
        <Textarea label="Freelancer Responsibilities" rows={4} value={form.freelancerResponsibilities} onChange={(e) => u('freelancerResponsibilities', e.target.value)} />
        <Textarea label="Client Responsibilities" rows={4} value={form.clientResponsibilities} onChange={(e) => u('clientResponsibilities', e.target.value)} />
      </SectionAccordion>

      {/* 6 — Confidentiality */}
      <SectionAccordion icon={Lock} title="Confidentiality Clause" number="6">
        <div className="bg-warning-50 p-3 rounded-xl border border-warning-100 flex gap-3 mb-2">
          <Shield size={16} className="text-warning-600 shrink-0 mt-0.5" />
          <p className="text-xs text-warning-800 leading-relaxed">Both parties agree to maintain strict confidentiality of all proprietary and sensitive business information shared during this engagement.</p>
        </div>
        <Input label="Confidentiality Period (years after termination)" type="number" placeholder="2" value={form.confidentialityPeriod} onChange={(e) => u('confidentialityPeriod', e.target.value)} />
      </SectionAccordion>

      {/* 7 — Termination */}
      <SectionAccordion icon={AlertTriangle} title="Termination Clause" number="7">
        <Input label="Notice Period (days)" type="number" placeholder="15" value={form.terminationNoticeDays} onChange={(e) => u('terminationNoticeDays', e.target.value)} />
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-600 leading-relaxed">Either party may terminate this agreement by providing written notice of <strong>{form.terminationNoticeDays || '15'} days</strong>. Upon termination, the freelancer shall be compensated for all work completed up to the termination date.</p>
        </div>
      </SectionAccordion>

      {/* 8 — Dispute Resolution */}
      <SectionAccordion icon={Gavel} title="Dispute Resolution" number="8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input icon={MapPin} label="Jurisdiction City" placeholder="New Delhi" value={form.jurisdictionCity} onChange={(e) => u('jurisdictionCity', e.target.value)} />
          <Input icon={MapPin} label="Jurisdiction State" placeholder="Delhi" value={form.jurisdictionState} onChange={(e) => u('jurisdictionState', e.target.value)} />
        </div>
        <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 flex gap-3">
          <Scale size={16} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 leading-relaxed">All disputes shall first be resolved through mutual discussion. If unresolved, they shall be subject to arbitration under Indian law in <strong>{form.jurisdictionCity || '___'}, {form.jurisdictionState || '___'}</strong>.</p>
        </div>
      </SectionAccordion>

      {/* 9 — Liability */}
      <SectionAccordion icon={Shield} title="Limitation of Liability" number="9">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
          <p className="text-xs text-slate-600 leading-relaxed">• The freelancer's total liability shall not exceed the total contract value.</p>
          <p className="text-xs text-slate-600 leading-relaxed">• Neither party shall be liable for indirect, incidental, or consequential damages.</p>
          <p className="text-xs text-slate-600 leading-relaxed">• Force majeure events exempt the affected party from liability.</p>
        </div>
      </SectionAccordion>

      {/* 10 — Acceptance */}
      <SectionAccordion icon={FileCheck} title="Acceptance & Validity" number="10">
        <div className="bg-success-50 p-3 rounded-xl border border-success-100 flex gap-3">
          <CheckCircle size={16} className="text-success-600 shrink-0 mt-0.5" />
          <p className="text-xs text-success-800 leading-relaxed">This agreement becomes valid upon acceptance by both parties through physical signatures, digital signatures, or electronic acceptance via the Auto-Trust platform.</p>
        </div>
      </SectionAccordion>

      {/* 11 — Digital Agreement */}
      <SectionAccordion icon={Shield} title="Digital Agreement Feature" number="11">
        <div className="bg-primary-50 p-3 rounded-xl border border-primary-100 flex gap-3">
          <Info size={16} className="text-primary-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs text-primary-800 leading-relaxed font-semibold">This agreement can be digitally signed and is legally valid under the Information Technology Act, 2000 (India).</p>
            <p className="text-xs text-primary-700 leading-relaxed">Digital signatures via Auto-Trust carry the same legal weight as physical signatures.</p>
          </div>
        </div>
      </SectionAccordion>

      {/* 12 — Signatures */}
      <SectionAccordion icon={PenTool} title="Digital Signatures" number="12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SignaturePad label="Your Signature (Freelancer)" signatureData={form.freelancerSignature} onSave={(data) => handleSign('freelancer', data)} onClear={() => u('freelancerSignature', '')} />
          
          <div className="space-y-2 flex flex-col">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                <User size={13} className="text-slate-400" />
                Client Signature Process
            </label>
            <div className="flex-1 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-5 flex flex-col justify-center items-center text-center space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-700">Awaiting Client</p>
                <p className="text-[11px] text-slate-500 max-w-[200px] mx-auto leading-relaxed">Send this agreement to the client so they can review and sign it digitally.</p>
              </div>
              
              {form.freelancerSignature ? (
                <button 
                  type="button" 
                  onClick={() => alert(`Success! A secure link to sign this contract has been sent to the client's email (${form.clientEmail || 'Client'}).`)} 
                  className="w-full bg-gradient-to-r from-accent-500 to-purple-500 hover:from-accent-600 hover:to-purple-600 text-white shadow-lg shadow-accent-500/20 py-2.5 rounded-lg text-xs font-semibold transition-all active:scale-95 flex justify-center items-center gap-2"
                >
                  <Send size={14} /> Send Agreement to Client
                </button>
              ) : (
                <div className="w-full bg-slate-200 text-slate-400 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wide flex justify-center items-center gap-2 cursor-not-allowed">
                   <Lock size={13} /> Sign your part first
                </div>
              )}
            </div>
          </div>
        </div>
        <Input icon={Calendar} label="Agreement Date" type="date" value={form.agreementDate} onChange={(e) => u('agreementDate', e.target.value)} />
      </SectionAccordion>

      {/* 13 — Stamp */}
      <SectionAccordion icon={Stamp} title="Official Stamp / Seal" number="13">
        <div className="flex items-center gap-5 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <img src={SEAL_IMG} alt="AutoTrust Official Seal" className="w-24 h-24 object-contain rounded-xl" />
          <div className="space-y-1.5">
            <p className="text-sm font-bold text-slate-800">AutoTrust Authorized Official Seal</p>
            <p className="text-xs text-slate-500">REG. NO. 1203875</p>
            <p className="text-xs text-slate-500 leading-relaxed">This stamp will be automatically applied to the generated PDF agreement for verification and authentication purposes.</p>
          </div>
        </div>
      </SectionAccordion>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-5 border-t border-slate-200">
        <button type="button" onClick={() => navigate('/dashboard')} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">Cancel</button>
        <button type="submit" className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold text-sm shadow-lg shadow-primary-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
          <Eye size={16} /> Preview Agreement
        </button>
      </div>
    </form>
  );

  /* ─── PREVIEW / DOCUMENT VIEW ───────────────────────────────── */
  const renderPreview = () => (
    <div ref={docRef} className="space-y-0">
      {/* Header */}
      <div className="bg-white rounded-t-2xl border border-slate-200 border-b-0">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(168,85,247,0.3) 0%, transparent 50%)' }} />
          <div className="relative px-8 py-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 border border-white/10">
              <Shield size={13} className="text-primary-300" />
              <span className="text-[10px] font-semibold text-primary-200 uppercase tracking-widest">Auto-Trust Platform</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">Freelancer–Client Service Agreement</h1>
            <p className="text-sm text-slate-300">Agreement Date: <span className="font-semibold text-white">{fmtDate(form.agreementDate)}</span></p>
            {form.projectTitle && (
              <div className="mt-4 inline-block bg-white/10 backdrop-blur-sm px-5 py-2 rounded-xl border border-white/10">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Project</p>
                <p className="text-base font-bold text-white">{form.projectTitle}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white border-x border-slate-200 px-8 py-8 space-y-8" style={{ fontFamily: "'Inter', sans-serif" }}>
        <p className="text-sm text-slate-700 leading-relaxed">
          This Freelancer–Client Service Agreement ("<strong>Agreement</strong>") is entered into as of <strong>{fmtDate(form.agreementDate)}</strong>, by and between the following parties:
        </p>

        {/* 1 Parties */}
        <Section n="1" title="Parties Involved">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 p-5 rounded-xl border border-primary-100">
              <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-3">The Freelancer</p>
              <DL data={[['Name', form.freelancerName, true], ['Email', form.freelancerEmail], ['Phone', form.freelancerPhone], ['Address', form.freelancerAddress]]} />
            </div>
            <div className="bg-gradient-to-br from-accent-50 to-purple-50 p-5 rounded-xl border border-accent-100">
              <p className="text-[10px] font-bold text-accent-600 uppercase tracking-widest mb-3">The Client</p>
              <DL data={[['Name', form.clientName, true], ['Company', form.clientCompany], ['Email', form.clientEmail], ['Phone', form.clientPhone], ['GSTIN', form.clientGstin], ['Address', form.clientAddress]]} />
            </div>
          </div>
        </Section>

        {/* 2 Scope */}
        <Section n="2" title="Scope of Work">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4 text-sm text-slate-700 leading-relaxed">
            {form.scopeDescription && <div><p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Description of Services</p><p className="whitespace-pre-wrap">{form.scopeDescription}</p></div>}
            {form.deliverables && <div><p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Deliverables</p><ul className="list-disc list-inside space-y-1">{form.deliverables.split('\n').filter(Boolean).map((d, i) => <li key={i}>{d.trim()}</li>)}</ul></div>}
            {milestones.filter(m => m.title).length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Milestones & Timeline</p>
                <table className="w-full text-left">
                  <thead><tr className="border-b border-slate-200"><th className="py-2 pr-4 text-[10px] font-bold text-slate-500 uppercase">#</th><th className="py-2 pr-4 text-[10px] font-bold text-slate-500 uppercase">Milestone</th><th className="py-2 pr-4 text-[10px] font-bold text-slate-500 uppercase">Due Date</th><th className="py-2 text-[10px] font-bold text-slate-500 uppercase text-right">Amount</th></tr></thead>
                  <tbody>{milestones.filter(m => m.title).map((m, i) => <tr key={i} className="border-b border-slate-100"><td className="py-2 pr-4 font-semibold text-slate-600">{i + 1}</td><td className="py-2 pr-4">{m.title}</td><td className="py-2 pr-4 text-slate-500">{fmtDate(m.date)}</td><td className="py-2 text-right font-semibold">{m.amount ? fmtCur(m.amount) : '—'}</td></tr>)}</tbody>
                </table>
              </div>
            )}
          </div>
        </Section>

        {/* 3 Payment */}
        <Section n="3" title="Payment Terms">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-3 text-sm text-slate-700 leading-relaxed">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-4 border-b border-slate-200">
              <StatBox label="Total Amount" value={fmtCur(form.totalAmount)} bold />
              <StatBox label="Method" value={form.paymentMethod} />
              <StatBox label="Schedule" value={form.paymentSchedule} />
              <StatBox label="Late Penalty" value={form.latePenaltyType === 'none' ? 'None' : `${form.latePenalty}% / week`} />
            </div>
            {(form.paymentSchedule === 'split' || form.paymentSchedule === 'milestone') && <p>Advance payment of <strong>{form.advancePercentage}%</strong> ({fmtCur((form.totalAmount * form.advancePercentage / 100) || 0)}) before commencement.</p>}
            <p>Payment via <strong>{form.paymentMethod}</strong>. All payments subject to applicable taxes under Indian law.</p>
            {form.latePenaltyType !== 'none' && <p>Late penalty: <strong>{form.latePenalty}%</strong> per week of outstanding amount.</p>}
          </div>
        </Section>

        {/* 4 Duration */}
        <Section n="4" title="Duration of Agreement">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed">
            <p>This Agreement commences on <strong>{fmtDate(form.startDate)}</strong> and remains in effect until <strong>{fmtDate(form.endDate)}</strong>, unless terminated earlier per Section 7.</p>
          </div>
        </Section>

        {/* 5 Responsibilities */}
        <Section n="5" title="Responsibilities">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary-50/50 p-5 rounded-xl border border-primary-100">
              <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-3">Freelancer</p>
              <ul className="space-y-2 text-sm text-slate-700">{(form.freelancerResponsibilities || '').split('\n').filter(Boolean).map((r, i) => <li key={i} className="flex items-start gap-2"><Check size={13} className="text-primary-500 shrink-0 mt-0.5" /><span>{r.trim()}</span></li>)}</ul>
            </div>
            <div className="bg-accent-50/50 p-5 rounded-xl border border-accent-100">
              <p className="text-[10px] font-bold text-accent-600 uppercase tracking-widest mb-3">Client</p>
              <ul className="space-y-2 text-sm text-slate-700">{(form.clientResponsibilities || '').split('\n').filter(Boolean).map((r, i) => <li key={i} className="flex items-start gap-2"><Check size={13} className="text-accent-500 shrink-0 mt-0.5" /><span>{r.trim()}</span></li>)}</ul>
            </div>
          </div>
        </Section>

        {/* 6 Confidentiality */}
        <Section n="6" title="Confidentiality">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed space-y-3">
            <p>Both parties agree to maintain strict confidentiality regarding all proprietary information, trade secrets, business strategies, client data, and technical specifications disclosed during this Agreement.</p>
            <p>This obligation survives termination for <strong>{form.confidentialityPeriod || '2'} year(s)</strong>.</p>
            <p>No disclosure to third parties without prior written consent, except as required by law.</p>
          </div>
        </Section>

        {/* 7 Termination */}
        <Section n="7" title="Termination">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed space-y-3">
            <p>Either party may terminate with <strong>{form.terminationNoticeDays || '15'} days</strong> written notice.</p>
            <p>Upon termination:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Freelancer compensated for all completed work.</li>
              <li>All deliverables handed over upon receipt of pending payments.</li>
              <li>Advance for undelivered work refunded proportionally.</li>
            </ul>
            <p>Immediate termination permitted for material breach, fraud, or illegal activity.</p>
          </div>
        </Section>

        {/* 8 Dispute */}
        <Section n="8" title="Dispute Resolution">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed space-y-3">
            <p>Disputes shall first be resolved through <strong>mutual discussion</strong>.</p>
            <p>If unresolved within <strong>30 days</strong>, referred to <strong>arbitration</strong> under the Arbitration and Conciliation Act, 1996 (India).</p>
            <p>Courts of <strong>{form.jurisdictionCity || '___'}, {form.jurisdictionState || '___'}</strong> shall have exclusive jurisdiction. Governed by the laws of <strong>India</strong>.</p>
          </div>
        </Section>

        {/* 9 Liability */}
        <Section n="9" title="Limitation of Liability">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed space-y-3">
            <p>Total liability shall not exceed <strong>{fmtCur(form.totalAmount)}</strong>.</p>
            <p>Neither party liable for indirect, incidental, special, consequential, or punitive damages.</p>
            <p>Force majeure events exempt the affected party from liability.</p>
          </div>
        </Section>

        {/* 10 Acceptance */}
        <Section n="10" title="Acceptance">
          <div className="bg-success-50 p-5 rounded-xl border border-success-100 text-sm text-slate-700 leading-relaxed space-y-3">
            <p>Agreement becomes binding upon <strong>acceptance by both parties</strong> via physical signatures, digital signatures, or electronic acceptance through Auto-Trust.</p>
            <p>Both parties acknowledge they have read, understood, and agree to all terms herein.</p>
          </div>
        </Section>

        {/* 11 Digital */}
        <Section n="11" title="Digital Agreement Validity">
          <div className="bg-primary-50 p-5 rounded-xl border border-primary-100 text-sm text-slate-700 leading-relaxed space-y-3">
            <p>Legally valid under the <strong>Information Technology Act, 2000</strong> and the <strong>Indian Contract Act, 1872</strong>.</p>
            <p>Digital signatures via <strong>Auto-Trust</strong> carry the same legal weight as handwritten signatures.</p>
            <p>Electronic records are deemed original documents for all legal purposes.</p>
          </div>
        </Section>

        <div className="border-t-2 border-slate-200 pt-8" />

        {/* 12 Signatures */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">12</div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Signatures</h2>
          </div>
          <p className="text-sm text-slate-600 mb-6">IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SigBlock label="The Freelancer" color="primary" name={form.freelancerName} signature={form.freelancerSignature} date={form.agreementDate} fmtDate={fmtDate} />
            <SigBlock label="The Client" color="accent" name={form.clientName} signature={form.clientSignature} date={form.agreementDate} fmtDate={fmtDate} />
          </div>
        </section>

        {/* 13 Stamp */}
        <section className="pt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">13</div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Official Stamp / Seal</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-36 h-36 rounded-xl flex items-center justify-center bg-white p-2">
              <img src={SEAL_IMG} alt="AutoTrust Authorized Official Seal" className="w-32 h-32 object-contain" crossOrigin="anonymous" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 mb-1">AutoTrust Authorized Official Seal</p>
              <p className="text-xs text-slate-500 mb-2">REG. NO. 1203875</p>
              <p className="text-xs text-slate-500 italic leading-relaxed max-w-md">This agreement is stamped with the AutoTrust Authorized Official Seal for verification and authentication purposes. This digital seal carries the same validity as a physical stamp under the Information Technology Act, 2000.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 rounded-b-2xl border border-slate-200 border-t-0 px-8 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Generated via</p>
            <p className="text-sm font-bold text-slate-700">Auto-Trust Platform</p>
          </div>
          <p className="text-[10px] text-slate-400 text-center">Confidential. Unauthorized reproduction or distribution is prohibited.</p>
          <div className="text-center md:text-right">
            <p className="text-[10px] text-slate-400">Document ID</p>
            <p className="text-xs font-mono font-semibold text-slate-500">AT-{Date.now().toString(36).toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Actions — NOT included in PDF */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 pt-8" data-html2pdf-ignore>
        <button onClick={() => setMode('form')} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors flex items-center justify-center gap-2"><Edit3 size={15} /> Edit</button>
        <button
          onClick={downloadPDF}
          disabled={downloading}
          className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold text-sm shadow-lg shadow-primary-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Download size={15} />
          {downloading ? 'Generating PDF...' : 'Download as PDF'}
        </button>
        <button onClick={() => navigate('/dashboard')} className="px-6 py-2.5 rounded-xl bg-success-500 hover:bg-success-600 text-white font-semibold text-sm shadow-lg shadow-success-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"><Send size={15} /> Submit Contract</button>
      </div>
    </div>
  );

  /* ─── MAIN RENDER ───────────────────────────────────────────── */
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors group mb-6">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </motion.button>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">Contract</span></h1>
            <p className="text-slate-500 mt-1 text-sm">Freelancer–Client Service Agreement • All 13 Sections</p>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setMode('form')} className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${mode === 'form' ? 'bg-white shadow-sm text-primary-700' : 'text-slate-500 hover:text-slate-700'}`}><Edit3 size={13} /> Form</button>
            <button onClick={() => setMode('preview')} className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${mode === 'preview' ? 'bg-white shadow-sm text-primary-700' : 'text-slate-500 hover:text-slate-700'}`}><Eye size={13} /> Preview</button>
          </div>
        </div>
      </motion.div>

<<<<<<< HEAD
      <motion.div key={mode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {mode === 'form' ? renderForm() : renderPreview()}
=======
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <form onSubmit={handleSubmit} className="card space-y-6">

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-xl flex items-center gap-3 text-sm">
              <AlertCircle size={18} className="flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Party A (You)</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={user.name || ''} 
                  placeholder="Your name (auto-filled on login)"
                  disabled 
                  className="input-field pl-11 bg-slate-100 text-slate-500 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Party B (Collaborator email)</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="email" 
                  placeholder="e.g. sarah@example.com" 
                  required
                  value={formData.partyB}
                  onChange={(e) => setFormData({...formData, partyB: e.target.value})}
                  className="input-field pl-11"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Contract Title</label>
            <div className="relative">
              <FileText className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="e.g. Website Redesign Project" 
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="input-field pl-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Deal Description</label>
            <textarea 
              placeholder="Describe the deliverables, timeline, and terms..." 
              required
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="input-field resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Amount (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="number" 
                  min="1"
                  placeholder="5000" 
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="input-field pl-11 font-semibold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Deadline</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="date" 
                  required
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  className="input-field pl-11 text-slate-700"
                />
              </div>
            </div>
          </div>

          <div className="bg-primary-50 p-4 rounded-xl border border-primary-100 flex items-start gap-3 mt-4">
            <Pickaxe className="text-primary-500 mt-0.5 shrink-0" size={20} />
            <p className="text-sm text-primary-800 leading-relaxed">
              Once generated, a Smart Contract will be created and an invitation will be sent to the collaborator. Funds will only be held when both parties agree.
            </p>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onClick={() => navigate('/dashboard')} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              {loading ? 'Creating...' : 'Generate Smart Contract'}
            </button>
          </div>
        </form>
>>>>>>> 55844beec01521a83b48826b336c6fadde04dea3
      </motion.div>
    </div>
  );
}

/* ─── Small helper components for Preview ─────────────────────── */

function Section({ n, title, children }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">{n}</div>
        <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function DL({ data }) {
  return (
    <dl className="space-y-2 text-sm">
      {data.map(([label, value, bold]) => value ? (
        <div key={label}><dt className="text-[10px] text-slate-400 uppercase">{label}</dt><dd className={bold ? 'font-semibold text-slate-800' : 'text-slate-700'}>{value}</dd></div>
      ) : null)}
    </dl>
  );
}

function StatBox({ label, value, bold }) {
  return (
    <div className="text-center bg-white p-3 rounded-xl border border-slate-100">
      <p className="text-[10px] text-slate-400 uppercase font-bold">{label}</p>
      <p className={`mt-1 ${bold ? 'text-lg font-extrabold text-slate-900' : 'text-sm font-semibold text-slate-700 capitalize'}`}>{value}</p>
    </div>
  );
}

function SigBlock({ label, color, name, signature, date, fmtDate }) {
  return (
    <div className="space-y-3">
      <p className={`text-[10px] font-bold text-${color}-600 uppercase tracking-widest`}>{label}</p>
      <div className="h-24 border-b-2 border-slate-300 flex items-end justify-center pb-2">
        {signature ? (
          <img src={signature} alt={`${label} signature`} className="max-h-20 max-w-full object-contain" />
        ) : (
          <p className="text-xs text-slate-300 italic">Signature</p>
        )}
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs"><span className="text-slate-400">Name:</span><span className="font-semibold text-slate-700">{name || '_______________'}</span></div>
        <div className="flex justify-between text-xs"><span className="text-slate-400">Date:</span><span className="font-semibold text-slate-700">{fmtDate(date)}</span></div>
      </div>
    </div>
  );
}
