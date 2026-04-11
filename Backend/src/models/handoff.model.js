import mongoose from 'mongoose';

const handoffSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    fromDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    toDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true // The receiving clinician
    },
    ward: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ward'
    },
    shift: {
        type: String,
        enum: ['Morning', 'Evening', 'Night'],
        required: true
    },
    vitalsAtHandoff: {
        bloodPressure: String,
        heartRate: Number,
        temperature: Number,
        oxygenSaturation: Number,
        respiratoryRate: Number,
        sugarLevel: Number
    },
    medicationSnapshot: [{
        name: String,
        nextDose: String,
        missedDose: Boolean
    }],
    pendingActions: [{
        action: String,
        priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
        isCompleted: { type: Boolean, default: false }
    }],
    notes: {
        type: String,
        required: true
    },
    shiftTime: String, // e.g. "8:00 AM – 4:00 PM"
    shiftDate: {
        type: Date,
        default: Date.now
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Primary index for chronological patient card history
handoffSchema.index({ patientId: 1, shiftDate: -1 });

const Handoff = mongoose.model('Handoff', handoffSchema);
export default Handoff;
