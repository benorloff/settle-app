const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
    {
        entityType: { 
            type: String,
            enum: ['Individual', 'Company'],
            required: true        
        },
        name: { 
            type: String, 
            required: true, 
            lowercase: true, 
            unique: true 
        },
        photoUrl: String,
        logoUrl: String,
        address1: { 
            type: String, 
            required: true 
        },
        address2: String,
        city: { 
            type: String, 
            required: true 
        },
        state: { 
            type: String, 
            required: true 
        },
        country: { 
            type: String, 
            required: true 
        },
        baseCurrency: { 
            type: String, 
            required: true 
        },
        businessPhone: { 
            type: String, 
            required: true 
        },
        mobilePhone: String,
        users: [
            { 
                type: mongoose.Types.ObjectId, 
                ref: 'User'
            }
        ],
        stripeAccount: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
      timestamps: true,
    }
  );

  module.exports = mongoose.model('Business', businessSchema);