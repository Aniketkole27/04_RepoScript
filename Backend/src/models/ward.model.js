import mongoose from 'mongoose';

const wardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['general', 'icu', 'pediatrics', 'maternity', 'emergency', 'cardiology'],
        default: 'general'
    },
    location: {
        type: String,
        required: true
    },
    totalBeds: {
        type: Number,
        required: true,
        min: 1
    },
    occupiedBeds: {
        type: Number,
        default: 0,
        min: 0
    },
    inmentanaceBeds: {
        type: Number,
        default: 0,
        min: 0
    },
    status: {
        type: String,
        enum: ['active', 'maintenance', 'full'],
        default: 'active'
    }
}, { timestamps: true });

const Ward = mongoose.model('Ward', wardSchema);
export default Ward;
