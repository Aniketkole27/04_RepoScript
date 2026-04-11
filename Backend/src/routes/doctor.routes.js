import express from 'express';
import { 
    createDoctor, 
    getAllDoctors, 
    getDoctorDetails, 
    getDoctorPatients,
    updateDoctorStatus
} from '../controllers/doctor.controller.js';

const router = express.Router();

// Register a doctor
router.post('/', createDoctor);

// Get all doctors
router.get('/', getAllDoctors);

// Get specific doctor details
router.get('/:id', getDoctorDetails);

// Get all patients managed by this doctor
router.get('/:id/patients', getDoctorPatients);

// Update status
router.patch('/:id/status', updateDoctorStatus);

export default router;
