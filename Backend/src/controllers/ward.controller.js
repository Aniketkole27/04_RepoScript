import Ward from '../models/ward.model.js';
import Patient from '../models/patient.model.js';

// Create a new ward
export const createWard = async (req, res) => {
    try {
        const ward = new Ward(req.body);
        await ward.save();
        res.status(201).json({ success: true, data: ward });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all wards with occupancy stats
export const getAllWards = async (req, res) => {
    try {
        const wards = await Ward.find();
        res.status(200).json({ success: true, data: wards });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get specific ward info and the list of patients in it
export const getWardDetails = async (req, res) => {
    try {
        const ward = await Ward.findById(req.params.id);
        if (!ward) {
            return res.status(404).json({ success: false, message: 'Ward not found' });
        }

        const patients = await Patient.find({ currentWard: req.params.id })
            .select('name patientId condition bedNumber');

        res.status(200).json({ success: true, data: { ward, patients } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update ward occupancy or maintenance beds
export const updateWardStats = async (req, res) => {
    try {
        const ward = await Ward.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.status(200).json({ success: true, data: ward });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
