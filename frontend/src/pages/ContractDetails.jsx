import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, FileCheck, Info, MessageSquare, Clock, ArrowRight, ShieldCheck, Check, Send, FileX, Loader2 } from 'lucide-react';

export default function ContractDetails() {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('details');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/contracts/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setContract(data);
        }
      } catch (err) {
        console.log('Failed to fetch contract:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContract();
  }, [id]);

  const handleAction = async (actionPath) => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/contracts/${id}/${actionPath}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const updatedContract = await res.json();
        setContract(updatedContract);
      } else {
        alert('Action failed. See console.');
        console.error(await res.json());
      }
    } catch (err) {
      console.error(err);
      alert('Connection error');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return (
    <div className="max-w-5xl mx-auto flex items-center justify-center py-20">
      <Loader2 size={32} className="animate-spin text-primary-400" />
    </div>
  );

  if (!contract) return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/contracts" className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contract Details</h1>
          <p className="text-sm text-slate-500">ID: {id}</p>
        </div>
      </div>
      <div className="card p-10 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileX size={28} className="text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Contract not found</h3>
        <p className="text-sm text-slate-500 mb-6">This contract doesn't exist or hasn't been loaded yet.</p>
        <Link to="/contracts" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Contracts
        </Link>
      </div>
    </div>
  );

  const statusStepMap = {
    'Created': 1,
    'FundsLocked': 2,
    'WorkSubmitted': 3,
    'Completed': 4,
    'Disputed': 3,
    'Resolved': 4
  };
  const currentStep = statusStepMap[contract.status] || 1;

  const steps = [
    { num: 1, title: 'Created', desc: 'Contract drafted' },
    { num: 2, title: 'Funds Locked', desc: 'Escrow funded' },
    { num: 3, title: 'Work Submitted', desc: 'Proof uploaded' },
    { num: 4, title: 'Completed', desc: 'Funds released' }
  ];

  const partyAName = contract.partyA?.name || 'Unknown';
  const partyBName = contract.partyB?.name || 'Unknown';

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/contracts" className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{contract.title}</h1>
          <p className="text-sm text-slate-500">Status: {contract.status} • Created on {new Date(contract.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Agreement Status</h3>
            <div className="relative">
              <div className="absolute top-4 left-4 right-4 h-1 bg-slate-100 rounded-full" />
              <div 
                className="absolute top-4 left-4 h-1 bg-success-500 rounded-full transition-all duration-700" 
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
              
              <div className="relative flex justify-between">
                {steps.map((step) => {
                  const isCompleted = currentStep >= step.num;
                  const isCurrent = currentStep === step.num;
                  return (
                    <div key={step.num} className="flex flex-col items-center flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 border-2 transition-colors z-10 bg-white
                        ${isCompleted ? 'border-success-500 text-success-600' : 'border-slate-200 text-slate-400'}
                        ${isCurrent ? 'ring-4 ring-success-100' : ''}
                      `}>
                        {isCompleted ? <Check size={16} /> : step.num}
                      </div>
                      <p className={`text-xs font-semibold ${isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>{step.title}</p>
                      <p className="text-[10px] text-slate-400 text-center hidden sm:block mt-0.5">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="card p-0 overflow-hidden">
            <div className="flex border-b border-slate-100 bg-slate-50/50">
              <button 
                className={`flex-1 py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'details' ? 'border-primary-500 text-primary-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                onClick={() => setActiveTab('details')}
              >
                Contract Details
              </button>
              <button 
                className={`flex-1 py-4 text-sm font-semibold border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'chat' ? 'border-primary-500 text-primary-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                onClick={() => setActiveTab('chat')}
              >
                <MessageSquare size={16} /> Chat
              </button>
            </div>

            <div className="p-6 min-h-[400px]">
              {activeTab === 'details' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">Parties Involved</h4>
                    <div className="flex items-center gap-4 items-stretch">
                      <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">Party A (Client)</p>
                        <p className="font-semibold">{partyAName}</p>
                        <p className="text-xs text-slate-400">{contract.partyA?.email}</p>
                      </div>
                      <div className="flex items-center justify-center text-slate-300">
                        <ArrowRight />
                      </div>
                      <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">Party B (Freelancer)</p>
                        <p className="font-semibold">{partyBName}</p>
                        <p className="text-xs text-slate-400">{contract.partyB?.email}</p>
                      </div>
                    </div>
                  </div>

                  {contract.description && (
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">Description</h4>
                      <div className="prose prose-sm text-slate-600 bg-slate-50 p-5 rounded-xl border border-slate-100">
                        <p>{contract.description}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">Terms</h4>
                    <div className="prose prose-sm text-slate-600 bg-slate-50 p-5 rounded-xl border border-slate-100">
                      <p>1. The Contractor agrees to perform the services described as "{contract.title}".</p>
                      <p>2. The Client agrees to pay the total amount of <strong>${contract.amount}</strong> upon successful completion.</p>
                      <p>3. The deadline for completion is <strong>{contract.deadline ? new Date(contract.deadline).toLocaleDateString() : 'N/A'}</strong>.</p>
                      <p>4. Funds are held in AutoTrust escrow until both parties confirm completion.</p>
                    </div>
                  </div>

                  {contract.blockchainTxHash && (
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">Blockchain</h4>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">Transaction Hash</p>
                        <p className="text-sm font-mono text-slate-700 break-all">{contract.blockchainTxHash}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full h-[400px]">
                  <div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-2">
                    {messages.length > 0 ? messages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] rounded-2xl p-3 ${msg.isMe ? 'bg-primary-500 text-white rounded-tr-sm' : 'bg-slate-100 text-slate-800 rounded-tl-sm'}`}>
                          {!msg.isMe && <p className="text-xs font-semibold mb-1 opacity-70">{msg.sender}</p>}
                          <p className="text-sm">{msg.text}</p>
                          <p className={`text-[10px] mt-1 text-right ${msg.isMe ? 'text-primary-100' : 'text-slate-400'}`}>{msg.timestamp}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                        <div className="text-center">
                          <MessageSquare size={32} className="mx-auto mb-3 opacity-50" />
                          <p>No messages yet. Start a conversation!</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2">
                    <input type="text" placeholder="Type a message..." className="input-field py-2 flex-1" />
                    <button className="bg-primary-500 hover:bg-primary-600 text-white p-2.5 rounded-xl transition-colors">
                      <Send size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card bg-slate-900 text-white border-0">
            <h3 className="font-semibold text-slate-400 mb-1">Contract Amount</h3>
            <p className="text-4xl font-bold mb-6">${contract.amount}</p>
            
            <div className="space-y-3 pt-6 border-t border-slate-800">
              {contract.status === 'Created' && (
                <>
                  <button onClick={() => handleAction('lock')} disabled={actionLoading} className="btn-primary w-full bg-success-500 hover:bg-success-600 text-white py-3 border-0">
                    {actionLoading ? 'Processing...' : 'Lock Funds'}
                  </button>
                </>
              )}
              {(contract.status === 'FundsLocked' || contract.status === 'WorkSubmitted') && (
                <button onClick={() => handleAction('complete')} disabled={actionLoading} className="btn-primary w-full bg-success-500 hover:bg-success-600 text-white py-3 border-0 flex items-center justify-center gap-2">
                  <CheckCircle2 size={18} /> {actionLoading ? 'Processing...' : 'Mark as Completed'}
                </button>
              )}
              {contract.status === 'Completed' && (
                <div className="bg-success-500/20 border border-success-500/30 text-success-300 p-3 rounded-xl flex items-center justify-center gap-2 font-medium">
                  <ShieldCheck size={20} /> Funds Released
                </div>
              )}
            </div>
          </div>

          <div className="card p-5 bg-blue-50 border-blue-100">
            <div className="flex gap-3">
              <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-bold text-blue-900 mb-1">AutoTrust Guarantee</h4>
                <p className="text-sm text-blue-800/80 leading-relaxed">
                  Your funds are secured by smart contracts. They will only be released when both parties confirm the successful delivery of the agreed services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
