import Doctor from '../models/doctor.model.js';
import Patient from '../models/patient.model.js';

// Register a new doctor
export const createDoctor = async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).json({ success: true, data: doctor });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all doctors with their ward assignments
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('assignedWards', 'name category');
        res.status(200).json({ success: true, data: doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get full details of a specific doctor
export const getDoctorDetails = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('assignedWards');
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all patients assigned to a specific doctor
export const getDoctorPatients = async (req, res) => {
    try {
        const patients = await Patient.find({ primaryDoctor: req.params.id })
            .populate('currentWard', 'name bedNumber');
        res.status(200).json({ success: true, data: patients });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update doctor status (Available, On Duty, etc.)
export const updateDoctorStatus = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status },
            { new: true, runValidators: true }
        );
        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
