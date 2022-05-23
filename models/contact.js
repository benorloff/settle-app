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
        photoUrl: String,
        businessId: {
            type: mongoose.Types.ObjectId, 
            ref: 'Business' 
        }
    },
    {
      timestamps: true,
    }
  );

  module.exports = mongoose.model('Contact', contactSchema);