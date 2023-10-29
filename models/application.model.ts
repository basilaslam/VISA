import mongoose, { Document, Schema } from 'mongoose';
// Define the Application file schema
const applicationSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    unique: false
  },
  date_of_birth: {
    type: String,
    required: true,
    unique: false
  },
  place_of_birth: {
    type: String,
    required: true,
    unique: false
  },
  nationality: {
    type: String,
    required: true,
    unique: false
  },
  user_pdf: {
    type: String,
    required: true,
    unique: false
  },
  
  admin_pdf: {
    type: String,
    required: false,
    unique: false
  },

  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    required: true,
    unique: false
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the user who uploaded the Application
    unique: false
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  }
  // You can add more fields as needed, such as a reference to the selected pages, etc.
});

// Define the Application model interface
export interface IApplication extends Document {
  originalName: string;
  uploadedBy: mongoose.Types.ObjectId;
  fullname: string;
  date_of_birth: string;
  place_of_birth: string;
  nationality: string;
  user_pdf: string;
  admin_pdf: string;
  status: string;
  uploadedAt: Date;
  // Add more fields here if needed
}

// Create the Application model
const Application = mongoose.models.Application || mongoose.model<IApplication>('Application', applicationSchema);
    export default Application;