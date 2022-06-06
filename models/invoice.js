const mongoose = require("mongoose");

const invoiceItemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String        
        },
        description: {
            type: String
        },
        quantity: {
            type: Number,
            required: true
        },
        rate: {
            type: Number,
            required: true
        },
        subtotal: {
            type: mongoose.Types.Decimal128,
            default: function() {
                return this.quantity * this.rate
            }
        },
        invoiceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Invoice'
        }
    }
)

const invoiceAttachmentSchema = mongoose.Schema(
    {
        name: String,
        fileUrl: String,
        invoiceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Invoice'
        }
    }
)

const invoiceSchema = new mongoose.Schema(
    {
        invoiceNum: { 
            type: Number, 
            required: true, 
            min: [1, 'Invoice number must be greater than 0.'],
            max: [99999, 'Invoice number cannot exceed 5 digits.']
        },
        issueDate: { 
            type: Date, 
            required: true 
        },
        dueDate: {
            type: Date,
            required: true
        },
        reference: {
            type: String
        },
        invoiceItems: [invoiceItemSchema],
        notes: {
            type: String
        },
        terms: {
            type: String
        },
        attachments: [invoiceAttachmentSchema],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        stripeCustomerId: {
            type: String,
            required: true
        },
        stripeInvoiceId: {
            type: String
        },
    },
    {
      timestamps: true,
    }
  );

  module.exports = mongoose.model('Invoice', invoiceSchema);