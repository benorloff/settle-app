const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        firstName: { 
            type: String,
            required: true        
        },
        lastName: { 
            type: String, 
            required: true, 
        },
        title: String,
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        businessPhone: String,
        mobilePhone: String,
        photoUrl: String,
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client'
        }
    },
    {
      timestamps: true,
    }
  );

  module.exports = mongoose.model('Contact', contactSchema);