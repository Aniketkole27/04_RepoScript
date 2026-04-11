import express from 'express';
import { 
    createWard, 
    getAllWards, 
    getWardDetails, 
    updateWardStats 
} from '../controllers/ward.controller.js';

const router = express.Router();

// Register a new ward
router.post('/', createWard);

// Get all wards overview
router.get('/', getAllWards);

// Get detail of a ward (beds + patients list)
router.get('/:id', getWardDetails);

// Update ward (e.g., set maintenance beds)
router.patch('/:id/stats', updateWardStats);

export default router;
