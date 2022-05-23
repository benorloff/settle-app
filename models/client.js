const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
    {
        entityType: { 
            type: String,
            enum: ['Individual', 'Company'],
            required: true        
        },
        name: { 
            type: String, 
            required: true, 
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

  module.exports = mongoose.model('Client', clientSchema);