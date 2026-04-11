import mongoose from 'mongoose';

const vitalsSchema = new mongoose.Schema({
    bloodPressure: String,
    heartRate: Number,
    temperature: Number,
    respiratoryRate: Number,
    oxygenSaturation: Number,
    sugarLevel: Number,
    recordedAt: { type: Date, default: Date.now }
}, { _id: false });

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    patientId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    admissionDate: { type: Date, default: Date.now },
    condition: {
        type: String,
        enum: ['Stable', 'Warning', 'Critical', 'Recovering'],
        default: 'Stable'
    },
    currentWard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ward',
        required: true
    },
    bedNumber: {
        type: String,
        required: true
    },
    primaryDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    currentVitals: vitalsSchema,
    vitalsHistory: [vitalsSchema],
    medications: [{
        name: { type: String, required: true },
        dosage: String,
        frequency: String,
        nextDose: Date,
        startDate: Date,
        status: { type: String, enum: ['Active', 'Completed', 'Paused'], default: 'Active' }
    }],
    notes: [String]
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for retrieving all handoff cards for this patient
patientSchema.virtual('handoffCards', {
    ref: 'Handoff',
    localField: '_id',
    foreignField: 'patientId',
    options: { sort: { shiftDate: -1 } } // Automatically sort most recent first
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
