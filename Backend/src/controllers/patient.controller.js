import Patient from '../models/patient.model.js';
import Handoff from '../models/handoff.model.js';

// Create a new patient
export const createPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json({ success: true, data: patient });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all patients with their basic info (for the Handoff List View)
export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find()
            .populate('currentWard', 'name category')
            .populate('primaryDoctor', 'name department');
        res.status(200).json({ success: true, data: patients });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get patient details including their full handoff card history
export const getPatientHistory = async (req, res) => {
    try {
        const patientId = req.params.id;
        const patient = await Patient.findById(patientId)
            .populate('currentWard')
            .populate('primaryDoctor')
            .populate({
                path: 'handoffCards',
                populate: { path: 'fromDoctor toDoctor', select: 'name' }
            });

        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add a new handoff card (task) for a patient
export const addHandoffCard = async (req, res) => {
    try {
        const handoff = new Handoff({
            ...req.body,
            patientId: req.params.id
        });
        await handoff.save();
        res.status(201).json({ success: true, data: handoff });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
