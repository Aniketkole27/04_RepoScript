import express from 'express';
import { 
    createPatient, 
    getAllPatients, 
    getPatientHistory, 
    addHandoffCard 
} from '../controllers/patient.controller.js';

const router = express.Router();

// @route   POST /api/patients
// @desc    Register a new patient
router.post('/', createPatient);

// @route   GET /api/patients
// @desc    Get all patients for the overview list
router.get('/', getAllPatients);

// @route   GET /api/patients/:id/history
// @desc    Get full history (cards) for a specific patient
router.get('/:id/history', getPatientHistory);

// @route   POST /api/patients/:id/handoff
// @desc    Add a new handoff card to a patient's record
router.post('/:id/handoff', addHandoffCard);

export default router;
