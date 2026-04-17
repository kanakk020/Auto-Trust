const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  partyA: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  partyB: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  deadline: { type: Date },
  status: {
    type: String,
    enum: ['Created', 'FundsLocked', 'WorkSubmitted', 'Completed', 'Disputed', 'Resolved'],
    default: 'Created'
  },
  contractHash: { type: String },
  proofCID: { type: String },
  blockchainTxHash: { type: String },
  agreementId: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contract', contractSchema);
