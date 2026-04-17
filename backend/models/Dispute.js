const mongoose = require('mongoose');

const disputeSchema = new mongoose.Schema({
  contract: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reason: { type: String },
  evidence: [{ type: String }],
  status: {
    type: String,
    enum: ['Open', 'UnderReview', 'Resolved'],
    default: 'Open'
  },
  resolution: { type: String },
  resolvedAt: { type: Date }
});

module.exports = mongoose.model('Dispute', disputeSchema);
