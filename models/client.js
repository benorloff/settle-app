const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
    {
        firstName: { 
            type: String, 
            required: true, 
        },
        lastName: { 
            type: String, 
            required: true, 
        },
        company: { 
            type: String 
        },
        role: { 
            type: String 
        },
        email: { 
            type: String,
            required: true,
            lowercase: true, 
            unique: true 
        },
        phone: { 
            type: String
        },
        address1: { 
            type: String
        },
        address2: { 
            type: String
        },
        city: { 
            type: String
        },
        state: { 
            type: String
        },
        zipCode: { 
            type: String
        },
        country: { 
            type: String
        },
        photoUrl: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        stripeCustomerId: {
            type: String
        }
    },
    {
      timestamps: true,
    }
  );

  module.exports = mongoose.model('Client', clientSchema);