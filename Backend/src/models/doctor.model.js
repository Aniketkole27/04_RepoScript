import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        default: 'doctor123'
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        enum: ['General', 'ICU', 'Pediatrics', 'Cardiology', 'Emergency', 'Surgery']
    },
    specialization: {
        type: String,
        required: true
    },
    contact: {
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    assignedWards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ward'
    }],
    status: {
        type: String,
        enum: ['Available', 'On Duty', 'On Leave', 'Emergency Only'],
        default: 'Available'
    }
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
